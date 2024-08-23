import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Row, Col, Modal, message, Select, Upload, Table } from 'antd';
import { Eye, Download, RefreshCw, Upload as UploadIcon } from 'lucide-react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';


const { Option } = Select;

const ImageSearchRetrieval = () => {
  const [existingPartNumbers, setExistingPartNumbers] = useState([]);
  const [selectedPartNumbers, setSelectedPartNumbers] = useState([]);
  const [customPartNumbers, setCustomPartNumbers] = useState('');
  const [excelPartNumbers, setExcelPartNumbers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [images, setImages] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState(new Set());
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const [filteredPartNumbers, setFilteredPartNumbers] = useState([]);
  const [consecutiveRange, setConsecutiveRange] = useState('');

  useEffect(() => {
    const fetchPartNumbers = async () => {
      try {
        const response = await axios.get('http://172.18.101.47:2525/ELimage/partnumbers');
        const partNumbers = response.data.map(item => item.part_number);
        setExistingPartNumbers(partNumbers);
        setFilteredPartNumbers(partNumbers); // Initialize filtered part numbers
      } catch (error) {
        message.error('Failed to fetch part numbers.');
      }
    };

    fetchPartNumbers();
  }, []);

  const fetchImageDetails = async (partNumber) => {
    try {
      const response = await axios.get(`http://172.18.101.47:2525/ELimage/elnewimage_info/${partNumber}`);
      return response.data;
    } catch (error) {
      // message.error(`Failed to fetch image for part number ${partNumber}`);
      return null;
    }
  };

  const handleSubmit = async () => {
    if (selectedPartNumbers.length === 0 && !customPartNumbers && excelPartNumbers.length === 0) {
      message.warning('Please select or enter part numbers.');
      return;
    }

    setLoading(true);
    
    const partNumbersToFetch = [
      ...new Set([
        ...selectedPartNumbers,
        ...customPartNumbers.split(',').map(num => num.trim()),
        ...excelPartNumbers
      ])
    ];

    try {
      const imageDetailsPromises = partNumbersToFetch.map(partNumber => fetchImageDetails(partNumber));
      const imageDetailsResponses = await Promise.all(imageDetailsPromises);

      const filteredImages = imageDetailsResponses.filter(response => response !== null);

      setImages(filteredImages);
      setSubmitted(true);
      setLoading(false);
      message.success('Images retrieved successfully.');
    } catch (error) {
      setLoading(false);
      message.error('Failed to retrieve images.');
    }
  };
  
  const handleDownload = async (image) => {
    try {
      const response = await axios.get(`http://172.18.101.47:2525/ELimage/elnewimage/${image.part_number}`, {
        responseType: 'blob', // Ensure the response is a blob
      });
  
      // Extract the file extension from the response headers
      const contentType = response.headers['content-type'];
      let extension = 'jpg'; // Default extension
  
      if (contentType === 'image/jpeg') {
        extension = 'jpg';
      } else if (contentType === 'image/png') {
        extension = 'png';
      }
  
      // Create a download link and trigger it
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${image.part_number}.${extension}`);
      document.body.appendChild(link);
      link.click();
  
      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
  
      message.info(`Downloading ${image.part_number} as ${extension.toUpperCase()}`);
    } catch (error) {
      message.error(`Failed to download image for part number ${image.part_number}`);
    }
  };
  
  

  const handleDownloadAll = async () => {
    if (selectedImages.size === 0) {
      message.warning('No images selected.');
      return;
    }
  
    const zip = new JSZip();
    setLoading(true);
  
    try {
      // Create a Set to store unique production lines
      const productionLinesSet = new Set(
        Array.from(selectedImages).map((partNumber) => {
          const image = images.find((img) => img.part_number === partNumber);
          return image ? image.production_line : null;
        }).filter(Boolean)
      );
  
      // Convert Set to array and join with underscores for ZIP file name
      const productionLinesArray = Array.from(productionLinesSet);
      const zipFileName = productionLinesArray.length > 0
        ? `${productionLinesArray.join('_')}.zip`
        : 'images.zip';
  
      // Fetch image data for all selected images
      const fetchPromises = Array.from(selectedImages).map(async (partNumber) => {
        const image = images.find((img) => img.part_number === partNumber);
        if (image) {
          const response = await axios.get(`http://172.18.101.47:2525/ELimage/elnewimage/${image.part_number}`, {
            responseType: 'blob',
          });
  
          // Determine file extension
          const contentType = response.headers['content-type'];
          const extension = contentType === 'image/jpeg' ? 'jpg' : 'png';
  
          // Add file to zip
          zip.file(`${image.part_number}.${extension}`, response.data);
        }
      });
  
      await Promise.all(fetchPromises);
  
      // Generate the zip file and trigger download
      zip.generateAsync({ type: 'blob' }).then((content) => {
        saveAs(content, zipFileName);
        setLoading(false);
        message.success('Selected images downloaded as a ZIP file.');
      });
    } catch (error) {
      setLoading(false);
      message.error('Failed to download images.');
    }
  };
  

  const handlePreview = async (image) => {
    try {
      const response = await axios.get(`http://172.18.101.47:2525/ELimage/elnewimage/${image.part_number}`, {
        responseType: 'blob'
      });
      const url = URL.createObjectURL(response.data);
      setPreviewImageUrl(url);
      setSelectedImage(image);
      setIsModalVisible(true);
    } catch (error) {
      message.error(`Failed to fetch preview image for part number ${image.part_number}`);
    }
  };

  const handleRefresh = () => {
    setSelectedPartNumbers([]);
    setCustomPartNumbers('');
    setExcelPartNumbers([]);
    setImages([]);
    setSubmitted(false);
    setSelectedImages(new Set());
    setPreviewImageUrl('');
  };

  const handleExcelUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
      const partNumbersFromExcel = rows.flat().filter((num) => num);
      setExcelPartNumbers((prev) => [...new Set([...prev, ...partNumbersFromExcel])]);
    };
    reader.readAsArrayBuffer(file);
    return false; // Prevent upload default behavior
  };

  const columns = [
    {
      title: 'Select',
      dataIndex: 'select',
      render: (_, record) => (
        <input
          type="checkbox"
          checked={selectedImages.has(record.part_number)}
          onChange={() => toggleImageSelection(record.part_number)}
          className="w-4 h-4"
        />
      ),
    },
    {
      title: 'Part Number',
      dataIndex: 'part_number',
      className: 'text-sm',
      // Adding filter for 'Part Number'
      filters: existingPartNumbers.map(partNumber => ({
        text: partNumber,
        value: partNumber,
      })),
      onFilter: (value, record) => record.part_number.includes(value),
    },
    {
      title: 'Production Line',
      dataIndex: 'production_line',
      className: 'text-sm',
      // Adding filter for 'Production Line'
      filters: [...new Set(images.map(image => image.production_line))]
        .filter(line => line) // Filter out undefined or null values
        .map(line => ({
          text: line,
          value: line,
        })),
      onFilter: (value, record) => record.production_line.includes(value),
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      className: 'text-sm',
      // Adding filter for 'Timestamp'
      // Assuming you have a predefined list of timestamps or a way to generate unique values
      filters: [...new Set(images.map(image => image.timestamp))]
        .filter(timestamp => timestamp) // Filter out undefined or null values
        .map(timestamp => ({
          text: timestamp,
          value: timestamp,
        })),
      onFilter: (value, record) => record.timestamp.includes(value),
    },
    {
      title: 'Preview',
      dataIndex: 'preview',
      render: (_, record) => (
        <Button
          onClick={() => handlePreview(record)}
          className="bg-blue-500 text-white text-sm"
        >
          <Eye className="mr-1" /> Preview
        </Button>
      ),
    },
    {
      title: 'Download',
      dataIndex: 'download',
      render: (_, record) => (
        <Button
          onClick={() => handleDownload(record)}
          className="bg-green-500 text-white text-sm"
        >
          <Download className="mr-1" /> Download
        </Button>
      ),
    },
  ];


  const dataSource = images.map((image) => ({
    key: image.part_number,
    ...image,
  }));

  const toggleImageSelection = (partNumber) => {
    setSelectedImages((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(partNumber)) {
        newSelection.delete(partNumber);
      } else {
        newSelection.add(partNumber);
      }
      return newSelection;
    });
  };

  const handleSelectAll = () => {
    const allPartNumbers = new Set(images.map(image => image.part_number));
    setSelectedImages(allPartNumbers);
  };

  const handleDeselectAll = () => {
    setSelectedImages(new Set());
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Image Search & Retrieval</h1>
      
      <Card title="Part Numbers" className="mb-4">
        <Row gutter={16}>
          <Col xs={24} sm={12} md={8} className="mb-4 sm:mb-0">
            <Select
              mode="multiple"
              placeholder="Select Existing Part Numbers"
              className="w-full"
              onChange={(value) => setSelectedPartNumbers(value)}
              value={selectedPartNumbers}
            >
              {existingPartNumbers.map((partNumber, index) => (
                <Option key={index} value={partNumber}>
                  {partNumber}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={12} md={8} className="mb-4 sm:mb-0">
            <Input
              placeholder="Custom Part Numbers (comma-separated)"
              value={customPartNumbers}
              onChange={(e) => setCustomPartNumbers(e.target.value)}
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Upload
              beforeUpload={handleExcelUpload}
              accept=".xlsx, .xls"
              showUploadList={false}
            >
              <Button icon={<UploadIcon />}>Upload Excel</Button>
            </Upload>
          </Col>
        </Row>
        <Row gutter={16} className="mt-4">
          <Col xs={24}>
            <Select
              mode="multiple"
              placeholder="Part Numbers from Excel"
              className="w-full"
              value={excelPartNumbers}
              onChange={(value) => setExcelPartNumbers(value)}
              disabled
            >
              {excelPartNumbers.map((num, index) => (
                <Option key={index} value={num}>
                  {num}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
      </Card>
  
      <Card title="Actions" className="mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap">
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={loading}
              className="mb-2 sm:mb-0 sm:mr-2"
            >
              Submit
            </Button>
            <Button onClick={handleRefresh} className="mb-2 sm:mb-0 sm:mr-2">
              <RefreshCw className="mr-1" /> Refresh
            </Button>
            <Button
              type="default"
              onClick={handleSelectAll}
              className="mb-2 sm:mb-0 sm:mr-2"
            >
              Select All
            </Button>
            <Button
              type="default"
              onClick={handleDeselectAll}
              className="mb-2 sm:mb-0 sm:mr-2"
            >
              Deselect All
            </Button>
            <Button
              type="primary"
              onClick={handleDownloadAll}
              disabled={selectedImages.size === 0}
              loading={loading}
            >
              Download Selected
            </Button>
          </div>
        </div>
      </Card>
  
      <Card title="EL Image Results" className="mb-4">
      <div className="overflow-x-auto mt-4">
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="part_number"
        className="min-w-full"
      />
    </div>
    </Card>

      <Modal
        title="Image Preview"
        visible={isModalVisible}
        footer={null}
        width="90%"
        style={{ maxWidth: '1200px' }}
        bodyStyle={{ padding: '0' }}
        centered
        onCancel={() => {
          setIsModalVisible(false);
          setPreviewImageUrl('');
        }}
      >
        {previewImageUrl && selectedImage && (
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/4 p-4 lg:border-r lg:border-gray-200">
              <h2 className="text-xl font-semibold mb-4">{selectedImage.production_line}</h2>
              <p><strong>Part Number:</strong> {selectedImage.part_number}</p>
            </div>
            <div className="lg:w-3/4 p-4 flex flex-col">
              <div className="flex-grow">
                <img
                  src={previewImageUrl}
                  alt={previewImageUrl ? selectedImage.part_number : 'Preview'}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="mt-8 flex flex-col sm:flex-row sm:justify-end sm:space-x-4">
                <Button 
                  type="primary"  
                  className="bg-green-500 hover:bg-green-600 mb-2 sm:mb-0"
                  onClick={() => handleDownload(selectedImage)}
                >
                  Download
                </Button>
                <Button 
                  onClick={() => setIsModalVisible(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
  
};

export default ImageSearchRetrieval;

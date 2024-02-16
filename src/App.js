import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, TextField } from '@mui/material';
import Select from 'react-select';
import { BsSearch, BsChevronDoubleDown, BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import EditIcon from '@mui/icons-material/Edit';

// Options for category and status dropdowns
const optionsCategory = [{ value: 'all', label: 'All' }];
const optionsStatus = [{ value: 'all', label: 'All' }];

const DataTable = () => {
  // State variables
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Number of items per page
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  // Event handler for search button click
  const handleSearch = () => {
    // Perform search based on searchText, selectedCategory, and selectedStatus
    console.log("Search text:", searchText);
    console.log("Selected category:", selectedCategory);
    console.log("Selected status:", selectedStatus);
  };

  // Event handler for page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Event handler for selecting/deselecting all checkboxes
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedCheckboxes(selectAll ? [] : Array.from(Array(10).keys()));
  };

  // Event handler for individual checkbox click
  const handleCheckboxClick = (index) => {
    const selectedIndex = selectedCheckboxes.indexOf(index);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedCheckboxes, index);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedCheckboxes.slice(1));
    } else if (selectedIndex === selectedCheckboxes.length - 1) {
      newSelected = newSelected.concat(selectedCheckboxes.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedCheckboxes.slice(0, selectedIndex),
        selectedCheckboxes.slice(selectedIndex + 1),
      );
    }

    setSelectedCheckboxes(newSelected);
    setSelectAll(newSelected.length === 10);
  };

  // Render pagination buttons
  const renderPagination = () => {
    const totalPages = 10;
    const pageButtons = [];
    const maxVisiblePages = 3;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (totalPages > maxVisiblePages && endPage - startPage + 1 < maxVisiblePages) {
      startPage = endPage - maxVisiblePages + 1;
    }

    if (startPage > 1) {
      pageButtons.push(
        <Button key={1} variant="outlined" style={{ border: 'none' }} onClick={() => handlePageChange(1)}>1</Button>
      );
      if (startPage > 2) {
        pageButtons.push(<span key="start-ellipsis">...</span>);
      }
    }

    for (let page = startPage; page <= endPage; page++) {
      pageButtons.push(
        <Button key={page} variant="outlined" style={{ border: 'none' }} onClick={() => handlePageChange(page)}>{page}</Button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageButtons.push(<span key="end-ellipsis">...</span>);
      }
      pageButtons.push(
        <Button key={totalPages} variant="outlined" style={{ border: 'none' }} onClick={() => handlePageChange(totalPages)}>{totalPages}</Button>
      );
    }

    return pageButtons;
  };

  return (
    <div>
      {/* Header */}
      <div className="header">
        <span className="orders-header">Orders</span>
        <Button variant="contained" color="primary" style={{ borderRadius: '10px', color: 'white', fontSize: '17px', padding: '10px 20px', width: '200px' }}>CREATE NEW</Button>
      </div>
      {/* Search, category, status, and search button */}
      <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', borderRadius: '20px' }}>
        {/* Search input field */}
        <div style={{ width: '300px' }}>
          <h4>Search</h4>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <BsSearch style={{ fontSize: '20px' }} />
            <TextField
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search"
              style={{ paddingLeft: '10px' }}
            />
          </div>
        </div>
        {/* Category dropdown */}
        <div style={{ width: '300px' }}>
          <h4>Category</h4>
          <Select
            options={optionsCategory}
            value={selectedCategory}
            onChange={(option) => setSelectedCategory(option)}
          />
        </div>
        {/* Status dropdown */}
        <div style={{ width: '300px' }}>
          <h4>Status</h4>
          <Select
            options={optionsStatus}
            value={selectedStatus}
            onChange={(option) => setSelectedStatus(option)}
          />
        </div>
        {/* Double down arrow for more filters */}
        <div style={{ paddingTop: '55px' }}>
          <BsChevronDoubleDown style={{ fontSize: '20px', cursor: 'pointer' }} />
        </div>
        {/* Button Search */}
        <div style={{ paddingTop: '41px' }}>
          <Button variant="contained" color="primary" style={{ borderRadius: '10px', color: 'white', fontSize: '17px', padding: '10px 20px', width: '200px' }} onClick={handleSearch}>Search</Button>
        </div>
      </div>
      {/* Product summary section */}
      <div>
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', borderRadius: '20px' }}>
          <div style={{ width: '300px' }}>
            <h2>Product Summary</h2>
            <div style={{ display: 'flex', alignItems: 'center' }}>
            </div>
          </div>
          {/* Category dropdown */}
          <div style={{ paddingLeft: '10px', display: 'flex', alignItems: 'center' }}>
            <div>
              <h4>Show</h4>
            </div>
            <div style={{ paddingTop: '10px', marginLeft: '10px', width: '250px' }}>
              <Select
                options={optionsStatus}
                value={selectedStatus}
                onChange={(option) => setSelectedStatus(option)}
                placeholder="All Columns"
              />
            </div>
          </div>
          {/* Button DISPATCH SELECTED */}
          <div style={{ paddingTop: '20px' }}>
            <Button variant="contained" color="primary" style={{ borderRadius: '10px', color: 'white', fontSize: '14px', padding: '10px 20px', width: '200px' }} onClick={handleSearch}>DISPATCH SELECTED</Button>
          </div>
          {/* Pagination */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Button variant="outlined" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} style={{ border: 'none' }}><BsArrowLeft /></Button>
            {renderPagination()}
            <Button variant="outlined" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === 10} style={{ border: 'none' }}><BsArrowRight /></Button>
          </div>
        </div>
      </div>
      {/* Data table */}
      <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', borderRadius: '20px' }}>
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox checked={selectAll} onChange={handleSelectAll} />
                </TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Number</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Shipping</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Order Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Example data */}
              {Array.from(Array(10).keys()).map((index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox
                      checked={selectedCheckboxes.indexOf(index) !== -1}
                      onChange={() => handleCheckboxClick(index)}
                    />
                  </TableCell>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>12345</TableCell>
                  <TableCell>2024-02-17</TableCell>
                  <TableCell>John Doe</TableCell>
                  <TableCell>john.doe@example.com</TableCell>
                  <TableCell>USA</TableCell>
                  <TableCell>Standard</TableCell>
                  <TableCell>Online</TableCell>
                  <TableCell>Retail</TableCell>
                  <TableCell>
                    <EditIcon  />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default DataTable;

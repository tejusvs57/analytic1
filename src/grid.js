import React, { useState,useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Box, Typography, Switch } from "@mui/material";

// const eventData = [
//   { id: 1, name: "Event A", frequency: 25, available: true },
//   { id: 2, name: "Event B", frequency: 50, available: false },
//   { id: 3, name: "Event C", frequency: 15, available: true },
//   { id: 4, name: "Event D", frequency: 70, available: false },
//   { id: 5, name: "Event E", frequency: 45, available: true },
//   { id: 6, name: "Event F", frequency: 30, available: true },
//   { id: 7, name: "Event G", frequency: 20, available: false },
// ];

const CoolDataGrid = ({from,to}) => {
  const [searchText, setSearchText] = useState("");
  const [filteredRows, setFilteredRows] = useState();

  const [eventData, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
   
    const fetchData = async () => {
     
      setIsLoading(true);

      console.log('bar graph');
      console.log(from);
      console.log(to);

      setIsLoading(true); // Start loading

      // Fetch data from your API based on the time range
      try {
        const response = await fetch(`https://59.145.153.101:5010/general/stats1?from=${from}&to=${to}`);
       const gdata = await response.json();


       console.log(gdata);
       console.log(gdata.graph1);

       const data = gdata.graph1.map((item, index) => ({
        ...item,
        id: index, // Add unique ID for DataGrid
      }));

        setData(data);
       // setData(data); // Update the chart data
       
       setFilteredRows(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchData();

  }, [from,to]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);
    setFilteredRows(
      eventData.filter(
        (row) =>
          row.event.toLowerCase().includes(value) ||
          row.frequency.toString().includes(value)
      )
    );
  };

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "event", headerName: "Event Name", width: 150, sortable: true },
    {
      field: "frequency",
      headerName: "Frequency",
      width: 120,
      type: "number",
      sortable: true,
    },
    // {
    //   field: "available",
    //   headerName: "Available",
    //   width: 110,
    //   sortable: true,
    //   renderCell: (params) => (
    //     <Switch checked={params.value} color="success" />
    //   ),
    // },
  ];

  return (
    <Box
      sx={{
        height: "auto",
        minWidth: 450,
        maxWidth: 600,
        margin: "auto",
        backgroundColor: "#080A1E",
        padding: "15px",
        borderRadius: "12px",
        boxShadow: "0px 0px 20px rgba(0, 204, 255, 0.6)",
        border: "2px solid rgba(0, 204, 255, 0.3)",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "#66d9ff",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "10px",
          textShadow: "0px 0px 8px rgba(0, 204, 255, 0.7)",
          letterSpacing: "1px",
          textTransform: "uppercase",
        }}
      >
        🚀 Event Data Grid
      </Typography>

      <TextField
        variant="outlined"
        label="🔍 Search"
        value={searchText}
        onChange={handleSearch}
        size="small"
        sx={{
          marginBottom: "10px",
          width: "100%",
          input: { color: "#66d9ff", fontSize: "14px" },
          label: { color: "#66d9ff", fontSize: "14px" },
          fieldset: { borderColor: "#66d9ff" },
          "&:hover fieldset": { borderColor: "#99e6ff" },
        }}
      />

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          disableSelectionOnClick
          sx={{
            "& .MuiDataGrid-root": {
              color: "#66d9ff",
              fontSize: "14px",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "rgba(14, 17, 45, 0.9)",
              color: "#99e6ff",
              fontSize: "14px",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              borderBottom: "2px solid rgba(0, 204, 255, 0.5)",
              boxShadow: "0px 2px 10px rgba(0, 204, 255, 0.3)",
            },
            "& .MuiDataGrid-cell": {
              color: "#ffffff",
              borderColor: "rgba(0, 204, 255, 0.3)",
              fontSize: "13px",
            },
            "& .MuiDataGrid-cell:hover": {
              backgroundColor: "rgba(0, 204, 255, 0.1)",
            },
            "& .MuiSwitch-thumb": {
              backgroundColor: "#66d9ff",
            },
            "& .MuiDataGrid-row:nth-of-type(even)": {
              backgroundColor: "rgba(0, 204, 255, 0.05)",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#0e112d",
              color: "#99e6ff",
              borderTop: "2px solid rgba(0, 204, 255, 0.5)",
            },
            "& .MuiPaginationItem-root": {
              color: "#66d9ff !important",
              fontWeight: "bold",
              fontSize: "14px",
              backgroundColor: "rgba(0, 204, 255, 0.1)",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "rgba(0, 204, 255, 0.3)",
              },
              "&.Mui-selected": {
                backgroundColor: "rgba(0, 204, 255, 0.5) !important",
                color: "#000000 !important",
                fontWeight: "bold",
              },
            },
            "& .MuiPaginationItem-root:hover": {
              color: "#000000",
              backgroundColor: "rgba(0, 204, 255, 0.4)",
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "rgba(0, 204, 255, 0.6) !important",
              color: "#000000 !important",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default CoolDataGrid;

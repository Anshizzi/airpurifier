import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const DataTable = ({ data }) => {
  return (
    <TableContainer component={Paper} className="table-container">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ color: "#61dafb", fontWeight: "bold" }}>Time</TableCell>
            <TableCell style={{ color: "#61dafb", fontWeight: "bold" }}>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell style={{ color: "white" }}>{row.time}</TableCell>
              <TableCell style={{ color: "white" }}>{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;

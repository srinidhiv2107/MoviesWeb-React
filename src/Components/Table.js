import React from 'react';

function Table({tableData, columns}) {
  return (
    <table id="movie-table">
      <thead id="movie-table-head">
      <tr>
        {columns.map((column, index) => (
          <th key={index}>{column.header}</th>
        ))}
      </tr>
      </thead>
      <tbody id="movie-table-body">
      {tableData.map((row, index) => (
        <tr key={index}>
          {columns.map((column, index) => (
            <td key={index}>{column.cellData? column.cellData(row): row[column.path]}</td>
          ))}
        </tr>
      ))}
      </tbody>
    </table>
  );
}

export default Table;

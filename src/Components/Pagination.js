import React from 'react';
import Line from "./Line";

function Pagination({totalPages, curPage, handlePageChange}) {
  let pageNums = [];
  for(let i = 1; i <= totalPages; ++i)
    pageNums.push(i);

  return (
    <>
      <div className="page-btns-area">
        {pageNums.map((page, index) => (
          <button key={index} className={(page === curPage)? "page-btn-clicked": "page-btn"}
                  onClick={() => handlePageChange(page)}>{page}</button>
        ))}
      </div>
      <Line className="bottom-line"/>
    </>
  );
}

export default Pagination;

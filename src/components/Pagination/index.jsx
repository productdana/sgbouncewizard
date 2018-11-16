import React from "react";
import cn from "classnames";
import "./index.scss";

const Pagination = ({
  prevPageIndex,
  nextPageIndex,
  updatePageIndex,
  pageIndex,
  numRules,
}) => {
  const endPage = pageIndex + (5 - (pageIndex % 5 === 0 ? 5 : pageIndex % 5));
  const startPage = endPage - 4;
  return (
    <div className="pagination pagination-container">
      <a
        className="btn btn-secondary btn-small pagination-prev"
        onClick={prevPageIndex}
        onKeyDown={() => {}}
        role="button"
        tabIndex="0"
      >
        Prev
      </a>
      <div className="pagination-links">
        {Array(endPage - startPage + 1)
          .fill()
          .map((_, i) => startPage + i)
          .map(number => (
            <a
              key={number}
              className={cn("pagination-link", {
                "is-active": number === pageIndex,
              })}
              onClick={() => updatePageIndex}
              onKeyDown={() => {}}
              role="button"
              tabIndex="0"
            >
              {number}
            </a>
          ))}
        <a className="pagination-ellipses">&hellip;</a>
        <a
          className="pagination-link"
          onClick={() => updatePageIndex}
          onKeyDown={() => {}}
          role="button"
          tabIndex="0"
        >
          {numRules}
        </a>
      </div>
      <a
        className="btn btn-secondary btn-small pagination-next"
        onClick={nextPageIndex}
        onKeyDown={() => {}}
        role="button"
        tabIndex="0"
      >
        Next
      </a>
    </div>
  );
};

export default Pagination;

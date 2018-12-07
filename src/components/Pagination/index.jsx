import React from "react";
import cn from "classnames";
import "./index.scss";

const pagesToDisplay = 5;

const Pagination = ({
  prevPageIndex,
  nextPageIndex,
  updatePageIndex,
  pageIndex,
  pageInterval,
  numRules,
}) => {
  const endPage =
    pageIndex +
    (pagesToDisplay -
      (pageIndex % pagesToDisplay === 0
        ? pagesToDisplay
        : pageIndex % pagesToDisplay));
  const startPage = endPage - (pagesToDisplay - 1);
  const totalPages = Math.ceil(numRules / pageInterval);
  return (
    <div className="pagination pagination-container">
      <a
        className={`btn btn-secondary btn-small pagination-prev ${
          pageIndex <= pagesToDisplay ? "is-disabled" : ""
        }`}
        onClick={prevPageIndex}
        onKeyDown={() => prevPageIndex}
        role="button"
        tabIndex="0"
      >
        Prev
      </a>
      {pageIndex > pagesToDisplay && (
        <span>
          <a
            className="pagination-link"
            onClick={() => updatePageIndex(1)}
            onKeyDown={() => updatePageIndex(1)}
            role="button"
            tabIndex="0"
          >
            {1}
          </a>
          <a className="pagination-ellipses">&hellip;</a>
        </span>
      )}
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
              onClick={() => updatePageIndex(number)}
              onKeyDown={() => updatePageIndex(number)}
              role="button"
              tabIndex="0"
            >
              {number}
            </a>
          ))}
        {pageIndex <= totalPages - pagesToDisplay && (
          <span>
            <a className="pagination-ellipses">&hellip;</a>
            <a
              className="pagination-link"
              onClick={() => updatePageIndex(totalPages)}
              onKeyDown={() => updatePageIndex(totalPages)}
              role="button"
              tabIndex="0"
            >
              {totalPages}
            </a>
          </span>
        )}
      </div>
      <a
        className={`btn btn-secondary btn-small pagination-next ${
          pageIndex > totalPages - pagesToDisplay ? "is-disabled" : ""
        }`}
        onClick={nextPageIndex}
        onKeyDown={() => nextPageIndex}
        role="button"
        tabIndex="0"
      >
        Next
      </a>
    </div>
  );
};

export default Pagination;

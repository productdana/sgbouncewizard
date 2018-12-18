import React from "react";
import cn from "classnames";
import "./index.scss";

const Pagination = ({
  prevPageIndex,
  nextPageIndex,
  updatePageIndex,
  pageIndex,
  pageInterval,
  pagesToDisplay,
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
  const shouldDisplayFirstPage = pageIndex > pagesToDisplay;
  const shouldDisplayLastPage = pageIndex <= totalPages - pagesToDisplay;
  const shouldDisplayPrev = pageIndex <= pagesToDisplay;
  const shouldDisplayNext = pageIndex > totalPages - pagesToDisplay;
  return (
    <div className="pagination pagination-container">
      <a
        className={`btn btn-secondary btn-small pagination-prev ${
          shouldDisplayPrev ? "is-disabled" : ""
        }`}
        onClick={prevPageIndex}
        onKeyDown={prevPageIndex}
        role="button"
        tabIndex="0"
      >
        Prev
      </a>
      {shouldDisplayFirstPage && (
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
        {shouldDisplayLastPage && (
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
          shouldDisplayNext ? "is-disabled" : ""
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

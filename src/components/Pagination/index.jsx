import React from "react";
import cn from "classnames";
import "./index.scss";

const Pagination = ({
  prevPageIndex,
  nextPageIndex,
  updatePageIndex,
  pageIndex,
  pageInterval,
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
      {pageIndex > 5 && (
        <span>
          <a
            className="pagination-link"
            onClick={() => updatePageIndex(Math.ceil(numRules / pageInterval))}
            onKeyDown={() =>
              updatePageIndex(Math.ceil(numRules / pageInterval))
            }
            role="button"
            tabIndex="0"
          >
            {Math.ceil(numRules / pageInterval).toString()}
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
        {pageIndex < Math.ceil(numRules / pageInterval - 5).toString() && (
          <span>
            <a className="pagination-ellipses">&hellip;</a>
            <a
              className="pagination-link"
              onClick={() =>
                updatePageIndex(Math.ceil(numRules / pageInterval))
              }
              onKeyDown={() =>
                updatePageIndex(Math.ceil(numRules / pageInterval))
              }
              role="button"
              tabIndex="0"
            >
              {Math.ceil(numRules / pageInterval).toString()}
            </a>
          </span>
        )}
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

import React from "react";
import cn from "classnames";
import { Column } from "../Column";
import "./index.scss";

function lastPageToDisplay(currentPageIndex, pagesToDisplay, totalPages) {
  const lastPageCalculation =
    currentPageIndex +
    (pagesToDisplay -
      (currentPageIndex % pagesToDisplay === 0
        ? pagesToDisplay
        : currentPageIndex % pagesToDisplay));
  const lastPage =
    lastPageCalculation > totalPages ? totalPages : lastPageCalculation;
  return lastPage;
}

function firstPageToDisplay(endPage, pagesToDisplay) {
  const startPage = endPage - (pagesToDisplay - 1);
  return startPage <= 1 ? 1 : startPage;
}

function calcShouldDisplayLastPage(
  totalPages,
  pagesToDisplay,
  currentPageIndex,
  endPage
) {
  if (totalPages < pagesToDisplay) {
    return false;
  }
  if (currentPageIndex <= endPage) {
    return true;
  }
  return false;
}

const Pagination = ({
  handlePrevClicked,
  handleNextClicked,
  updatePageIndex,
  currentPageIndex,
  rulesToShow,
  pagesToDisplay,
  numRules,
}) => {
  const totalPages = Math.ceil(numRules / rulesToShow);
  const endPage = lastPageToDisplay(
    currentPageIndex,
    pagesToDisplay,
    totalPages
  );
  const startPage = firstPageToDisplay(endPage, pagesToDisplay);
  const shouldDisplayFirstPage = currentPageIndex > pagesToDisplay;
  const shouldDisplayLastPage = calcShouldDisplayLastPage(
    totalPages,
    pagesToDisplay,
    currentPageIndex,
    endPage
  );
  const shouldDisplayPrev = currentPageIndex === 1;
  const shouldDisplayNext = currentPageIndex === totalPages;
  return (
    <Column width={10} offset={2}>
      <div className="pagination pagination-container">
        <a
          className={`btn btn-secondary btn-small pagination-prev ${
            shouldDisplayPrev ? "is-disabled" : ""
          }`}
          onClick={handlePrevClicked}
          onKeyDown={handlePrevClicked}
          role="button"
          tabIndex="0"
        >
          Prev
        </a>
        {shouldDisplayFirstPage && (
          <span>
            <a
              className="pagination-link"
              onClick={updatePageIndex}
              onKeyDown={updatePageIndex}
              value={1}
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
                  "is-active": number === currentPageIndex,
                })}
                onClick={updatePageIndex}
                onKeyDown={updatePageIndex}
                value={number}
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
                onClick={updatePageIndex}
                onKeyDown={updatePageIndex}
                value={totalPages}
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
          onClick={handleNextClicked}
          onKeyDown={handleNextClicked}
          role="button"
          tabIndex="0"
        >
          Next
        </a>
      </div>
    </Column>
  );
};

export default Pagination;

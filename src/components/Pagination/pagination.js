import React from "react";
import Pagination from "react-bootstrap/Pagination";
import { Link } from "react-router-dom";

const MyCustomLink = ({ className, to, children }) => (
  <Link className={className} to={to}>
    {children}
  </Link>
);

export default function PaginationController({ pageNumber, maxPages }) {
  pageNumber = parseInt(pageNumber, 10);

  return (
    <Pagination className="justify-content-center">
      <Pagination.Prev
        to={`/page/${pageNumber > 1 ? pageNumber - 1 : 1}`}
        as={MyCustomLink}
      />

      <Pagination.Item>{pageNumber}</Pagination.Item>
      <Pagination.Next
        to={`/page/${maxPages > pageNumber ? pageNumber + 1 : pageNumber}`}
        as={MyCustomLink}
      />
    </Pagination>
  );
}

import React from "react";
import { useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";

import { setCurrentPage } from "../../redux/slices/paginationSplice";

import styles from "./Pagination.module.scss";

const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <ReactPaginate
      className={styles.root} 
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => dispatch(setCurrentPage(e.selected + 1))}
      pageRangeDisplayed={8}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;

import Pagination from "react-bootstrap/Pagination";
import "./Pagination.css";
import { MyPaginationProps } from "../../utils/Interfaces/Pagination.interface";



function MyPagination({ total, currentPage, onChangePage }: MyPaginationProps) {
  const items: React.JSX.Element[] = [];
  if (currentPage > 1) {
    
    items.push(
      <Pagination.Prev
        key="prev"
        onClick={() => onChangePage(currentPage - 1)}
      />
    );
  }

  for (let page = 1; page <= total; page++) {
    items.push(
      <Pagination.Item
        key={page}
        data-page={page}
        active={page === currentPage}
        onClick={() => onChangePage(page)}
      >
        {page}
      </Pagination.Item>
    );
  }

  if (currentPage < total) {
    items.push(
      <Pagination.Next
        key="next"
        onClick={() => onChangePage(currentPage + 1)}
      />
    );
  }

  return <Pagination>{items}</Pagination>;
}

export default MyPagination;

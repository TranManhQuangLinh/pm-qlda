import React, { useState } from "react";
import { useNavigate, useSearchParams, Form, Link } from "react-router-dom";

function Table({ data, columns }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();

  const urlPage = parseInt(searchParams.get("page"));
  //   console.log(urlPage);

  if (!isNaN(urlPage) && urlPage !== currentPage) {
    setCurrentPage(urlPage);
  }

  if (isNaN(urlPage) && currentPage !== 1) {
    setCurrentPage(1);
  }

  const navigate = useNavigate();

  const itemsPerPage = 10;
  const totalItems = Object.keys(data).length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  // console.log('totalPages', totalPages);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = Object.values(data).slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    searchParams.set("page", page.toString());

    const isFirstSearch = isNaN(urlPage);
    navigate(`?${searchParams.toString()}`, { replace: !isFirstSearch });
  };

  const handleInputPageChange = (e) => {
    let newPage = parseInt(e.target.value);
    if (!isNaN(newPage)) {
      if (newPage < 1) {
        newPage = 1;
      } else if (newPage > totalPages) {
        newPage = totalPages;
      }
      setCurrentPage(newPage);
      navigate(`?page=${newPage}`);
    } else {
      setCurrentPage(1);
      navigate(`?page=1`);
    }
  };

  const handleInputPageClick = (e) => {
    var elemLen = e.target.value.length;
    e.target.selectionStart = 0;
    e.target.selectionEnd = elemLen;
    e.target.focus();
  };

  return (
    <>
      <table className="list-table table table-bordered align-middle">
        <thead>
          <tr>
            <th>STT</th>
            {columns.map((column, index) => (
              <th key={index}>{column.text}</th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody className="align-middle">
          {currentData.map((item, index) => (
            <tr key={index}>
              <td>{startIndex + index + 1}</td>

              {columns.map((column, columnIndex) => {
                let className = "text-break";
                let content = item[column.dataField];
                if (column.dataField === "status") {
                  className += " " + item[column.dataField].toLowerCase();
                  content = item[column.dataField].toUpperCase();
                }

                if (column.isObject) {
                  content = item[column.dataField].map((i, contentIndex) => {
                    return (
                      <React.Fragment key={contentIndex}>
                        <Link
                          to={
                            "/" +
                            column.objGroup +
                            "/" +
                            column.dataField +
                            "/detail/" +
                            i.id
                          }
                          className="link-info text-decoration-none"
                        >
                          {i.name}
                        </Link>
                        {contentIndex !== item[column.dataField].length - 1
                          ? ", "
                          : ""}
                      </React.Fragment>
                    );
                  });
                }

                return (
                  <td key={columnIndex} className={className}>
                    {content}
                  </td>
                );
              })}

              <td>
                <div className="d-flex justify-content-evenly">
                  <Form
                    action={`detail/${Object.keys(data)[startIndex + index]}`}
                  >
                    <button className="btn btn-info btn-lg" type="submit">
                      Chi tiết
                    </button>
                  </Form>
                  <Form
                    action={`update/${Object.keys(data)[startIndex + index]}`}
                  >
                    <button className="btn btn-success btn-lg" type="submit">
                      Sửa
                    </button>
                  </Form>
                  <Form
                    method="post"
                    action={`delete/${Object.keys(data)[startIndex + index]}`}
                  >
                    <button className="btn btn-danger btn-lg">Xóa</button>
                  </Form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination justify-content-end">
        <button
          className="btn btn-primary"
          disabled={currentPage === 1 || totalPages === 0}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          &lt;
        </button>
        <input
          className="page-number"
          value={currentPage}
          onChange={handleInputPageChange}
          onClick={handleInputPageClick}
        />
        <button
          className="btn btn-primary"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          &gt;
        </button>
      </div>
    </>
  );
}

export default Table;

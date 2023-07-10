import { useState } from "react";

function Table({ data, columns }) {


    // const itemsPerPageOptions = [5, 10, 20, 30, 40, 50]; // Options for items per page

    const [currentPage, setCurrentPage] = useState(1);

    // const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);
    const itemsPerPage = 10
    // Calculate pagination values
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
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
        } else {
            setCurrentPage(1);
        }
    };

    const handleInputPageClick = (e) => {
        var elemLen = e.target.value.length; 
        e.target.selectionStart = 0;
        e.target.selectionEnd = elemLen;
        e.target.focus();
    }

    // // Handle items per page change
    // const handleItemsPerPageChange = (e) => {
    //     const newItemsPerPage = parseInt(e.target.value);
    //     setItemsPerPage(newItemsPerPage);
    //     setCurrentPage(1);
    // };

    return (
        <>
            <table className="danh-sach-table table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>STT</th>
                        {columns.map((column, index) => (
                            <th key={index}>{column.text}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((item, index) => (
                        <tr key={index}>
                            <td>{startIndex + index + 1}</td>
                            {columns.map((column, columnIndex) => (
                                <td
                                    key={columnIndex}
                                    className={
                                        column.dataField === "trang_thai"
                                            ? item[column.dataField].toLowerCase()
                                            : ""
                                    }
                                >
                                    {item[column.dataField]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination justify-content-end">
                <button
                    className="btn btn-primary"
                    disabled={currentPage === 1}
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
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    
                >
                    &gt;
                </button>
            </div>

            {/* <div className="items-per-page">
                <label htmlFor="itemsPerPage">Items per page:</label>
                <select
                    id="itemsPerPage"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                >
                    {itemsPerPageOptions.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div> */}
        </>
    )
}

export default Table
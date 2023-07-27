import React, { useState } from 'react';
import { Form, Link, useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import { getListManagement } from '../../../database';

export async function loader() {
    const data = await getListManagement('project')
    return { data }
}

export default function ProjectList() {
    const { data } = useLoaderData()

    // const data = {
    //     '0rjlnjz': {
    //         name: "js",
    //         projectType: '',
    //         projectStatus: '',
    //         techStack: '',
    //         center: '',
    //         personnel: '',
    //     }
    // }

    const columns = [
        {
            dataField: "name",
            text: "Tên"
        },
        {
            dataField: "projectType",
            text: "Loại dự án"
        },
        {
            dataField: "projectStatus",
            text: "Trạng thái dự án"
        },
        {
            dataField: "techStack",
            text: "Tech stack"
        },
        {
            dataField: "center",
            text: "Trung tâm phụ trách"
        },
        {
            dataField: "personnel",
            text: "Thành viên trong dự án"
        },
    ];

    // Table
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams] = useSearchParams();

    const urlPage = parseInt(searchParams.get('page'));
    //   console.log(urlPage);

    if (!isNaN(urlPage) && urlPage !== currentPage) {
        setCurrentPage(urlPage);
    }

    if (isNaN(urlPage) && currentPage !== 1) {
        setCurrentPage(1)
    }

    const navigate = useNavigate();

    const itemsPerPage = 10;
    const totalItems = Object.keys(data).length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = Object.values(data).slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        searchParams.set('page', page.toString());

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
        <div className='container'>
            <div className='row'>
                <div className="title">Dự án</div>
            </div>
            <div className='row justify-content-end'>
                <Link to={`/quanly/project/taomoi`} type="button" className="btn-create btn btn-primary">Tạo</Link>
            </div>
            <div className='row'>
                <table className="danh-sach-table table table-bordered table-hover">
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

                                {columns.map((column, columnIndex) => (
                                    <td
                                        key={columnIndex}
                                    >
                                        {item[column.dataField]}
                                    </td>
                                ))}

                                <td className="d-flex justify-content-evenly">
                                    <Form
                                        action={`update/${Object.keys(data)[startIndex + index]}`}
                                    >
                                        <button
                                            className="btn btn-success btn-lg"
                                            type="submit"
                                        >
                                            Sửa
                                        </button>

                                    </Form>
                                    <Form
                                        method="post"
                                        action={`delete/${Object.keys(data)[startIndex + index]}`}
                                    >
                                        <button
                                            className="btn btn-danger btn-lg"
                                        >
                                            Xóa
                                        </button>
                                    </Form>
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
            </div>

        </div>
    );
}


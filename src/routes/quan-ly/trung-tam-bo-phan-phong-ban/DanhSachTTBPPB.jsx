import React, { useState } from 'react';
import { Form, Link, useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import { getDSQuanLy, getDanhMuc } from '../../../database';

export async function loader() {
    const data = await getDSQuanLy('ttbppb');
    console.log(data);
    const resolvedData = await Promise.all(
        Object.entries(data).map(async ([key, item]) => {
            if (item.techstack && Array.isArray(item.techstack)) {
                item.techstack = await Promise.all(
                    item.techstack.map((i) => getDanhMuc(i, 'techstack'))
                );
            } else {
                item.techstack = []; // Provide a default empty array
            }
            return item;
        })
    );

    console.log(resolvedData);
    return { data };
}



export default function DanhSachTTBPPB() {
    const { data } = useLoaderData()
    // console.log(data);
    // const data = {
    //     '0rjlnjz': {
    //         ten: "js",
    //         mota: '',
    //         techstack: ['-N_DNueEa36ueEz5LTLq', '-N_DNv--S-qUPuzq35O9'],
    //         duan: '',
    //         nhanvien: '',
    //     }
    // }

    const columns = [
        {
            dataField: "ten",
            text: "Tên"
        },
        {
            dataField: "mota",
            text: "Chức năng, nhiệm vụ"
        },
        {
            dataField: "techstack",
            text: "Tech stack"
        },
        {
            dataField: "duan",
            text: "Dự án"
        },
        {
            dataField: "nhanvien",
            text: "Nhân viên"
        },
    ];

    // Table
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();

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
                <div className="title">Trung tâm, bộ phận, phòng ban</div>
            </div>
            <div className='row justify-content-end'>
                <Link to={`/quanly/ttbppb/taomoi`} type="button" className="btn-tao btn btn-primary">Tạo</Link>
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

                                {columns.map((column, columnIndex) => {
                                    if (column.dataField === "techstack") {
                                        return (
                                            <td key={columnIndex}>
                                                <ul>
                                                    {item[column.dataField].map((tech, techIndex) => (
                                                        <li key={techIndex}>
                                                            <div>Tên: {tech.ten}</div>
                                                            <div>Mô tả: {tech.mota}</div>
                                                            <div>Trạng thái: <div className={tech.trangthai}>{tech.trangthai.toUpperCase()}</div></div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </td>
                                        );
                                    } else {
                                        return (
                                            <td key={columnIndex}>{item[column.dataField]}</td>
                                        );
                                    }
                                })}

                                <td className="d-flex justify-content-evenly">
                                    <Form
                                        action={`sua/${Object.keys(data)[startIndex + index]}`}
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
                                        action={`xoa/${Object.keys(data)[startIndex + index]}`}
                                    >
                                        <button
                                            className="btn btn-danger btn-lg"
                                        >
                                            Xóa
                                        </button>
                                    </Form>
                                </td>
                            </tr>
                        ))
                        }
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

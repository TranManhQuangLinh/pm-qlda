import React from 'react';
import Table from '../components/Table';
import { Link, useLoaderData } from "react-router-dom";
import { getDSLoaiDuAn } from '../database';

export async function loader({ request }) {
    const data = await getDSLoaiDuAn()
    return { data }
}

function DanhSach() {
    const { data } = useLoaderData()
    // const data = {
    //     '0rjlnjz': {
    //         mota: "",
    //         ten: "js",
    //         trangthai: "inactive",
    //         trongso: "1"
    //     },
    //     '4r0vt4b':
    //     {
    //         mota: "asd",
    //         ten: "js",
    //         trangthai: "active",
    //         trongso: "1"
    //     }
    // }
    
    const newData = { ...data };

    for (let i = 0; i < 100; i++) {
        const id = Math.random().toString(36).substring(2, 9);
        newData[id] = {
            mota: `Description ${i + 1}`,
            ten: `Project ${i + 1}`,
            trangthai: i % 2 === 0 ? "active" : "inactive",
            trongso: `${i + 1}`
        };
    }

    const columns = [
        {
            dataField: "ten",
            text: "Tên"
        },
        {
            dataField: "mota",
            text: "Mô tả"
        },
        {
            dataField: "trongso",
            text: "Ưu tiên"
        },
        {
            dataField: "trangthai",
            text: "Trạng thái"
        },
    ];

    return (
        <div className='container'>
            <div className='row'>
                <div className="title">Loại dự án</div>
            </div>
            <div className='row justify-content-end'>
                <Link to={'/danhsach/loaiduan/taomoi'} type="button" className="btn-tao btn btn-primary">Tạo</Link>
            </div>
            <div className='row'>
                <Table data={newData} columns={columns} />
            </div>

        </div>
    );
}

export default DanhSach;

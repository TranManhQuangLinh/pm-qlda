import React from 'react';
import Table from '../components/Table';
import { Link, useLoaderData } from "react-router-dom";
import { getDSDanhMuc } from '../database';

export async function loader({ params }) {
    const objName = params.objName
    // console.log(objName);
    const data = await getDSDanhMuc(objName ? objName : 'loaiduan')
    return { data, objName }
}

function DanhSach() {
    const { data, objName } = useLoaderData()
    let title
    switch (objName) {
        case 'loaiduan':
            title = 'Loại dự án'
            break;
        case 'trangthaiduan':
            title = 'Trạng thái dự án'
            break;
        case 'techstack':
            title = 'Tech Stack'
            break;
        case 'nhomkhachhang':
            title = 'Nhóm khách hàng'
            break;
        default:
            title = 'Not Found'
            break;
    }
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
        // {
        //     dataField: "trongso",
        //     text: "Ưu tiên"
        // },
        // {
        //     dataField: "trangthai",
        //     text: "Trạng thái"
        // },
    ];

    if(!objName || objName === 'loaiduan' || objName === 'nhomkhachhang'){
        columns.push(
            {
                dataField: "trongso",
                text: "Ưu tiên"
            }
            )
    }

    columns.push(
        {
            dataField: "trangthai",
            text: "Trạng thái"
        }
        )

    return (
        <div className='container'>
            <div className='row'>
                <div className="title">{title}</div>
            </div>
            <div className='row justify-content-end'>
                <Link to={`/danhmuc/${objName ? objName : 'loaiduan'}/taomoi`} type="button" className="btn-tao btn btn-primary">Tạo</Link>
            </div>
            <div className='row'>
                <Table data={data} columns={columns} />
            </div>

        </div>
    );
}

export default DanhSach;

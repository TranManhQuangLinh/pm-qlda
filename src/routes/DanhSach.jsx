import React from 'react';
import Table from '../components/Table';

function DanhSach() {
    const data = [
        {
            ten: "AI",
            mo_ta: "Nhận diện giọng nói",
            uu_tien: "1",
            trang_thai: "ACTIVE"
        },
        {
            ten: "Ecommerce",
            mo_ta: "Web bán hàng",
            uu_tien: "2",
            trang_thai: "INACTIVE"
        },
        // Add more data objects as needed
    ];

    // Generate additional data objects
    for (let i = 0; i < 10000; i++) {
        data.push({
            ten: `Project ${i + 3}`,
            mo_ta: `Description ${i + 3}`,
            uu_tien: `${i + 3}`,
            trang_thai: i % 2 === 0 ? "ACTIVE" : "INACTIVE",
        });
    }

    const columns = [
        {
            dataField: "ten",
            text: "Tên"
        },
        {
            dataField: "mo_ta",
            text: "Mô tả"
        },
        {
            dataField: "uu_tien",
            text: "Ưu tiên"
        },
        {
            dataField: "trang_thai",
            text: "Trạng thái"
        },
    ];



    return (
        <div className='container'>
            <div className='row'>
                <div className="title">Loại dự án</div>
            </div>
            <div className='row justify-content-end'>
                <button type="button" className="btn-tao btn btn-primary">Tạo</button>
            </div>
            <div className='row'>
                <Table data={data} columns={columns} />
            </div>

        </div>
    );
}

export default DanhSach;

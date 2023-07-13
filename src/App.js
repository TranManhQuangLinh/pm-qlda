import { useState } from 'react';
import './App.css';

import { Link, Outlet } from 'react-router-dom';

function App() {
  const [objName , setObjName] = useState('loaiduan')
  // console.log('app objName:', objName);
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-2 ps-0'>
          <div className="accordion" id="accordionPanelsStayOpenExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                  Danh mục
                </button>
              </h2>
              <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
                <div className="accordion-body">
                  <div className={`sidebar-item ${objName === 'loaiduan' ? 'selected' : ''}`}>
                    <Link to={'danhmuc/loaiduan'} onClick={() => setObjName('loaiduan')}>Loại dự án</Link>
                  </div>
                  <div className={`sidebar-item ${objName === 'trangthaiduan' ? 'selected' : ''}`}>
                    <Link to={'danhmuc/trangthaiduan'} onClick={() => setObjName('trangthaiduan')}>Trạng thái dự án</Link>
                  </div>
                  <div className={`sidebar-item ${objName === 'techstack' ? 'selected' : ''}`}>
                    <Link to={'danhmuc/techstack'} onClick={() => setObjName('techstack')}>Tech stack</Link>
                  </div>
                  <div className={`sidebar-item ${objName === 'nhomkhachhang' ? 'selected' : ''}`}>
                    <Link to={'danhmuc/nhomkhachhang'} onClick={() => setObjName('nhomkhachhang')}>Nhóm khách hàng</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="true" aria-controls="panelsStayOpen-collapseTwo">
                  Quản lý
                </button>
              </h2>
              <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse show">
                <div className="accordion-body">
                  <div className={`sidebar-item ${objName === 'ttbppb' ? 'selected' : ''}`}>
                    <Link to={'quanly/ttbppb'} onClick={() => setObjName('ttbppb')}>Trung tâm, bộ phận, phòng ban</Link>
                  </div>
                  <div className={`sidebar-item ${objName === 'nhansu' ? 'selected' : ''}`}>
                    <Link to={'quanly/nhansu'} onClick={() => setObjName('nhansu')}>Nhân sự</Link>
                  </div>
                  <div className={`sidebar-item ${objName === 'duan' ? 'selected' : ''}`}>
                    <Link to={'quanly/duan'} onClick={() => setObjName('duan')}>Dự án</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="true" aria-controls="panelsStayOpen-collapseThree">
                  Báo cáo
                </button>
              </h2>
              <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse show">
                <div className="accordion-body">
                  <div className={`sidebar-item ${objName === 'soluongduan' ? 'selected' : ''}`}>
                    <Link to={'baocao/soluongduan'} onClick={() => setObjName('soluongduan')}>Số lượng dự án</Link>
                  </div>
                  <div className={`sidebar-item ${objName === 'soluongnhansu' ? 'selected' : ''}`}>
                    <Link to={'baocao/soluongnhansu'} onClick={() => setObjName('soluongnhansu')}>Số lượng nhân sự</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-10'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}


export default App;

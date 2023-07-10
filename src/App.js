import './App.css';

import { Link, Outlet } from 'react-router-dom';

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCkbBVBMZO7CpALpXkZrEbSIwpqheW0MJ0",
//   authDomain: "phan-mem-quan-ly-du-an.firebaseapp.com",
//   projectId: "phan-mem-quan-ly-du-an",
//   storageBucket: "phan-mem-quan-ly-du-an.appspot.com",
//   messagingSenderId: "99101813519",
//   appId: "1:99101813519:web:649043d9fbb3016b2f2c7a",
//   measurementId: "G-L1W6HR8E3G"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);



function App() {
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
                  <div className='sidebar-item selected'><Link to ={'danhsach/loaiduan'}>Loại dự án</Link></div>
                  <div className='sidebar-item'><Link to={''}>Trạng thái dự án</Link></div>
                  <div className='sidebar-item'><Link to={''}>Tech stack</Link></div>
                  <div className='sidebar-item'><Link to={''}>Nhóm khách hàng</Link></div>
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
                  <div className='sidebar-item'><Link to={''}>Trung tâm, bộ phận, phòng ban</Link></div>
                  <div className='sidebar-item'><Link to={''}>Nhân sự</Link></div>
                  <div className='sidebar-item'><Link to={''}>Dự án</Link></div>
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
                  <div className='sidebar-item'><Link to={''}>Số lượng dự án</Link></div>
                  <div className='sidebar-item'><Link to={''}>Số lượng nhân sự</Link></div>
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

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App, {

} from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './error-page';
import DanhSach, {
  loader as danhSachLoader,
} from './routes/DanhSach';
import TaoMoiSua, {
  actionTaoMoi,
  actionSua,
  loaderSua,
  loaderTaoMoi
} from './routes/TaoMoiSua';
import {
  action as actionXoa,
} from './routes/xoa'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <DanhSach />,
            loader: danhSachLoader,
          },
          {
            path: "sua/:id",
            element: <TaoMoiSua />,
            loader: loaderSua,
            action: actionSua,
          },
          {
            path: "xoa/:id",
            action: actionXoa,
            element: <></>,
          },
          {
            path: "danhmuc/:objName",
            element: <DanhSach />,
            loader: danhSachLoader,
          },
          {
            path: "danhmuc/:objName/taomoi",
            element: <TaoMoiSua />,
            action: actionTaoMoi,
            loader: loaderTaoMoi,
          },
          {
            path: "danhmuc/:objName/sua/:id",
            element: <TaoMoiSua />,
            loader: loaderSua,
            action: actionSua,
          },
          {
            path: "danhmuc/:objName/xoa/:id",
            action: actionXoa,
            element: <></>,
          },
          {
            path: ""
          }
        ]

      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

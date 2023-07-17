import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App, {
  loader as loaderApp,
} from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './error-page';

// Danh muc
import DanhSach, {
  loader as loaderDanhSach,
} from './routes/danh-muc/DanhSach';
import TaoMoiSua, {
  actionTaoMoi,
  actionSua,
  loaderSua,
  loaderTaoMoi
} from './routes/danh-muc/TaoMoiSua';
import {
  action as actionXoa,
} from './routes/danh-muc/xoa'

// Quan ly
import DanhSachDuAn, {
  loader as loaderDSDA,
} from "./routes/quan-ly/du-an/DanhSachDuAn";
import TaoMoiSuaDuAn from "./routes/quan-ly/du-an/TaoMoiSuaDuAn"
import DanhSachTTBPPB, {
  loader as loaderDSTTBPPB,
} from './routes/quan-ly/trung-tam-bo-phan-phong-ban/DanhSachTTBPPB';
import TaoMoiSuaTTBPPB, {
  loaderTaoMoi as loaderTaoMoiTTBPPB,
  actionTaoMoi as actionTaoMoiTTBPPB,
  loaderSua as loaderSuaTTBPPB,
  actionSua as actionSuaTTBPPB,
} from './routes/quan-ly/trung-tam-bo-phan-phong-ban/TaoMoiSuaTTBPPB';
import { action as actionXoaTTBPPB } from "./routes/quan-ly/trung-tam-bo-phan-phong-ban/xoaTTBPPB";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: loaderApp,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <DanhSach />,
            loader: loaderDanhSach,
          },
          {
            path: "sua/:id",
            element: <TaoMoiSua />,
            loader: loaderSua,
            action: actionSua,
          },
          {
            path: "xoa/:id",
            element: <></>,
            action: actionXoa,
          },
          {
            path: "danhmuc/:objName",
            element: <DanhSach />,
            loader: loaderDanhSach,
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
            element: <></>,
            action: actionXoa,
          },
          {
            path: "quanly/ttbppb",
            element: <DanhSachTTBPPB />,
            loader: loaderDSTTBPPB,
          },
          {
            path: "quanly/ttbppb/taomoi",
            element: <TaoMoiSuaTTBPPB />,
            loader: loaderTaoMoiTTBPPB,
            action: actionTaoMoiTTBPPB,
          },
          {
            path: "quanly/ttbppb/sua/:id",
            element: <TaoMoiSuaTTBPPB />,
            loader: loaderSuaTTBPPB,
            action: actionSuaTTBPPB,
          },
          {
            path: "quanly/ttbppb/xoa/:id",
            element: <></>,
            action: actionXoaTTBPPB,
          },
          {
            path: "quanly/nhansu",
            element: <DanhSachDuAn />,
            loader: loaderDSDA,
          },
          {
            path: "quanly/nhansu/taomoi",
            element: <TaoMoiSuaDuAn />,

          },
          {
            path: "quanly/nhansu/sua/:id",
            element: <></>,

          },
          {
            path: "quanly/nhansu/xoa/:id",
            element: <></>,

          },
          {
            path: "quanly/duan",
            element: <DanhSachDuAn />,
            loader: loaderDSDA,
          },
          {
            path: "quanly/duan/taomoi",
            element: <TaoMoiSuaDuAn />,

          },
          {
            path: "quanly/duan/sua/:id",
            element: <></>,

          },
          {
            path: "quanly/duan/xoa/:id",
            element: <></>,

          },
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

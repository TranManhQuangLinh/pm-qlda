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

// Category
import List, {
  loader as listLoader,
} from './pages/category/List';
import CreateUpdate, {
  createLoader,
  createAction,
  updateLoader,
  updateAction,
} from './pages/category/CreateUpdate';
import {
  action as deleteAction,
} from './pages/category/delete'

// Management
import ListCenter, {
  loader as centerLoader,
} from './pages/management/center/ListCenter';
import CreateUpdateCenter, {
  createLoader as createCenterLoader,
  createAction as createCenterAction,
  updateLoader as updateCenterLoader,
  updateAction as updateCenterAction,
} from './pages/management/center/CreateUpdateCenter';
import { action as deleteCenterAction } from "./pages/management/center/deleteCenter";

import ListPersonnel, { 
  loader as personnelLoader,
} from "./pages/management/personnel/ListPersonnel";

import ListProject, {
  loader as loaderDSDA,
} from "./pages/management/project/ListProject";
import CreateUpdateProject from "./pages/management/project/CreateUpdateProject"

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
            element: <List />,
            loader: listLoader,
          },
          {
            path: "update/:id",
            element: <CreateUpdate />,
            loader: updateLoader,
            action: updateAction,
          },
          {
            path: "delete/:id",
            element: <></>,
            action: deleteAction,
          },
          {
            path: "category/:objName",
            element: <List />,
            loader: listLoader,
          },
          {
            path: "category/:objName/create",
            element: <CreateUpdate />,
            action: createAction,
            loader: createLoader,
          },
          {
            path: "category/:objName/update/:id",
            element: <CreateUpdate />,
            loader: updateLoader,
            action: updateAction,
          },
          {
            path: "category/:objName/delete/:id",
            element: <></>,
            action: deleteAction,
          },
          {
            path: "management/center",
            element: <ListCenter />,
            loader: centerLoader,
          },
          {
            path: "management/center/create",
            element: <CreateUpdateCenter />,
            loader: createCenterLoader,
            action: createCenterAction,
          },
          {
            path: "management/center/update/:id",
            element: <CreateUpdateCenter />,
            loader: updateCenterLoader,
            action: updateCenterAction,
          },
          {
            path: "management/center/delete/:id",
            element: <></>,
            action: deleteCenterAction,
          },
          {
            path: "management/personnel",
            element: <ListPersonnel />,
            loader: personnelLoader,
          },
          {
            path: "management/personnel/create",
            element: <CreateUpdateProject />,

          },
          {
            path: "management/personnel/update/:id",
            element: <></>,

          },
          {
            path: "management/personnel/delete/:id",
            element: <></>,

          },
          {
            path: "management/project",
            element: <ListProject />,
            loader: loaderDSDA,
          },
          {
            path: "management/project/create",
            element: <CreateUpdateProject />,

          },
          {
            path: "management/project/update/:id",
            element: <></>,

          },
          {
            path: "management/project/delete/:id",
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

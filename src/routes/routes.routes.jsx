import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/error-page";

// Category
import ListCategoryPage from "../pages/category/ListCategoryPage";
import { loader as listCategoryLoader } from "../modules/category/ListCategory";

import CategoryDetailPage from "../pages/category/CategoryDetailPage";

import CreateUpdateCategoryPage from "../pages/category/CreateUpdateCategoryPage";
import {
  createLoader as createCategoryLoader,
  createAction as createCategoryAction,
  updateLoader as updateCategoryLoader,
  updateAction as updateCategoryAction,
} from "../modules/category/CreateUpdateCategory";

import { action as deleteCategoryAction } from "../modules/category/deleteCategory";

// Management
import ListCenterPage from "../pages/management/center/ListCenterPage";
import { loader as centerLoader } from "../modules/management/center/ListCenter";

import CenterDetailPage from "../pages/management/center/CenterDetailPage";
import { loader as centerDetailLoader } from "../modules/management/center/CenterDetail"

import CreateUpdateCenterPage from "../pages/management/center/CreateUpdateCenterPage";
import {
  createLoader as createCenterLoader,
  createAction as createCenterAction,
  updateLoader as updateCenterLoader,
  updateAction as updateCenterAction,
} from "../modules/management/center/CreateUpdateCenter";

import { action as deleteCenterAction } from "../modules/management/center/deleteCenter";

import ListPersonnelPage from "../pages/management/personnel/ListPersonnelPage";
import { loader as personnelLoader } from "../modules/management/personnel/ListPersonnel";

import ListProjectPage from "../pages/management/project/ListProjectPage";
import { loader as projectLoader } from "../modules/management/project/ListProject";

import CreateUpdateProjectPage from "../pages/management/project/CreateUpdateProjectPage";

import { Layout } from "../layout";
import {
  PATH_CATEGORY_OBJECT,
  PATH_CATEGORY_OBJECT_CREATE,
  PATH_CATEGORY_OBJECT_DELETE,
  PATH_CATEGORY_OBJECT_DETAIL,
  PATH_CATEGORY_OBJECT_UPDATE,
  PATH_CENTER,
  PATH_CENTER_CREATE,
  PATH_CENTER_DELETE,
  PATH_CENTER_DETAIL,
  PATH_CENTER_UPDATE,
  PATH_INDEX_DELETE,
  PATH_INDEX_DETAIL,
  PATH_INDEX_UPDATE,
  PATH_PERSONNEL,
  PATH_PERSONNEL_CREATE,
  PATH_PERSONNEL_DELETE,
  PATH_PERSONNEL_UPDATE,
  PATH_PROJECT,
  PATH_PROJECT_CREATE,
  PATH_PROJECT_DELETE,
  PATH_PROJECT_UPDATE,
} from "./routes.paths";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <ListCategoryPage />,
            loader: listCategoryLoader,
          },
          {
            path: PATH_INDEX_DETAIL,
            element: <CategoryDetailPage />,
            loader: updateCategoryLoader,
          },
          {
            path: PATH_INDEX_UPDATE,
            element: <CreateUpdateCategoryPage />,
            loader: updateCategoryLoader,
            action: updateCategoryAction,
          },
          {
            path: PATH_INDEX_DELETE,
            element: <></>,
            action: deleteCategoryAction,
          },
          {
            path: PATH_CATEGORY_OBJECT,
            element: <ListCategoryPage />,
            loader: listCategoryLoader,
          },
          {
            path: PATH_CATEGORY_OBJECT_CREATE,
            element: <CreateUpdateCategoryPage />,
            action: createCategoryAction,
            loader: createCategoryLoader,
          },
          {
            path: PATH_CATEGORY_OBJECT_DETAIL,
            element: <CategoryDetailPage />,
            loader: updateCategoryLoader,
          },
          {
            path: PATH_CATEGORY_OBJECT_UPDATE,
            element: <CreateUpdateCategoryPage />,
            loader: updateCategoryLoader,
            action: updateCategoryAction,
          },
          {
            path: PATH_CATEGORY_OBJECT_DELETE,
            element: <></>,
            action: deleteCategoryAction,
          },
          {
            path: PATH_CENTER,
            element: <ListCenterPage />,
            loader: centerLoader,
          },
          {
            path: PATH_CENTER_CREATE,
            element: <CreateUpdateCenterPage />,
            loader: createCenterLoader,
            action: createCenterAction,
          },
          {
            path: PATH_CENTER_DETAIL,
            element: <CenterDetailPage />,
            loader: centerDetailLoader,
          },
          {
            path: PATH_CENTER_UPDATE,
            element: <CreateUpdateCenterPage />,
            loader: updateCenterLoader,
            action: updateCenterAction,
          },
          {
            path: PATH_CENTER_DELETE,
            element: <></>,
            action: deleteCenterAction,
          },
          {
            path: PATH_PERSONNEL,
            element: <ListPersonnelPage />,
            loader: personnelLoader,
          },
          {
            path: PATH_PERSONNEL_CREATE,
            element: <CreateUpdateProjectPage />,
          },
          {
            path: PATH_PERSONNEL_UPDATE,
            element: <></>,
          },
          {
            path: PATH_PERSONNEL_DELETE,
            element: <></>,
          },
          {
            path: PATH_PROJECT,
            element: <ListProjectPage />,
            loader: projectLoader,
          },
          {
            path: PATH_PROJECT_CREATE,
            element: <CreateUpdateProjectPage />,
          },
          {
            path: PATH_PROJECT_UPDATE,
            element: <></>,
          },
          {
            path: PATH_PROJECT_DELETE,
            element: <></>,
          },
        ],
      },
    ],
  },
]);

import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/error-page";

// Category
import ListCategoryPage from "../pages/category/CategoryListPage";
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
// Center
import CenterListPage from "../pages/management/center/CenterListPage";
import { loader as centerLoader } from "../modules/management/center/CenterList";

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

// Personnel
import PersonnelListPage from "../pages/management/personnel/PersonnelListPage";
import { loader as personnelLoader } from "../modules/management/personnel/PersonnelList";


import PersonnelDetailPage from "../pages/management/personnel/PersonnelDetailPage";
import { loader as personnelDetailLoader } from "../modules/management/personnel/PersonnelDetail"

import CreateUpdatePersonnelPage from "../pages/management/personnel/CreateUpdatePersonnelPage";
import {
  createLoader as createPersonnelLoader,
  createAction as createPersonnelAction,
  updateLoader as updatePersonnelLoader,
  updateAction as updatePersonnelAction,
} from "../modules/management/personnel/CreateUpdatePersonnel"

import { action as deletePersonnelAction } from "../modules/management/personnel/deletePersonnel"

// Project
import ProjectListPage from "../pages/management/project/ProjectListPage";
import { loader as projectLoader } from "../modules/management/project/ProjectList";

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
  PATH_PERSONNEL_DETAIL,
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
            element: <CenterListPage />,
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
            element: <PersonnelListPage />,
            loader: personnelLoader,
          },
          {
            path: PATH_PERSONNEL_CREATE,
            element: <CreateUpdatePersonnelPage />,
            loader: createPersonnelLoader,
            action: createPersonnelAction,
          },
          {
            path: PATH_PERSONNEL_DETAIL,
            element: <PersonnelDetailPage />,
            loader: personnelDetailLoader,
          },
          {
            path: PATH_PERSONNEL_UPDATE,
            element: <CreateUpdatePersonnelPage />,
            loader: updatePersonnelLoader,
            action: updatePersonnelAction,
          },
          {
            path: PATH_PERSONNEL_DELETE,
            element: <></>,
            action: deletePersonnelAction,
          },
          {
            path: PATH_PROJECT,
            element: <ProjectListPage />,
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

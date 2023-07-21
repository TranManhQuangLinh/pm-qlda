import { useEffect, useState } from 'react';

import { Link, Outlet, useLocation } from 'react-router-dom';


export default function Layout() {
  const [objName, setObjName] = useState("projectType");
  const location = useLocation();
  // console.log(objName);

  useEffect(() => {
    const paramsObjName = location.pathname.split("/")[2];
    if (paramsObjName && paramsObjName !== objName && location.pathname.split("/")[1] !== "update") {
      setObjName(paramsObjName);
    }
  }, [location.pathname, objName]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2 ps-0">
          <div className="accordion" id="accordionPanelsStayOpenExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseOne"
                  aria-expanded="true"
                  aria-controls="panelsStayOpen-collapseOne"
                >
                  Danh mục
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseOne"
                className="accordion-collapse collapse show"
              >
                <div className="accordion-body">
                  <div
                    className={`sidebar-item ${
                      objName === "projectType" ? "selected" : ""
                    }`}
                  >
                    <Link
                      to={"category/projectType"}
                      onClick={() => setObjName("projectType")}
                    >
                      Loại dự án
                    </Link>
                  </div>
                  <div
                    className={`sidebar-item ${
                      objName === "projectStatus" ? "selected" : ""
                    }`}
                  >
                    <Link
                      to={"category/projectStatus"}
                      onClick={() => setObjName("projectStatus")}
                    >
                      Trạng thái dự án
                    </Link>
                  </div>
                  <div
                    className={`sidebar-item ${
                      objName === "techStack" ? "selected" : ""
                    }`}
                  >
                    <Link
                      to={"category/techStack"}
                      onClick={() => setObjName("techStack")}
                    >
                      Tech stack
                    </Link>
                  </div>
                  <div
                    className={`sidebar-item ${
                      objName === "customerGroup" ? "selected" : ""
                    }`}
                  >
                    <Link
                      to={"category/customerGroup"}
                      onClick={() => setObjName("customerGroup")}
                    >
                      Nhóm khách hàng
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseTwo"
                  aria-expanded="true"
                  aria-controls="panelsStayOpen-collapseTwo"
                >
                  Quản lý
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseTwo"
                className="accordion-collapse collapse show"
              >
                <div className="accordion-body">
                  <div
                    className={`sidebar-item ${
                      objName === "center" ? "selected" : ""
                    }`}
                  >
                    <Link
                      to={"management/center"}
                      onClick={() => setObjName("center")}
                    >
                      Trung tâm, bộ phận, phòng ban
                    </Link>
                  </div>
                  <div
                    className={`sidebar-item ${
                      objName === "personnel" ? "selected" : ""
                    }`}
                  >
                    <Link
                      to={"management/personnel"}
                      onClick={() => setObjName("personnel")}
                    >
                      Nhân sự
                    </Link>
                  </div>
                  <div
                    className={`sidebar-item ${
                      objName === "project" ? "selected" : ""
                    }`}
                  >
                    <Link
                      to={"management/project"}
                      onClick={() => setObjName("project")}
                    >
                      Dự án
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseThree"
                  aria-expanded="true"
                  aria-controls="panelsStayOpen-collapseThree"
                >
                  Báo cáo
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseThree"
                className="accordion-collapse collapse show"
              >
                <div className="accordion-body">
                  <div
                    className={`sidebar-item ${
                      objName === "numberOfProjects" ? "selected" : ""
                    }`}
                  >
                    <Link
                      to={"report/numberOfProjects"}
                      onClick={() => setObjName("numberOfProjects")}
                    >
                      Số lượng dự án
                    </Link>
                  </div>
                  <div
                    className={`sidebar-item ${
                      objName === "numberOfPersonnel" ? "selected" : ""
                    }`}
                  >
                    <Link
                      to={"report/numberOfPersonnel"}
                      onClick={() => setObjName("numberOfPersonnel")}
                    >
                      Số lượng nhân sự
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

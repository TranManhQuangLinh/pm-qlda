import { useEffect, useState } from "react";

import { Link, Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const [objName, setObjName] = useState("projectType");
  const location = useLocation();
  // console.log(objName);

  useEffect(() => {
    const paramsObjName = location.pathname.split("/")[2];
    if (
      paramsObjName &&
      paramsObjName !== objName &&
      location.pathname.split("/")[1] !== "update" &&
      location.pathname.split("/")[1] !== "detail"
    ) {
      setObjName(paramsObjName);
    }
  }, []);

  const categoryItems = [
    { name: "projectType", label: "Loại dự án" },
    { name: "projectStatus", label: "Trạng thái dự án" },
    { name: "techStack", label: "Tech stack" },
    { name: "customerGroup", label: "Nhóm khách hàng" },
    // Add more category items as needed
  ];

  const managementItems = [
    { name: "center", label: "Trung tâm, bộ phận, phòng ban" },
    { name: "personnel", label: "Nhân sự" },
    { name: "project", label: "Dự án" },
    // Add more management items as needed
  ];

  const reportItems = [
    { name: "numberOfProjects", label: "Số lượng dự án" },
    { name: "numberOfPersonnel", label: "Số lượng nhân sự" },
    // Add more report items as needed
  ];

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
                  {categoryItems.map((item) => (
                    <div
                      key={item.name}
                      className={`sidebar-item ${
                        objName === item.name ? "selected" : ""
                      }`}
                    >
                      <Link
                        to={`category/${item.name}`}
                        onClick={() => setObjName(item.name)}
                      >
                        {item.label}
                      </Link>
                    </div>
                  ))}
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
                  {managementItems.map((item) => (
                    <div
                      key={item.name}
                      className={`sidebar-item ${
                        objName === item.name ? "selected" : ""
                      }`}
                    >
                      <Link
                        to={`management/${item.name}`}
                        onClick={() => setObjName(item.name)}
                      >
                        {item.label}
                      </Link>
                    </div>
                  ))}
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
                  {reportItems.map((item) => (
                    <div
                      key={item.name}
                      className={`sidebar-item ${
                        objName === item.name ? "selected" : ""
                      }`}
                    >
                      <Link
                        to={`report/${item.name}`}
                        onClick={() => setObjName(item.name)}
                      >
                        {item.label}
                      </Link>
                    </div>
                  ))}
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

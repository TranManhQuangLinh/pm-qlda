// when isCheckbox = false, obj isn't required

import { useState } from "react";
import { renderCardsInSingleRow } from "./utils";

export default function CategoryWeightCardList({
  projectType,
  isCheckbox,
  obj,
}) {
  const [showContent, setShowContent] = useState(false);

  const toggleContent = () => {
    setShowContent(!showContent);
  };

  let res;
  // console.log(projectType);

  if (!projectType) {
    res = <></>;
  } else if (isCheckbox) {
    // for create and update
    // projectType parameter is an object consists of objects
    // projectType parameter contains all tech stack exist
    const projectTypeOptions = Object.entries(projectType).map(
      ([key, item]) => {
        return (
          <div key={key} className="form-check mb-3">
            <label
              className={`form-check-label justify-content-center`}
              htmlFor={key}
            >
              <div className="card border-info">
                <div className="card-header">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={key}
                    name="projectType"
                    value={key}
                    defaultChecked={
                      obj.projectType ? obj.projectType.includes(key) : false
                    }
                  />
                  <div className={item.name ? "" : "undefined-infomation"}>
                    {item.name ? item.name : "No name"}
                  </div>
                  Trọng số: <span className="weight-value">{item.weight}</span>
                </div>
                <div className="card-body">
                  <h5 className={"card-title " + item.status}>
                    {item.status.toUpperCase()}
                  </h5>
                </div>
              </div>
            </label>
          </div>
        );
      }
    );
    res = (
      <div>
        <button
          type="button"
          className={`btn btn-primary mb-3 ${
            Object.entries(projectType).length !== 0 ? "" : "disabled"
          }`}
          onClick={toggleContent}
        >
          {Object.entries(projectType).length !== 0 ? (showContent ? "Đóng" : "Chọn") : "Không có"}
        </button>
        {showContent &&
          renderCardsInSingleRow(
            projectTypeOptions.map((card, index) => ({ key: index, card }))
          )}
      </div>
    );
  } else {
    // for detail
    // projectType parameter is an array consists of objects
    // projectType parameter contains all tech stack of this object
    const projectTypeOptions = projectType.map((item) => {
      return (
        <div className="card border-info mb-3">
          <div
            className={
              "card-header " + (item.name ? "" : "undefined-infomation")
            }
          >
            <div className={item.name ? "" : "undefined-infomation"}>
              {item.name ? item.name : "No name"}
            </div>
            Trọng số: <span className="weight-value">{item.weight}</span>
          </div>
          <div className="card-body">
            <h5 className={"card-title " + item.status}>
              {item.status.toUpperCase()}
            </h5>
          </div>
        </div>
      );
    });

    res = (
      <div className="d-flex flex-column">
        {renderCardsInSingleRow(
          projectTypeOptions.map((card, index) => ({ key: index, card }))
        )}
      </div>
    );
  }

  return res;
}

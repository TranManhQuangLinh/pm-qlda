// when isCheckbox = false, obj isn't required

import { useState } from "react";
import { renderCardsInSingleRow } from "./utils";

export default function ProjectCardList({ project, isCheckbox, obj }) {
  const [showContent, setShowContent] = useState(false);

  const toggleContent = () => {
    setShowContent(!showContent);
  };

  let res;
  // console.log(project);
  // console.log(obj);

  if (!project) {
    res = <></>;
  } else if (isCheckbox) {
    // for create and update
    // project parameter is an object consists of objects
    // project parameter contains all project exist
    const centerOptions = Object.entries(project).map(([key, item]) => {
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
                  name="project"
                  value={key}
                  defaultChecked={
                    obj.project ? obj.project.includes(key) : false
                  }
                />
                <div className={item.name ? "" : "undefined-infomation"}>
                  {item.name ? item.name : "No name"}
                </div>
              </div>
            </div>
          </label>
        </div>
      );
    });
    return (
      <div>
        <button
          type="button"
          className={`btn btn-primary mb-3 ${
            Object.entries(project).length !== 0 ? "" : "disabled"
          }`}
          onClick={toggleContent}
        >
          {Object.entries(project).length !== 0 ? (showContent ? "Đóng" : "Chọn") : "Không có"}
        </button>
        {showContent &&
          renderCardsInSingleRow(
            centerOptions.map((card, index) => ({ key: index, card }))
          )}
      </div>
    );
  } else {
    // for detail
    // project parameter is an array consists of objects
    // project parameter contains all project of this object
    const centerOptions = project.map((item) => {
      return (
        <div className="card border-info mb-3">
          <div
            className={
              "card-header " + (item.name ? "" : "undefined-infomation")
            }
          >
            {item.name ? item.name : "No name"}
          </div>
        </div>
      );
    });

    res = (
      <div className="d-flex flex-column">
        {renderCardsInSingleRow(
          centerOptions.map((card, index) => ({ key: index, card }))
        )}
      </div>
    );
  }

  return res;
}

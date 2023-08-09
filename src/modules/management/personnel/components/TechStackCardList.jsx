// when isCheckbox = false, obj isn't required

import { useState } from "react";
import { renderCardsInSingleRow } from "../../../../components/card-list/utils";

export default function TechStackCardList({ techStack, isCheckbox, obj }) {
  const [showContent, setShowContent] = useState(false);

  const toggleContent = () => {
    setShowContent(!showContent);
  };

  let res;
  // console.log(techStack);
  // console.log(obj);

  if (!techStack) {
    res = <></>;
  } else if (isCheckbox) {
    // for create and update
    // techStack parameter is an object consists of objects
    // techStack parameter contains all tech stack exist
    const techStackOptions = Object.entries(techStack).map(([key, item]) => {
      const techStackItem = obj.techStack
        ? obj.techStack.find((item) => item.id === key)
        : undefined;

      return (
        <div key={key} className="form-check mb-3">
          <label
            className={`form-check-label justify-content-center`}
            htmlFor={key}
          >
            <div className="card personnel-card border-info">
              <div className="card-header">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={key}
                  name="techStack"
                  value={key}
                  defaultChecked={
                    obj.techStack
                      ? !!obj.techStack.find((item) => item.id === key)
                      : false
                  }
                />
                <div className={item.name ? "" : "undefined-infomation"}>
                  {item.name ? item.name : "No name"}
                </div>
              </div>
              <div className="card-body">
                <h5 className={"card-title " + item.status}>
                  {item.status.toUpperCase()}
                </h5>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <div className="form-group mb-0">
                    <input
                      name={"workingTime_" + key}
                      type="text"
                      className="form-control"
                      placeholder="Thời gian làm việc"
                      defaultValue={
                        techStackItem ? techStackItem.workingTime : ""
                      }
                    />
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="form-group mb-0">
                    <textarea
                      name={"experience_" + key}
                      className="form-control"
                      rows="3"
                      placeholder="Framework đã sử dụng"
                      defaultValue={
                        techStackItem ? techStackItem.experience : ""
                      }
                    ></textarea>
                  </div>
                </li>
              </ul>
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
            Object.entries(techStack).length !== 0 ? "" : "disabled"
          }`}
          onClick={toggleContent}
        >
          {Object.entries(techStack).length !== 0 ? (showContent ? "Đóng" : "Chọn") : "Không có"}
        </button>
          {showContent &&
            renderCardsInSingleRow(
              techStackOptions.map((card, index) => ({ key: index, card }))
            )}
      </div>
    );
  } else {
    // for detail
    // techStack parameter is an array consists of objects
    // techStack parameter contains all tech stack of this object
    const techStackOptions = techStack.map((item) => {
      // console.log(item);
      return (
        <div className="card border-info mb-3">
          <div
            className={
              "card-header " + (item.name ? "" : "undefined-infomation")
            }
          >
            {item.name ? item.name : "No name"}
          </div>
          <div className="card-body">
            <h5 className={"card-title " + item.status}>
              {item.status.toUpperCase()}
            </h5>
            <div
              className={
                "card-text " + (item.description ? "" : "undefined-infomation")
              }
            >
              {item.description ? item.description : "No description"}
            </div>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <div className="form-group mb-0">
                <label className="fs-6 fw-light">Working Time:</label>
                <div>{item.workingTime}</div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="form-group mb-0">
                <label className="fs-6 fw-light">Experience:</label>
                <div>{item.experience}</div>
              </div>
            </li>
          </ul>
        </div>
      );
    });

    res = (
      <div className="d-flex flex-column">
        {renderCardsInSingleRow(
          techStackOptions.map((card, index) => ({ key: index, card }))
        )}
      </div>
    );
  }

  return res;
}

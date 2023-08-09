// when isCheckbox = false, obj isn't required

import { useState } from "react";

export default function CenterCardList({ center, isCheckbox, obj }) {
  const [showContent, setShowContent] = useState(false);

  const toggleContent = () => {
    setShowContent(!showContent);
  };

  let res;
  // console.log(center);
  // console.log(obj);

  const renderCardsInSingleRow = (options) => {
    return (
      <div className="row card-list">
        {options.map((item) => (
          <div key={item.key} className="col d-flex justify-content-center">
            {item.card}
          </div>
        ))}
      </div>
    );
  };

  if (!center) {
    res = <></>;
  } else if (isCheckbox) {
    // for create and update
    // center parameter is an object consists of objects
    // center parameter contains all center exist
    const centerOptions = Object.entries(center).map(([key, item]) => {
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
                  name="center"
                  value={key}
                  defaultChecked={obj.center ? obj.center.includes(key) : false}
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
    res = (
      <div>
        <button
          type="button"
          className={`btn btn-primary mb-3 ${
            Object.entries(center).length !== 0 ? "" : "disabled"
          }`}
          onClick={toggleContent}
        >
          {Object.entries(center).length !== 0 ? (showContent ? "Đóng" : "Chọn") : "Không có"}
        </button>
        {showContent &&
          renderCardsInSingleRow(
            centerOptions.map((card, index) => ({ key: index, card }))
          )}
      </div>
    );
  } else {
    // for detail
    // center parameter is an array consists of objects
    // center parameter contains all center of this object
    const centerOptions = center.map((item) => {
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
            <div
              className={
                "card-text " + (item.description ? "" : "undefined-infomation")
              }
            >
              {item.description ? item.description : "No description"}
            </div>
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

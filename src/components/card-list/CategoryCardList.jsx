import React, { useState } from "react";
import { renderCardsInSingleRow } from "./utils";

export default function CategoryCardList({
  categoryObj,
  name,
  isCheckbox,
  obj,
}) {
  const [showContent, setShowContent] = useState(false);

  const toggleContent = () => {
    setShowContent(!showContent);
  };

  let res;

  if (!categoryObj) {
    res = <></>;
  } else if (isCheckbox) {
    // for create and update
    // categoryObj parameter is an object consists of objects
    // categoryObj parameter contains all tech stack exist
    const categoryObjOptions = Object.entries(categoryObj).map(
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
                    name={name}
                    value={key}
                    defaultChecked={obj[name] ? obj[name].includes(key) : false}
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
            Object.entries(categoryObj).length !== 0 ? "" : "disabled"
          }`}
          onClick={toggleContent}
        >
          {Object.entries(categoryObj).length !== 0 ? (showContent ? "Đóng" : "Chọn") : "Không có"}
        </button>
        {showContent &&
          renderCardsInSingleRow(
            categoryObjOptions.map((card, index) => ({ key: index, card }))
          )}
      </div>
    );
  } else {
    // for detail
    // categoryObj parameter is an array consists of objects
    // categoryObj parameter contains all tech stack of this object
    const categoryObjOptions = categoryObj.map((item) => {
      return (
        <div className="card border-info mb-3" key={item.key}>
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
          </div>
        </div>
      );
    });

    res = (
      <div className="d-flex flex-column">
        {renderCardsInSingleRow(
          categoryObjOptions.map((card, index) => ({ key: index, card }))
        )}
      </div>
    );
  }

  return res;
}

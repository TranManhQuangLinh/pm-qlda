// when isCheckbox = false, obj isn't required

import { useState } from "react";
import { renderCardsInSingleRow } from "./utils";

export default function PersonnelCardList({ personnel, isCheckbox, obj }) {
  const [showContent, setShowContent] = useState(false);

  const toggleContent = () => {
    setShowContent(!showContent);
  };

  let res;
  // console.log(personnel);
  // console.log(obj);

  if (!personnel) {
    res = <></>;
  } else if (isCheckbox) {
    // for create and update
    // personnel parameter is an object consists of objects
    // personnel parameter contains all personnel exist
    const personnelOptions = Object.entries(personnel).map(([key, item]) => {
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
                  name="personnel"
                  value={key}
                  defaultChecked={
                    obj.personnel ? obj.personnel.includes(key) : false
                  }
                />
                <div className={item.name ? "" : "undefined-infomation"}>
                  {item.name ? item.name : "No name"}
                </div>
              </div>
              <div className="card-body">
                <div className="card-text">
                  <label className="fs-6 fw-light">Ngày sinh:</label>
                  <div
                    className={item.dateOfBirth ? "" : "undefined-infomation"}
                  >
                    {item.dateOfBirth ? item.dateOfBirth : "No date of birth"}
                  </div>
                </div>
                <div className="card-text">
                  <label className="fs-6 fw-light">Số điện thoại:</label>
                  <div className={item.phone ? "" : "undefined-infomation"}>
                    {item.phone ? item.phone : "No phone number"}
                  </div>
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
            Object.entries(personnel).length !== 0 ? "" : "disabled"
          }`}
          onClick={toggleContent}
        >
          {Object.entries(personnel).length !== 0 ? (showContent ? "Đóng" : "Chọn") : "Không có"}
        </button>
        {showContent && renderCardsInSingleRow(
          personnelOptions.map((card, index) => ({ key: index, card }))
        )}
      </div>
    );
  } else {
    // for detail
    // personnel parameter is an array consists of objects
    // personnel parameter contains all personnel of this object
    const personnelOptions = personnel.map((item) => {
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
            <div className="card-text">
              <label className="fs-6 fw-light">Ngày sinh:</label>
              <div className={item.dateOfBirth ? "" : "undefined-infomation"}>
                {item.dateOfBirth ? item.dateOfBirth : "No date of birth"}
              </div>
            </div>
            <div className="card-text">
              <label className="fs-6 fw-light">Số điện thoại:</label>
              <div className={item.phone ? "" : "undefined-infomation"}>
                {item.phone ? item.phone : "No phone number"}
              </div>
            </div>
          </div>
        </div>
      );
    });

    res = (
      <div className="d-flex flex-column">
        {renderCardsInSingleRow(
          personnelOptions.map((card, index) => ({ key: index, card }))
        )}
      </div>
    );
  }

  return res;
}

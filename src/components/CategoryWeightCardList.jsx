// when isCheckbox = false, obj isn't required

export default function CategoryWeightCardList({
  projectType,
  isCheckbox,
  obj,
}) {
  let res;
  // console.log(projectType);
  const renderCardsInSingleRow = (options) => {
    return (
      <div className="row card-list">
        {options.map((item) => (
          <div key={item.key} className={"col"}>
            {item.card}
          </div>
        ))}
      </div>
    );
  };

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
                  <div className="weight-info">
                    Trọng số:{" "}
                    <span className="weight-value">{item.weight}</span>
                  </div>
                </div>
                <div className="card-body">
                  <h5 className={"card-title " + item.status}>
                    {item.status.toUpperCase()}
                  </h5>
                  <div
                    className={
                      "card-text " +
                      (item.description ? "" : "undefined-infomation")
                    }
                  >
                    {item.description ? item.description : "No description"}
                  </div>
                </div>
              </div>
            </label>
          </div>
        );
      }
    );
    return (
      <div className="dropdown-center">
        <button
          type="button"
          className={`btn btn-primary dropdown-toggle ${
            Object.entries(projectType).length === 0 ? "disabled" : ""
          }`}
          data-bs-toggle="dropdown"
          aria-expanded="false"
          data-bs-auto-close="outside"
        >
          {Object.entries(projectType).length === 0
            ? "Không có Loại dự án"
            : "Loại dự án"}
        </button>
        <div className="dropdown-menu dropdown-card-list ps-3 pe-3 ">
          {renderCardsInSingleRow(
            projectTypeOptions.map((card, index) => ({ key: index, card }))
          )}
        </div>
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
            <div className="weight-info">
              Trọng số: <span className="weight-value">{item.weight}</span>
            </div>
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

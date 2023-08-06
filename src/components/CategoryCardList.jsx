// when isCheckbox = false, obj isn't required

export default function CategoryCardList({
  categoryObj,
  name,
  isCheckbox,
  obj,
}) {
  let res;

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
            Object.entries(categoryObj).length === 0 ? "disabled" : ""
          }`}
          data-bs-toggle="dropdown"
          aria-expanded="false"
          data-bs-auto-close="outside"
        >
          {name == "projectStatus"
            ? Object.entries(categoryObj).length === 0
              ? "Không có Trạng thái dự án"
              : "Trạng thái dự án"
            : Object.entries(categoryObj).length === 0
            ? "Không có Tech stack"
            : "Tech stack"}
        </button>
        <div className="dropdown-menu dropdown-card-list ps-3 pe-3 ">
          {renderCardsInSingleRow(
            categoryObjOptions.map((card, index) => ({ key: index, card }))
          )}
        </div>
      </div>
    );
  } else {
    // for detail
    // categoryObj parameter is an array consists of objects
    // categoryObj parameter contains all tech stack of this object
    const categoryObjOptions = categoryObj.map((item) => {
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

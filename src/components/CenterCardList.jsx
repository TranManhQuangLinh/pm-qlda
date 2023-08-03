// when isCheckbox = false, obj isn't required

export default function CenterCardList({ center, isCheckbox, obj }) {
  let res;
  // console.log(center);
  // console.log(obj);

  const renderCardsInRows = (options) => {
    const rows = [];
    const cardsPerRow = 3; // Number of cards per row on medium-sized screens (md)

    for (let i = 0; i < options.length; i += cardsPerRow) {
      const rowItems = options.slice(i, i + cardsPerRow);

      let colClassName;
      switch (options.length) {
        case 1:
          colClassName = "col";
          break;
        case 2:
          colClassName = "col-md-6";
          break;
        default:
          colClassName = "col-lg-4 col-md-6";
          break;
      }

      const row = (
        <div key={i} className="row">
          {rowItems.map((item) => (
            <div key={item.key} className={colClassName}>
              {item.card}
            </div>
          ))}
        </div>
      );
      rows.push(row);
    }
    return rows;
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
              <div className="card-body">
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
    });
    return (
      <div className="dropdown-center">
        <button
          type="button"
          className={`btn btn-primary dropdown-toggle ${
            Object.entries(center).length === 0 ? "disabled" : ""
          }`}
          data-bs-toggle="dropdown"
          aria-expanded="false"
          data-bs-auto-close="outside"
        >
          {Object.entries(center).length === 0
            ? "Không có Trung tâm"
            : "Trung tâm"}
        </button>
        <div className="dropdown-menu dropdown-card-list ps-3 pe-3 ">
          {renderCardsInRows(
            centerOptions.map((card, index) => ({ key: index, card }))
          )}
        </div>
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
        {renderCardsInRows(
          centerOptions.map((card, index) => ({ key: index, card }))
        )}
      </div>
    );
  }

  return res;
}

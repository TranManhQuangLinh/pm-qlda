// when isCheckbox = false, obj isn't required

export default function PersonnelCardList({ personnel, isCheckbox, obj }) {
  let res;
  // console.log(personnel);
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
      <div className="dropdown-center">
        <button
          type="button"
          className={`btn btn-primary dropdown-toggle ${
            Object.entries(personnel).length === 0 ? "disabled" : ""
          }`}
          data-bs-toggle="dropdown"
          aria-expanded="false"
          data-bs-auto-close="outside"
        >
          {Object.entries(personnel).length === 0
            ? "Không có Nhân sự"
            : "Nhân sự"}
        </button>
        <div className="dropdown-menu dropdown-card-list ps-3 pe-3 ">
          {renderCardsInRows(
            personnelOptions.map((card, index) => ({ key: index, card }))
          )}
        </div>
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
        {renderCardsInRows(
          personnelOptions.map((card, index) => ({ key: index, card }))
        )}
      </div>
    );
  }

  return res;
}

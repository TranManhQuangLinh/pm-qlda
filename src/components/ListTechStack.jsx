// isCheckbox = true means ListTechStack used for create or update. So obj needs to be passed in
// in this case, techStack is a object consists of objects
export default function ListTechStack({ techStack, isCheckbox, obj }) {
  let res;
  console.log(techStack);

  const renderCardsInRows = (options) => {
    const rows = [];
    const cardsPerRow = 3; // Number of cards per row on medium-sized screens (md)

    for (let i = 0; i < options.length; i += cardsPerRow) {
      const rowItems = options.slice(i, i + cardsPerRow);
      const row = (
        <div key={i} className="row">
          {rowItems.map((item) => (
            <div key={item.key} className={options.length >= 3 ? "col-md-4": "col-md-6"}>
              {item.card}
            </div>
          ))}
        </div>
      );
      rows.push(row);
    }
    return rows;
  };

  if (!techStack) {
    res = <></>;
  } else if (isCheckbox) {
    const techStackOptions = Object.entries(techStack).map(([key, item]) => {
      return (
        <div key={key} className="form-check ms-3 me-3 mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id={key}
            name="techStack"
            value={key}
            defaultChecked={obj.techStack ? obj.techStack.includes(key) : false}
          />
          <label className={`form-check-label ms-3`} htmlFor={key}>
            <div className="card border-info">
              <div className="card-header">
                {item.name ? item.name : "No name"}
              </div>
              <div className="card-body">
                <h5 className={"card-title " + item.status}>
                  {item.status.toUpperCase()}
                </h5>
                <div className="card-text">
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
            Object.entries(techStack).length === 0 ? "disabled" : ""
          }`}
          data-bs-toggle="dropdown"
          aria-expanded="false"
          data-bs-auto-close="outside"
        >
          {Object.entries(techStack).length === 0
            ? "Không có Tech Stack"
            : "Tech Stack"}
        </button>
        <div className="dropdown-menu dropdown-card-list">
          {renderCardsInRows(
            techStackOptions.map((card, index) => ({ key: index, card }))
          )}
        </div>
      </div>
    );
  } else {
    const techStackOptions = techStack.map((item) => {
      return (
        <div className="card border-info mb-3">
          <div className="card-header">{item.name ? item.name : "No name"}</div>
          <div className="card-body">
            <h5 className={"card-title " + item.status}>
              {item.status.toUpperCase()}
            </h5>
            <div className="card-text">
              {item.description ? item.description : "No description"}
            </div>
          </div>
        </div>
      );
    });

    res = (
      <div className="d-flex flex-column">
        {renderCardsInRows(
          techStackOptions.map((card, index) => ({ key: index, card }))
        )}
      </div>
    );
  }

  return res;
}

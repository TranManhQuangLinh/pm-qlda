
export default function ListTechStack({ techStack }) {

    return (
      <td className="dropdown">
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
        <div className="dropdown-menu">
          {Object.entries(techStack).map(([key, item]) => {
            console.log(key);
            return (
            <div key={key} className="d-flex mb-3 ms-3 me-3">
              <div className="me-3">
                <div>Tên:</div>
                <div>{item.name}</div>
              </div>
              <div className="me-3">
                <div>Mô tả:</div>
                <div>{item.description}</div>
              </div>
              <div className="me-3">
                <div>Trạng thái:</div>
                <div className={item.status}>
                  {item.status.toUpperCase()}
                </div>
              </div>
            </div>
          )})}
        </div>
      </td>
    );
  }
  
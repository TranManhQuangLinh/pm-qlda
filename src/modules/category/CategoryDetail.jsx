import { Form, useLoaderData, useNavigate } from "react-router-dom";

export default function CategoryDetail() {
  const navigate = useNavigate();
  const { obj, objName } = useLoaderData();
  // console.log(obj);

  let title;
  switch (objName) {
    case "projectType":
      title = "Loại dự án";
      break;
    case "projectStatus":
      title = "Trạng thái dự án";
      break;
    case "techStack":
      title = "Tech Stack";
      break;
    case "customerGroup":
      title = "Nhóm khách hàng";
      break;
    default:
      title = "Loại dự án";
      break;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="title">{title}</div>
      </div>
      <Form method="post" id="contact-form">
        <label>
          <span>Tên</span>
          <div>{obj.name}</div>
        </label>
        {!objName ||
        objName === "projectType" ||
        objName === "customerGroup" ? (
          <label>
            <span>Trọng số ưu tiên</span>
            <div>{obj.weight}</div>
          </label>
        ) : (
          ""
        )}
        <label>
          <span>Trạng thái</span>
          <div className={obj.status}>{obj.status.toUpperCase()}</div>
        </label>
        <label>
          <span>Mô tả</span>
          <div>{obj.description}</div>
        </label>
        <p>
          <button
            type="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </button>
        </p>
      </Form>
    </div>
  );
}

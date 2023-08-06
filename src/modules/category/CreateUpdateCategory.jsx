import { Form, redirect, useNavigate, useLoaderData } from "react-router-dom";
import {
  createCategory,
  updateCategory,
  getCategory,
} from "../../apis/database";

function validate() {
  const weightField = document.querySelector('input[name="weight"]');
  if (!weightField) {
    return true;
  }
  const weightValue = +weightField.value;
  // console.log(weightValue);

  if (!Number.isInteger(weightValue) || weightValue <= 0) {
    alert("Vui lòng nhập một trọng số hợp lệ.");
    weightField.focus();
    return false;
  }
  return true;
}

export async function createLoader({ params }) {
  const obj = {};
  const objName = params.objName;
  return { obj, objName };
}

export async function createAction({ request, params }) {
  const formData = await request.formData();
  const newObj = Object.fromEntries(formData); // push formdata into an object
  if (validate()) {
    await createCategory(newObj, params.objName);
    return redirect(`/category/${params.objName}`);
  } else {
    return null;
  }
}

export async function updateLoader({ params }) {
  const obj = await getCategory(
    params.id,
    params.objName ? params.objName : "projectType"
  );
  const objName = params.objName;
  if (!obj) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { obj, objName };
}

export async function updateAction({ request, params }) {
  const formData = await request.formData();
  const newObj = Object.fromEntries(formData); // push formdata into an object
  if (validate()) {
    await updateCategory(
      params.id,
      newObj,
      params.objName ? params.objName : "projectType"
    );
    return redirect(
      `/category/${params.objName ? params.objName : "projectType"}`
    );
  } else {
    return null;
  }
}

export default function CreateUpdateCategory() {
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
          <span>Tên*</span>
          <input
            type="text"
            name="name"
            placeholder="Tên"
            defaultValue={obj.name}
            required
          />
        </label>
        {!objName ||
        objName === "projectType" ||
        objName === "customerGroup" ? (
          <label>
            <span>Trọng số ưu tiên*</span>
            <input
              type="text"
              name="weight"
              placeholder="1, 2, 3..."
              defaultValue={obj.weight}
              required
            />
          </label>
        ) : (
          ""
        )}
        <label>
          <span>Trạng thái*</span>
          <select
            className="form-select"
            name="status"
            defaultValue={obj.status}
          >
            <option value={"active"}>ACTIVE</option>
            <option value={"inactive"}>INACTIVE</option>
          </select>
        </label>
        <label>
          <span>Mô tả</span>
          <textarea
            name="description"
            defaultValue={obj.description}
            rows={6}
          />
        </label>
        <p>
          <button type="submit">Save</button>
          <button
            type="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancel
          </button>
        </p>
      </Form>
    </div>
  );
}

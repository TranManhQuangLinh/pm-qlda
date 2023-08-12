import { Form, redirect, useNavigate, useLoaderData } from "react-router-dom";
import {
  createCategory,
  updateCategory,
  getCategory,
} from "../../apis/database";

const validate = () => {
  const forms = document.querySelectorAll(".needs-validation");
  let isValid = true;

  Array.from(forms).forEach((form) => {
    const weightField = form.querySelector('input[name="weight"]');
    if (weightField) {
      const weightValue = +weightField.value;

      if (!Number.isInteger(weightValue) || weightValue <= 0) {
        console.log(2);
        weightField.focus();
        form.classList.add("was-validated");
        weightField.setCustomValidity("Invalid weight value");
        weightField.classList.remove("is-valid");
        weightField.classList.add("is-invalid");
        isValid = false;
      } else {
        console.log(3);
        weightField.setCustomValidity("");
        weightField.classList.remove("is-invalid");
        weightField.classList.add("is-valid");
      }
    }

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      isValid = false;
      console.log(1);
    }
  });

  return isValid;
};

export async function createLoader({ params }) {
  const obj = {};
  const objName = params.objName;
  return { obj, objName };
}

export async function createAction({ request, params }) {
  const formData = await request.formData();
  const newObj = Object.fromEntries(formData); // push formdata into an object
  if (validate()) {
    console.log(true);
    await createCategory(newObj, params.objName);
    return redirect(`/category/${params.objName}`);
  } else {
    console.log(false);
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

  const handleWeightInputChange = (e) => {
    if (
      e.target.parentElement.parentElement.parentElement.classList.contains(
        "was-validated"
      )
    ) {
      const weightField = e.target;
      const weightValue = +weightField.value;
      if (!Number.isInteger(weightValue) || weightValue <= 0) {
        weightField.setCustomValidity("Invalid weight value");
        weightField.classList.remove("is-valid");
        weightField.classList.add("is-invalid");
      } else {
        weightField.setCustomValidity("");
        weightField.classList.remove("is-invalid");
        weightField.classList.add("is-valid");
      }
    }
  };

  return (
    <div className="container" data-testid="form-container">
      <div className="row">
        <div className="title">{title}</div>
      </div>
      <Form
        method="post"
        id="contact-form"
        className="needs-validation"
        noValidate
      >
        <label>
          <span>Tên*</span>
          <div className="d-flex flex-column">
            <input
              type="text"
              name="name"
              placeholder="Tên"
              defaultValue={obj.name}
              required
              className="form-control"
            />
            <div className="invalid-feedback">Vui lòng nhập tên.</div>
          </div>
        </label>
        {!objName ||
        objName === "projectType" ||
        objName === "customerGroup" ? (
          <label>
            <span>Trọng số ưu tiên*</span>
            <div className="d-flex flex-column">
              <input
                type="text"
                name="weight"
                placeholder="1, 2, 3..."
                defaultValue={obj.weight}
                required
                className="form-control"
                onChange={handleWeightInputChange}
              />
              <div className="invalid-feedback">
                Vui lòng nhập một trọng số hợp lệ.
              </div>
            </div>
          </label>
        ) : (
          ""
        )}
        <label>
          <span>Trạng thái*</span>
          <div className="d-flex flex-column">
            <select
              className="form-select"
              name="status"
              defaultValue={obj.status}
              required
            >
              <option value="active">ACTIVE</option>
              <option value="inactive">INACTIVE</option>
            </select>
            <div className="invalid-feedback">Vui lòng chọn trạng thái.</div>
          </div>
        </label>
        <label>
          <span>Mô tả</span>
          <textarea
            name="description"
            defaultValue={obj.description}
            rows={6}
            className="form-control"
          ></textarea>
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

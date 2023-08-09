import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import {
  createManagement,
  getListCategory,
  getListManagement,
  getManagement,
  updateManagement,
} from "../../../apis/database";
import CategoryCardList from "../../../components/card-list/CategoryCardList";
import CategoryWeightCardList from "../../../components/card-list/CategoryWeightCardList";
import PersonnelCardList from "../../../components/card-list/PersonnelCardList";
import CenterCardList from "../../../components/card-list/CenterCardList";

const validate = () => {
  const forms = document.querySelectorAll(".needs-validation");
  let isValid = true;
  Array.from(forms).forEach((form) => {
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      isValid = false;
      console.log(1);
    }
  });

  return isValid;
};

export async function createLoader() {
  const obj = {};
  const projectType = await getListCategory("projectType");
  const projectStatus = await getListCategory("projectStatus");
  const techStack = await getListCategory("techStack");
  const personnel = await getListManagement("personnel");
  const center = await getListManagement("center");
  return { obj, projectType, projectStatus, techStack, personnel, center };
}

export async function createAction({ request }) {
  const formData = await request.formData();
  const newObj = Object.fromEntries(formData); // push formdata into an object
  newObj.projectType = formData.getAll("projectType");
  newObj.projectStatus = formData.getAll("projectStatus");
  newObj.techStack = formData.getAll("techStack");
  newObj.personnel = formData.getAll("personnel");
  newObj.center = formData.getAll("center");
  //   console.log(newObj);
  if (validate()) {
    await createManagement(newObj, "project");
    return redirect(`/management/project`);
  } else {
    return null;
  }
  // return null
}

export async function updateLoader({ params }) {
  const obj = await getManagement(params.id, "project");
  if (!obj) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  const projectType = await getListCategory("projectType");
  const projectStatus = await getListCategory("projectStatus");
  const techStack = await getListCategory("techStack");
  const personnel = await getListManagement("personnel");
  const center = await getListManagement("center");
  return { obj, projectType, projectStatus, techStack, personnel, center };
}

export async function updateAction({ request, params }) {
  const formData = await request.formData();
  const newObj = Object.fromEntries(formData); // push formdata into an object
  newObj.projectType = formData.getAll("projectType");
  newObj.projectStatus = formData.getAll("projectStatus");
  newObj.techStack = formData.getAll("techStack");
  newObj.personnel = formData.getAll("personnel");
  newObj.center = formData.getAll("center");
  //   console.log(newObj);
  if (validate()) {
    await updateManagement(params.id, newObj, "project");
    return redirect(`/management/project`);
  } else {
    return null;
  }
}

export default function CreateUpdateProject() {
  const navigate = useNavigate();
  const { obj, projectType, projectStatus, techStack, personnel, center } =
    useLoaderData();
  //   console.log(obj);

  return (
    <div className="container">
      <div className="row">
        <div className="title">Dự án</div>
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

        <label>
          <span>Loại dự án</span>
          <CategoryWeightCardList
            projectType={projectType}
            isCheckbox={true}
            obj={obj}
          />
        </label>
        <label>
          <span>Trạng thái dự án</span>
          <CategoryCardList
            categoryObj={projectStatus}
            name={"projectStatus"}
            isCheckbox={true}
            obj={obj}
          />
        </label>
        <label>
          <span>Tech stack</span>
          <CategoryCardList
            categoryObj={techStack}
            name={"techStack"}
            isCheckbox={true}
            obj={obj}
          />
        </label>
        <label>
          <span>Trung tâm phụ trách</span>
          <CenterCardList center={center} isCheckbox={true} obj={obj} />
        </label>
        <label>
          <span>Thành viên trong dự án</span>
          <PersonnelCardList
            personnel={personnel}
            isCheckbox={true}
            obj={obj}
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

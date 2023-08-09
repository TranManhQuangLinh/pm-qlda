import { Form, redirect, useNavigate, useLoaderData } from "react-router-dom";
import {
  createManagement,
  getListCategory,
  getListManagement,
  getManagement,
  updateManagement,
} from "../../../apis/database";
import CategoryCardList from "../../../components/card-list/CategoryCardList";
import CategoryWeightCardList from "../../../components/card-list/PersonnelCardList";
import ProjectCardList from "../../../components/card-list/ProjectCardList";

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
  const techStack = await getListCategory("techStack");
  const project = await getListManagement("project");
  const personnel = await getListManagement("personnel");
  return { obj, techStack, project, personnel };
}

export async function createAction({ request }) {
  const formData = await request.formData();
  const newObj = Object.fromEntries(formData); // push formdata into an object
  newObj.techStack = formData.getAll("techStack");
  newObj.project = formData.getAll("project");
  newObj.personnel = formData.getAll("personnel");
  //   console.log(newObj);
  if (validate()) {
    await createManagement(newObj, "center");
    return redirect(`/management/center`);
  } else {
    return null;
  }
}

export async function updateLoader({ params }) {
  const obj = await getManagement(params.id, "center");
  if (!obj) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  const techStack = await getListCategory("techStack");
  const project = await getListManagement("project");
  const personnel = await getListManagement("personnel");
  return { obj, techStack, project, personnel };
}

export async function updateAction({ request, params }) {
  const formData = await request.formData();
  const newObj = Object.fromEntries(formData); // push formdata into an object
  newObj.techStack = formData.getAll("techStack");
  newObj.project = formData.getAll("project");
  newObj.personnel = formData.getAll("personnel");
  //   console.log(newObj);
  if (validate()) {
    await updateManagement(params.id, newObj, "center");
    return redirect(`/management/center`);
  } else {
    return null;
  }
}

export default function CreateUpdateCenter() {
  const navigate = useNavigate();
  const { obj, techStack, project, personnel } = useLoaderData();
  // console.log(obj);
  // console.log(techStack);
  // console.log(project);
  // console.log(personnel);
  // const obj = {}

  // const techStack = {
  //     "-N_DNueEa36ueEz5LTLq": {
  //         description: "",
  //         name: "",
  //         status: "active",
  //     },
  //     "-N_DNwTVHmftFtg0LRDg": {
  //         description: "we",
  //         name: "qưe",
  //         status: "active",
  //     }
  // }

  return (
    <div className="container">
      <div className="row">
        <div className="title">Trung tâm, bộ phận, phòng ban</div>
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
          <span>Chức năng, nhiệm vụ</span>
          <textarea
            className="form-control"
            name="description"
            defaultValue={obj.description}
            rows={6}
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
          <span>Dự án</span>
          <ProjectCardList project={project} isCheckbox={true} obj={obj} />
        </label>
        <label>
          <span>Nhân viên</span>
          <CategoryWeightCardList
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

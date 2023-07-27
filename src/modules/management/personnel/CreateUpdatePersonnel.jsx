import { Form, redirect, useNavigate, useLoaderData } from "react-router-dom";
import {
  createManagement,
  getListCategory,
  getListManagement,
  getManagement,
  updateManagement,
} from "../../../database";
import TechStackCardList from "./components/TechStackCardList";

export async function createLoader() {
  const obj = {};
  const techStack = await getListCategory("techStack");
  const project = await getListManagement("project");
  return { obj, techStack, project };
}

export async function createAction({ request }) {
  const formData = await request.formData();
  const newObj = {};

  for (const [name, value] of formData.entries()) {
    // Check if the field is related to techStack
    if (name.startsWith("workingTime_") || name.startsWith("experience_")) {
      continue;
    }

    if (name === "techStack") {
      newObj[name] = formData.getAll("techStack").map((id) => ({
        id,
        workingTime: formData.get(`workingTime_${id}`),
        experience: formData.get(`experience_${id}`),
      }));
    } else {
      newObj[name] = value;
    }
  }
  newObj.project = formData.getAll("project");
  console.log(newObj);
  await createManagement(newObj, "personnel");
  return redirect(`/management/personnel`);
  // return null
}

export async function updateLoader({ params }) {
  const obj = await getManagement(params.id, "personnel");
  if (!obj) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  const techStack = await getListCategory("techStack");
  const project = await getListManagement("project");
  return { obj, techStack, project };
}

export async function updateAction({ request, params }) {
  const formData = await request.formData();
  const newObj = {};

  for (const [name, value] of formData.entries()) {
    // Check if the field is related to techStack
    if (name.startsWith("workingTime_") || name.startsWith("experience_")) {
      continue;
    }

    if (name === "techStack") {
      newObj[name] = formData.getAll("techStack").map((id) => ({
        id,
        workingTime: formData.get(`workingTime_${id}`),
        experience: formData.get(`experience_${id}`),
      }));
    } else {
      newObj[name] = value;
    }
  }

  newObj.project = formData.getAll("project");
  // console.log(newObj);
  await updateManagement(params.id, newObj, "personnel");
  return redirect(`/management/personnel`);
  // return null
}

export default function CreateUpdatePersonnel() {
  const navigate = useNavigate();
  const { obj, techStack, project } = useLoaderData();
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
        <div className="title">Nhân sự</div>
      </div>
      <Form method="post" id="contact-form">
        <label>
          <span>Tên</span>
          <input
            type="text"
            name="name"
            placeholder="Tên"
            defaultValue={obj.name}
          />
        </label>
        <label>
          <span>Ngày sinh</span>
          <input
            type="text"
            name="dateOfBirth"
            placeholder="Ngày sinh"
            defaultValue={obj.dateOfBirth}
          />
        </label>
        <label>
          <span>Số điện thoại</span>
          <input
            type="text"
            name="phone"
            placeholder="Số điện thoại"
            defaultValue={obj.phone}
          />
        </label>
        <label>
          <span>Tech stack</span>
          <TechStackCardList techStack={techStack} isCheckbox={true} obj={obj} hasExtraDescription={true} />
        </label>
        <label>
          <span>Dự án</span>
          
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

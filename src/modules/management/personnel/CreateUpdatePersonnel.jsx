import { Form, redirect, useNavigate, useLoaderData } from "react-router-dom";
import {
  createManagement,
  getListCategory,
  getListManagement,
  getManagement,
  updateManagement,
} from "../../../apis/database";
import TechStackCardList from "./components/TechStackCardList";
import ProjectCardList from "../../../components/card-list/ProjectCardList";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const validate = () => {
  const forms = document.querySelectorAll(".needs-validation");
  let isValid = true;

  Array.from(forms).forEach((form) => {
    const phoneField = form.querySelector('input[name="phone"]');
    if (phoneField) {
      const phoneValue = +phoneField.value;

      if (!Number.isInteger(phoneValue) || phoneValue <= 0) {
        console.log(2);
        phoneField.focus();
        form.classList.add("was-validated");
        phoneField.setCustomValidity("Invalid phone value");
        phoneField.classList.remove("is-valid");
        phoneField.classList.add("is-invalid");
        isValid = false;
      } else {
        console.log(3);
        phoneField.setCustomValidity("");
        phoneField.classList.remove("is-invalid");
        phoneField.classList.add("is-valid");
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
  // console.log(newObj);
  if (validate()) {
    await createManagement(newObj, "personnel");
    return redirect(`/management/personnel`);
  } else {
    return null;
  }
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
  if (validate()) {
    await updateManagement(params.id, newObj, "personnel");
    return redirect(`/management/personnel`);
  } else {
    return null;
  }
  // return null
}

export default function CreateUpdatePersonnel() {
  const navigate = useNavigate();
  const { obj, techStack, project } = useLoaderData();
  const [startDate, setStartDate] = useState(new Date()); // Initialize with today's date or any default date
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

  const handlePhoneInputChange = (e) => {
    if (
      e.target.parentElement.parentElement.parentElement.classList.contains(
        "was-validated"
      )
    ) {
      const phoneField = e.target;
      const phoneValue = +phoneField.value;
      if (!Number.isInteger(phoneValue) || phoneValue <= 0) {
        phoneField.setCustomValidity("Invalid phone value");
        phoneField.classList.remove("is-valid");
        phoneField.classList.add("is-invalid");
      } else {
        phoneField.setCustomValidity("");
        phoneField.classList.remove("is-invalid");
        phoneField.classList.add("is-valid");
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="title">Nhân sự</div>
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
          <span>Ngày sinh*</span>
          <DatePicker
            className="form-control"
            name="dateOfBirth"
            placeholderText="dd/mm/yyyy"
            selected={startDate} // Use a state variable to store the selected date
            onChange={(date) => setStartDate(date)} // Use a state function to update the selected date
            dateFormat="dd/MM/yyyy"
            required
          />
        </label>

        <label>
          <span>Số điện thoại*</span>
          <div className="d-flex flex-column">
            <input
              className="form-control"
              type="text"
              name="phone"
              placeholder="Số điện thoại"
              defaultValue={obj.phone}
              required
              onChange={handlePhoneInputChange}
            />
            <div className="invalid-feedback">
              Vui lòng nhập số điện thoại hợp lệ.
            </div>
          </div>
        </label>
        <label>
          <span>Tech stack</span>
          <TechStackCardList
            techStack={techStack}
            isCheckbox={true}
            obj={obj}
          />
        </label>
        <label>
          <span>Dự án</span>
          <ProjectCardList project={project} isCheckbox={true} obj={obj} />
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

import { Form, redirect, useNavigate, useLoaderData } from "react-router-dom";
import {
  createManagement,
  getListCategory,
  getListManagement,
  getManagement,
  updateManagement,
} from "../../../apis/database";
import TechStackCardList from "./components/TechStackCardList";
import ProjectCardList from "../../../components/ProjectCardList";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function validate(newObj) {
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  const phoneRegex = /^[\d-]+$/;

  const isDateOfBirthValid = dateRegex.test(newObj.dateOfBirth);
  const isPhoneNumberValid = phoneRegex.test(newObj.phone);

  if (!isDateOfBirthValid) {
    alert(
      "Ngày sinh không hợp lệ. Vui lòng nhập đúng định dạng dd/mm/yyyy và giá trị ngày, tháng, năm hợp lệ."
    );
    return false;
  } else {
    const [day, month, year] = newObj.dateOfBirth.split("/");
    const isValidDate = !isNaN(day) && !isNaN(month) && !isNaN(year);
    const parsedDate = new Date(`${year}-${month}-${day}`);
    console.log(parsedDate);

    if (!isValidDate || parsedDate.toString() === "Invalid Date") {
      alert(
        "Ngày sinh không hợp lệ. Vui lòng nhập đúng giá trị ngày, tháng, năm."
      );
      return false;
    }
  }

  if (!isPhoneNumberValid) {
    alert(
      "Số điện thoại không hợp lệ. Vui lòng chỉ nhập chữ số và dấu hyphen (-)."
    );
    return false;
  }
  return true;
}

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
  if (validate(newObj)) {
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
  if (validate(newObj)) {
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

  return (
    <div className="container">
      <div className="row">
        <div className="title">Nhân sự</div>
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
        <label>
          <span>Ngày sinh*</span>
          <DatePicker
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
          <input
            type="text"
            name="phone"
            placeholder="Số điện thoại"
            defaultValue={obj.phone}
            required
          />
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

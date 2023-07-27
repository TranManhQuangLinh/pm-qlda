import { Form, useLoaderData, useNavigate } from "react-router-dom";
import { getCategory, getManagement } from "../../../database";
import TechStackCardList from "./components/TechStackCardList";

export async function loader({ params }) {
  const obj = await getManagement(params.id, "personnel");
  //   obj = {
  //     description: "",
  //     name: "a",
  //     techStack: [
  //       { experience: "ád", id: "-N_ilb44UiKt7cAB38_N", workingTime: "a" },
  //       { experience: "q", id: "-N_ilbT9mAukfjAuiCMH", workingTime: "ưe" },
  //     ],
  //   };

  // get techStack object from list object
  async function getTechStackObjects(techStackList) {
    try {
      const techStackObjects = await Promise.all(
        techStackList.map(async (techStack) => {
          const techStackObject = await getCategory(techStack.id, "techStack");
          return {
            ...techStackObject,
            id: techStack.id,
            experience: techStack.experience,
            workingTime: techStack.workingTime,
          };
        })
      );
      return techStackObjects;
    } catch (error) {
      console.error("Error fetching techStack objects:", error);
      return [];
    }
  }

  if (obj.techStack && Array.isArray(obj.techStack)) {
    obj.techStack = await getTechStackObjects(obj.techStack);
  } else {
    obj.techStack = []; // Provide a default empty array
  }
  //   console.log(obj);

  return { obj };
}

export default function PersonnelDetail() {
  const navigate = useNavigate();
  const { obj } = useLoaderData();
  console.log(obj);
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
          <div>{obj.name}</div>
        </label>
        <label>
          <span>Ngày sinh</span>
          <div>{obj.dateOfBirth}</div>
        </label>
        <label>
          <span>Số điện thoại</span>
          <div>{obj.phone}</div>
        </label>
        <label>
          <span>Tech stack</span>
          <TechStackCardList
            techStack={obj.techStack}
            isCheckbox={false}
            obj={obj}
          />
        </label>
        <label>
          <span>Dự án</span>
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

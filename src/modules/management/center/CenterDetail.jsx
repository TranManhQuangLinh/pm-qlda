import { Form, useLoaderData, useNavigate } from "react-router-dom";
import TechStackCardList from "../../../components/TechStackCardList";
import { getCategory, getManagement } from "../../../database";
import PersonnelCardList from "../../../components/PersonnelCardList";

export async function loader({ params }) {
  const obj = await getManagement(params.id, "center");
  // obj = {
  //   description: "",
  //   name: "a",
  //   techStack: ["-N_ilb44UiKt7cAB38_N", "-N_ilbT9mAukfjAuiCMH"],
  //   personnel: ['-NaLbV7khrg5nsJvbM6d'],
  //   
  // };

  // get techStack object from list id
  async function getTechStackObjects(techStackIds) {
    try {
      const techStackObjects = await Promise.all(
        techStackIds.map((id) => getCategory(id, "techStack"))
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

  // get personnel object from list id
  async function getPersonnelObjects(personnelIds) {
    try {
      const personnelObjects = await Promise.all(
        personnelIds.map((id) => getManagement(id, "personnel"))
      );
      return personnelObjects;
    } catch (error) {
      console.error("Error fetching personnel objects:", error);
      return [];
    }
  }

  if (obj.personnel && Array.isArray(obj.personnel)) {
    obj.personnel = await getPersonnelObjects(obj.personnel);
  } else {
    obj.personnel = []; // Provide a default empty array
  }

  console.log(obj);

  return { obj };
}

export default function CenterDetail() {
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
        <div className="title">Trung tâm, bộ phận, phòng ban</div>
      </div>
      <Form method="post" id="contact-form">
        <label>
          <span>Tên</span>
          <div>{obj.name}</div>
        </label>
        <label>
          <span>Chức năng, nhiệm vụ</span>
          <div>{obj.description}</div>
        </label>
        <label>
          <span>Tech stack</span>
          <TechStackCardList techStack={obj.techStack} isCheckbox={false} />
        </label>
        <label>
          <span>Dự án</span>

        </label>
        <label>
          <span>Nhân viên</span>
          <PersonnelCardList personnel={obj.personnel} isCheckbox={false} />
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

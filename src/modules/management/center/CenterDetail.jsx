import { Form, useLoaderData, useNavigate } from "react-router-dom";
import CategoryCardList from "../../../components/card-list/CategoryCardList";
import { getManagement } from "../../../apis/database";
import CategoryWeightCardList from "../../../components/card-list/PersonnelCardList";
import { populateData } from "../../../apis/apiUtils";
import ProjectCardList from "../../../components/card-list/ProjectCardList";

export async function loader({ params }) {
  const obj = await getManagement(params.id, "center");
  // obj = {
  //   description: "",
  //   name: "a",
  //   techStack: ["-N_ilb44UiKt7cAB38_N", "-N_ilbT9mAukfjAuiCMH"],
  //   personnel: ['-NaLbV7khrg5nsJvbM6d'],
  //
  // };

  await populateData(obj, true);

  // console.log(obj);

  return { obj };
}

export default function CenterDetail() {
  const navigate = useNavigate();
  const { obj } = useLoaderData();
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
          <CategoryCardList categoryObj={obj.techStack} isCheckbox={false} />
        </label>
        <label>
          <span>Dự án</span>
          <ProjectCardList project={obj.project} isCheckbox={false} />
        </label>
        <label>
          <span>Nhân viên</span>
          <CategoryWeightCardList
            personnel={obj.personnel}
            isCheckbox={false}
          />
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

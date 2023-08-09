import { Form, useLoaderData, useNavigate } from "react-router-dom";
import { getManagement } from "../../../apis/database";
import CategoryCardList from "../../../components/card-list/CategoryCardList";
import CategoryWeightCardList from "../../../components/card-list/CategoryWeightCardList";
import PersonnelCardList from "../../../components/card-list/PersonnelCardList";
import CenterCardList from "../../../components/card-list/CenterCardList";
import { populateData } from "../../../apis/apiUtils";

export async function loader({ params }) {
  const obj = await getManagement(params.id, "project");
  await populateData(obj, true);
  return { obj };
}

export default function ProjectDetail() {
  const navigate = useNavigate();
  const { obj } = useLoaderData();
  // console.log(obj);
  return (
    <div className="container">
      <div className="row">
        <div className="title">Dự án</div>
      </div>
      <Form method="post" id="contact-form">
        <label>
          <span>Tên</span>
          <div>{obj.name}</div>
        </label>

        <label>
          <span>Loại dự án</span>
          <CategoryWeightCardList
            projectType={obj.projectType}
            isCheckbox={false}
          />
        </label>
        <label>
          <span>Trạng thái dự án</span>
          <CategoryCardList
            categoryObj={obj.projectStatus}
            isCheckbox={false}
          />
        </label>
        <label>
          <span>Tech stack</span>
          <CategoryCardList categoryObj={obj.techStack} isCheckbox={false} />
        </label>
        <label>
          <span>Trung tâm phụ trách</span>
          <CenterCardList center={obj.center} isCheckbox={false} />
        </label>
        <label>
          <span>Thành viên trong dự án</span>
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

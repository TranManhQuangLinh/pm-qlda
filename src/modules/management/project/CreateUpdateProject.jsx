import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { createManagement, getListCategory, getListManagement, getManagement, updateManagement } from "../../../apis/database";
import CategoryCardList from "../../../components/CategoryCardList";
import CategoryWeightCardList from "../../../components/CategoryWeightCardList";
import PersonnelCardList from "../../../components/PersonnelCardList";
import CenterCardList from "../../../components/CenterCardList";

export async function createLoader() {
    const obj = {}
    const projectType = await getListCategory('projectType')
    const projectStatus = await getListCategory('projectStatus')
    const techStack = await getListCategory('techStack')
    const personnel = await getListManagement('personnel')
    const center = await getListManagement('center')
    return { obj, projectType, projectStatus, techStack, personnel, center }
}

export async function createAction({ request }) {
    const formData = await request.formData();
    const newObj = Object.fromEntries(formData); // push formdata into an object
    newObj.projectType = formData.getAll("projectType");
    newObj.projectStatus = formData.getAll("projectStatus");
    newObj.techStack = formData.getAll("techStack");
    newObj.personnel = formData.getAll("personnel");
    newObj.center = formData.getAll("center");
    console.log(newObj);
    await createManagement(newObj, 'project');
    return redirect(`/management/project`);
    // return null
}

export async function updateLoader({ params }) {
    const obj = await getManagement(params.id, 'project')
    if (!obj) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
        });
    }
    const projectType = await getListCategory('projectType')
    const projectStatus = await getListCategory('projectStatus')
    const techStack = await getListCategory('techStack')
    const personnel = await getListManagement('personnel')
    const center = await getListManagement('center')
    return { obj, projectType, projectStatus, techStack, personnel, center }
}

export async function updateAction({ request, params }) {
    const formData = await request.formData();
    const newObj = Object.fromEntries(formData); // push formdata into an object
    newObj.projectType = formData.getAll("projectType");
    newObj.projectStatus = formData.getAll("projectStatus");
    newObj.techStack = formData.getAll("techStack");
    newObj.personnel = formData.getAll("personnel");
    newObj.center = formData.getAll("center");
    console.log(newObj);
    await updateManagement(params.id, newObj, 'project')
    return redirect(`/management/project`);
}

export default function CreateUpdateProject() {
    const navigate = useNavigate();
    const { obj, projectType, projectStatus, techStack, personnel, center } = useLoaderData()
    // console.log(obj);

    return (
        <div className='container'>
            <div className='row'>
                <div className="title">Dự án</div>
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
                    <span>Loại dự án</span>
                    <CategoryWeightCardList projectType={projectType} isCheckbox={true} obj={obj} />
                </label>
                <label>
                    <span>Trạng thái dự án</span>
                    <CategoryCardList projectStatus={projectStatus} isCheckbox={true} obj={obj} />
                </label>
                <label>
                    <span>Tech stack</span>
                    <CategoryCardList techStack={techStack} isCheckbox={true} obj={obj} />
                </label>
                <label>
                    <span>Trung tâm phụ trách</span>
                    <CenterCardList center={center} isCheckbox={true} obj={obj} />
                </label>
                <label>
                    <span>Thành viên trong dự án</span>
                    <PersonnelCardList personnel={personnel} isCheckbox={true} obj={obj} />
                </label>
                <p>
                    <button type="submit">Save</button>
                    <button
                        type="button"
                        onClick={() => {
                            navigate(-1);
                        }}
                    >Cancel</button>
                </p>
            </Form>
        </div>
    )
}

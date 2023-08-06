import { Form, redirect, useNavigate, useLoaderData } from "react-router-dom";
import { createManagement, getListCategory, getListManagement, getManagement, updateManagement } from "../../../apis/database";
import CategoryCardList from "../../../components/CategoryCardList";
import CategoryWeightCardList from "../../../components/PersonnelCardList";
import ProjectCardList from "../../../components/ProjectCardList";

export async function createLoader() {
    const obj = {}
    const techStack = await getListCategory('techStack')
    const project = await getListManagement('project')
    const personnel = await getListManagement('personnel')
    return { obj, techStack, project, personnel }
}

export async function createAction({ request }) {
    const formData = await request.formData();
    const newObj = Object.fromEntries(formData); // push formdata into an object
    newObj.techStack = formData.getAll("techStack");
    newObj.project = formData.getAll("project");
    newObj.personnel = formData.getAll("personnel");
    console.log(newObj);
    await createManagement(newObj, 'center');
    return redirect(`/management/center`);
    // return null
}

export async function updateLoader({ params }) {
    const obj = await getManagement(params.id, 'center')
    if (!obj) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
        });
    }
    const techStack = await getListCategory('techStack')
    const project = await getListManagement('project')
    const personnel = await getListManagement('personnel')
    return { obj, techStack, project, personnel }
}

export async function updateAction({ request, params }) {
    const formData = await request.formData();
    const newObj = Object.fromEntries(formData); // push formdata into an object
    newObj.techStack = formData.getAll("techStack");
    newObj.project = formData.getAll("project");
    newObj.personnel = formData.getAll("personnel");
    console.log(newObj);
    await updateManagement(params.id, newObj, 'center')
    return redirect(`/management/center`);
}

export default function CreateUpdateCenter() {
    const navigate = useNavigate();
    const { obj, techStack, project, personnel } = useLoaderData()
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
        <div className='container'>
            <div className='row'>
                <div className="title">Trung tâm, bộ phận, phòng ban</div>
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
                    <span>Chức năng, nhiệm vụ</span>
                    <textarea
                        name="description"
                        defaultValue={obj.description}
                        rows={6}
                    />
                </label>
                <label>
                    <span>Tech stack</span>
                    <CategoryCardList techStack={techStack} isCheckbox={true} obj={obj} />
                </label>
                <label>
                    <span>Dự án</span>
                    <ProjectCardList project={project} isCheckbox={true} obj={obj} />
                </label>
                <label>
                    <span>Nhân viên</span>
                    <CategoryWeightCardList personnel={personnel} isCheckbox={true} obj={obj} />
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

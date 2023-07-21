import { Form, redirect, useNavigate } from "react-router-dom";
import { createManagement, getListCategory, getListManagement, getManagement, updateManagement } from "../../../database";

export async function createAction({ request }) {
    const formData = await request.formData();
    const newObj = Object.fromEntries(formData); // push formdata into an object
    console.log(newObj);
    newObj.techStack = formData.getAll("techStack");
    newObj.project = formData.getAll("project");
    newObj.personnel = formData.getAll("personnel");
    console.log(newObj);
    await createManagement(newObj, 'personnel');
    return redirect(`/management/center`);
    // return null
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

export async function createLoader() {
    const obj = {}
    const techStack = await getListCategory('techStack')
    const project = await getListManagement('project')
    const personnel = await getListManagement('personnel')
    return { obj, techStack, project, personnel }
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
export default function CreateUpdateProject() {
    const navigate = useNavigate();
    // const { obj, objName } = useLoaderData()
    // console.log(obj);
    const obj = {}

    return (
        <div className='container'>
            <div className='row'>
                <div className="title">Dự án</div>
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
                    <span>Loại dự án</span>
                    
                </label>
                <label>
                    <span>Trạng thái dự án</span>
                    
                </label>
                <label>
                    <span>Tech stack</span>
                    
                </label>
                <label>
                    <span>Trung tâm phụ trách</span>
                    
                </label>
                <label>
                    <span>Thành viên trong dự án</span>
                    
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

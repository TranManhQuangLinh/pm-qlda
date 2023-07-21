import { Form, redirect, useNavigate, useLoaderData } from "react-router-dom";
import { createManagement, getListCategory, getListManagement, getManagement, updateManagement } from "../../../database";

export async function createAction({ request }) {
    const formData = await request.formData();
    const newObj = Object.fromEntries(formData); // push formdata into an object
    console.log(newObj);
    newObj.techStack = formData.getAll("techStack");
    newObj.project = formData.getAll("project");
    newObj.personnel = formData.getAll("personnel");
    console.log(newObj);
    await createManagement(newObj, 'center');
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

    const techStackOptions = Object.entries(techStack).map(([key, item]) => {
        return (
            <div key={key} className="form-check mb-3 ms-3 me-3">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id={key}
                    name="techStack"
                    value={key}
                    defaultChecked={obj.techStack ? obj.techStack.includes(key) : false}
                />
                <label className={`form-check-label ms-3`} htmlFor={key}>
                    <div className="me-3">
                        <div>Tên:</div>
                        <div>{item.name}</div>
                    </div>
                    <div className="me-3">
                        <div>Mô tả:</div>
                        <div>{item.description}</div>
                    </div>
                    <div className="me-3">
                        <div>Trạng thái:</div>
                        <div className={item.status}>{item.status.toUpperCase()}</div>
                    </div>
                </label>
            </div>
        );
    });


    const projectOptions = Object.entries(project).map(([key, item]) => {
        return (
            <div key={key} className="form-check mb-3 ms-3 me-3">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id={key}
                    name="project"
                    value={key}
                    defaultChecked={obj.project.includes(key)}
                />
                <label className={`form-check-label ms-3`} htmlFor={key}>
                    <div className="me-3">
                        <div>Tên:</div>
                        <div>{item.name}</div>
                    </div>
                    <div className="me-3">
                        <div>Mô tả:</div>
                        <div>{item.description}</div>
                    </div>
                    <div className="me-3">
                        <div>Trạng thái:</div>
                        <div className={item.status}>{item.status.toUpperCase()}</div>
                    </div>
                </label>
            </div>
        )
    });

    const personnelOptions = Object.entries(personnel).map(([key, item]) => {
        return (
            <div key={key} className="form-check mb-3 ms-3 me-3">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id={key}
                    name="personnel"
                    value={key}
                    defaultChecked={obj.personnel.includes(key)}
                />
                <label className={`form-check-label ms-3`} htmlFor={key}>
                    <div className="me-3">
                        <div>Tên:</div>
                        <div>{item.name}</div>
                    </div>
                    <div className="me-3">
                        <div>Mô tả:</div>
                        <div>{item.description}</div>
                    </div>
                    <div className="me-3">
                        <div>Trạng thái:</div>
                        <div className={item.status}>{item.status.toUpperCase()}</div>
                    </div>
                </label>
            </div>
        )
    });

    return (
        <div className='container'>
            <div className='row'>
                <div className="title">Trung tâm, bộ phận, phòng ban</div>
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
                    <span>Chức năng, nhiệm vụ</span>
                    <textarea
                        name="description"
                        defaultValue={obj.description}
                        rows={6}
                    />
                </label>
                <label>
                    <span>Tech stack</span>
                    <div className="dropdown">
                        <button type="button" className={`btn btn-primary dropdown-toggle ${Object.entries(techStack).length === 0 ? 'disabled' : ''}`} data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                            {Object.entries(techStack).length === 0 ? 'Không có Tech Stack' : 'Tech Stack'}
                        </button>
                        <div className="dropdown-menu">
                            {techStackOptions}
                        </div>
                    </div>
                </label>
                <label>
                    <span>Dự án</span>
                    <div className="dropdown">
                        <button type="button" className={`btn btn-primary dropdown-toggle ${Object.entries(project).length === 0 ? 'disabled' : ''}`} data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                            {Object.entries(project).length === 0 ? 'Không có Dự án' : 'Dự án'}
                        </button>
                        <div className="dropdown-menu">
                            {projectOptions}
                        </div>
                    </div>
                </label>
                <label>
                    <span>Nhân viên</span>
                    <div className="dropdown">
                        <button type="button" className={`btn btn-primary dropdown-toggle ${Object.entries(personnel).length === 0 ? 'disabled' : ''}`} data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                            {Object.entries(personnel).length === 0 ? 'Không có Nhân viên' : 'Nhân viên'}
                        </button>
                        <div className="dropdown-menu">
                            {personnelOptions}
                        </div>
                    </div>
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

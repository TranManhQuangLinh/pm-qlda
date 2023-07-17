import { Form, redirect, useNavigate, useLoaderData } from "react-router-dom";
import { getDanhMuc, suaDanhMuc, taoMoiDanhMuc } from "../../../database";

export async function actionTaoMoi({ request, params }) {
    const formData = await request.formData();
    const newObj = Object.fromEntries(formData); // đẩy formdata vào 1 đối tượng
    await taoMoiDanhMuc(newObj, params.objName);
    return redirect(`/danhmuc/${params.objName}`);
}

export async function actionSua({ request, params }) {
    const formData = await request.formData();
    const newObj = Object.fromEntries(formData); // đẩy formdata vào 1 đối tượng
    await suaDanhMuc(params.id, newObj, params.objName ? params.objName : 'loaiduan')
    return redirect(`/danhmuc/${params.objName ? params.objName : 'loaiduan'}`);
}

export async function loaderTaoMoi() {
    const obj = {}
    return { obj }
}

export async function loaderSua({ params }) {
    const obj = await getDanhMuc(params.id, params.objName ? params.objName : 'loaiduan')
    const objName = params.objName
    if (!obj) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
        });
    }
    return { obj, objName };
}

export default function TaoMoiSuaDuAn() {
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
                        name="ten"
                        placeholder="Tên"
                        defaultValue={obj.ten}
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

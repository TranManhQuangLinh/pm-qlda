import { Form, redirect, useNavigate, useLoaderData } from "react-router-dom";
import { getLoaiDuAn, suaLoaiDuAn, taoMoiLoaiDuAn } from "../database";

export async function actionTaoMoi({ request }) {
    const formData = await request.formData();
    const newObj = Object.fromEntries(formData); // đẩy formdata vào 1 đối tượng
    const fbObj = await taoMoiLoaiDuAn(newObj);
    // console.log('fbObj:', fbObj);
    return redirect(`/danhsach/loaiduan`);
}

export async function actionSua({ request, params }) {
    const formData = await request.formData();
    const newObj = Object.fromEntries(formData); // đẩy formdata vào 1 đối tượng
    const fbObj = await suaLoaiDuAn(params.idLDA, newObj)
    // console.log('fbObj:', fbObj);
    return redirect(`/danhsach/loaiduan`);
}

export async function loaderSua({ params }) {
    const obj = await getLoaiDuAn(params.idLDA)
    if (!obj) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
        });
    }
    return { obj };
}

export async function loaderTaoMoi() {
    const obj = {}
    return { obj }
}

export default function TaoMoiSua() {
    const navigate = useNavigate();
    const { obj } = useLoaderData()
    
    // console.log(obj);

    return (
        <Form method="post" id="contact-form">

            <label>
                <span>Tên</span>
                <input
                    type="text"
                    name="ten"
                    placeholder="Tên loại dự án"
                defaultValue={obj.ten}
                />
            </label>
            <label>
                <span>Trọng số ưu tiên</span>
                <input
                    type="text"
                    name="trongso"
                    placeholder="1, 2, 3..."
                defaultValue={obj.trongso}
                />
            </label>
            <label>
                <span>Trạng thái</span>
                <select
                    className="form-select"
                    name="trangthai"
                    defaultValue={obj.trangthai}
                >
                    <option value={'active'}>ACTIVE</option>
                    <option value={'inactive'}>INACTIVE</option>
                </select>
            </label>
            <label>
                <span>Mô tả</span>
                <textarea
                    name="mota"
                    defaultValue={obj.mota}
                    rows={6}
                />
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
    )
}

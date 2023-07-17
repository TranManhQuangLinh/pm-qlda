import { Form, redirect, useNavigate, useLoaderData } from "react-router-dom";
import { getDanhMuc, suaDanhMuc, taoMoiDanhMuc } from "../../database";

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

export async function loaderTaoMoi({ params }) {
    const obj = {}
    const objName = params.objName
    return { obj, objName }
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

export default function TaoMoiSua() {
    const navigate = useNavigate();
    const { obj, objName } = useLoaderData()
    // console.log(obj);

    let title
    switch (objName) {
        case 'loaiduan':
            title = 'Loại dự án'
            break;
        case 'trangthaiduan':
            title = 'Trạng thái dự án'
            break;
        case 'techstack':
            title = 'Tech Stack'
            break;
        case 'nhomkhachhang':
            title = 'Nhóm khách hàng'
            break;
        default:
            title = 'Loại dự án'
            break;
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className="title">{title}</div>
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
                {!objName || objName === 'loaiduan' || objName === 'nhomkhachhang' ? <label>
                    <span>Trọng số ưu tiên</span>
                    <input
                        type="text"
                        name="trongso"
                        placeholder="1, 2, 3..."
                        defaultValue={obj.trongso}
                    />
                </label> : ''}
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
        </div>
    )
}

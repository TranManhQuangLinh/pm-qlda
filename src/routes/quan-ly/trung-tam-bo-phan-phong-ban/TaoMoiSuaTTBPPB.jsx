import { Form, redirect, useNavigate, useLoaderData } from "react-router-dom";
import { getDSDanhMuc, getDSQuanLy, getQuanLy, suaQuanLy, taoMoiQuanLy } from "../../../database";

export async function actionTaoMoi({ request }) {
    const formData = await request.formData();
    const newObj = Object.fromEntries(formData); // đẩy formdata vào 1 đối tượng
    console.log(newObj);
    newObj.techstack = formData.getAll("techstack");
    newObj.duan = formData.getAll("duan");
    newObj.nhanvien = formData.getAll("nhanvien");
    console.log(newObj);
    await taoMoiQuanLy(newObj, 'ttbppb');
    return redirect(`/quanly/ttbppb`);
    // return null
}

export async function actionSua({ request, params }) {
    const formData = await request.formData();
    const newObj = Object.fromEntries(formData); // đẩy formdata vào 1 đối tượng
    newObj.techstack = formData.getAll("techstack");
    newObj.duan = formData.getAll("duan");
    newObj.nhanvien = formData.getAll("nhanvien");
    console.log(newObj);
    await suaQuanLy(params.id, newObj, 'ttbppb')
    return redirect(`/quanly/ttbppb`);
}

export async function loaderTaoMoi() {
    const obj = {}
    const techstack = await getDSDanhMuc('techstack')
    const duan = await getDSQuanLy('duan')
    const nhanvien = await getDSQuanLy('nhansu')
    return { obj, techstack, duan, nhanvien }
}

export async function loaderSua({ params }) {
    const obj = await getQuanLy(params.id, 'ttbppb')
    if (!obj) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
        });
    }
    const techstack = await getDSDanhMuc('techstack')
    const duan = await getDSQuanLy('duan')
    const nhanvien = await getDSQuanLy('nhansu')
    return { obj, techstack, duan, nhanvien }
}

export default function TaoMoiSuaTTBPPB() {
    const navigate = useNavigate();
    const { obj, techstack, duan, nhanvien } = useLoaderData()
    console.log(obj);
    // console.log(techstack);
    // console.log(duan);
    // console.log(nhanvien);
    // const obj = {}

    const techStack = {
        "-N_DNueEa36ueEz5LTLq": {
            mota: "",
            ten: "",
            trangthai: "active",
        },
        "-N_DNwTVHmftFtg0LRDg": {
            mota: "we",
            ten: "qưe",
            trangthai: "active",
        }
    }

    const techStackOptions = Object.entries(techstack).map(([key, item]) => {
        return (
            <div key={key} className="form-check mb-3 ms-3 me-3">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id={key}
                    name="techstack"
                    value={key}
                    defaultChecked={obj.techstack ? obj.techstack.includes(key) : false}
                />
                <label className={`form-check-label ms-3`} htmlFor={key}>
                    <div className="me-3">
                        <div>Tên:</div>
                        <div>{item.ten}</div>
                    </div>
                    <div className="me-3">
                        <div>Mô tả:</div>
                        <div>{item.mota}</div>
                    </div>
                    <div className="">
                        <div>Trạng thái:</div>
                        <div className={item.trangthai}>{item.trangthai.toUpperCase()}</div>
                    </div>
                </label>
            </div>
        );
    });


    const duAnOptions = Object.entries(duan).map(([key, item]) => {
        return (
            <div key={key} className="form-check mb-3 ms-3 me-3">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id={key}
                    name="duan"
                    value={key}
                    defaultChecked={obj.duan.includes(key)}
                />
                <label className={`form-check-label ms-3`} htmlFor={key}>
                    <div className="me-3">
                        <div>Tên:</div>
                        <div>{item.ten}</div>
                    </div>
                    <div className="me-3">
                        <div>Mô tả:</div>
                        <div>{item.mota}</div>
                    </div>
                    <div className="">
                        <div>Trạng thái:</div>
                        <div className={item.trangthai}>{item.trangthai.toUpperCase()}</div>
                    </div>
                </label>
            </div>
        )
    });

    const nhanVienOptions = Object.entries(nhanvien).map(([key, item]) => {
        return (
            <div key={key} className="form-check mb-3 ms-3 me-3">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id={key}
                    name="nhanvien"
                    value={key}
                    defaultChecked={obj.nhanvien.includes(key)}
                />
                <label className={`form-check-label ms-3`} htmlFor={key}>
                    <div className="me-3">
                        <div>Tên:</div>
                        <div>{item.ten}</div>
                    </div>
                    <div className="me-3">
                        <div>Mô tả:</div>
                        <div>{item.mota}</div>
                    </div>
                    <div className="">
                        <div>Trạng thái:</div>
                        <div className={item.trangthai}>{item.trangthai.toUpperCase()}</div>
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
                        name="ten"
                        placeholder="Tên"
                        defaultValue={obj.ten}
                    />
                </label>
                <label>
                    <span>Chức năng, nhiệm vụ</span>
                    <textarea
                        name="mota"
                        defaultValue={obj.mota}
                        rows={6}
                    />
                </label>
                <label>
                    <span>Tech stack</span>
                    <div className="dropdown">
                        <button type="button" className={`btn btn-primary dropdown-toggle ${Object.entries(techstack).length === 0 ? 'disabled' : ''}`} data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                            {Object.entries(techstack).length === 0 ? 'Không có Tech Stack' : 'Tech Stack'}
                        </button>
                        <div className="dropdown-menu">
                            {techStackOptions}
                        </div>
                    </div>
                </label>
                <label>
                    <span>Dự án</span>
                    <div className="dropdown">
                        <button type="button" className={`btn btn-primary dropdown-toggle ${Object.entries(duan).length === 0 ? 'disabled' : ''}`} data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                            {Object.entries(duan).length === 0 ? 'Không có Dự án' : 'Dự án'}
                        </button>
                        <div className="dropdown-menu">
                            {duAnOptions}
                        </div>
                    </div>
                </label>
                <label>
                    <span>Nhân viên</span>
                    <div className="dropdown">
                        <button type="button" className={`btn btn-primary dropdown-toggle ${Object.entries(nhanvien).length === 0 ? 'disabled' : ''}`} data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                            {Object.entries(nhanvien).length === 0 ? 'Không có Nhân viên' : 'Nhân viên'}
                        </button>
                        <div className="dropdown-menu">
                            {nhanVienOptions}
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

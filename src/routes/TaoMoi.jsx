import { Form, redirect, useNavigate } from "react-router-dom";
import { taoMoiLoaiDuAn } from "../database";

export async function action({ request }) {
    const formData = await request.formData();
    const newObj = Object.fromEntries(formData); // đẩy formdata vào 1 đối tượng
    console.log(newObj);
    const fbObj = await taoMoiLoaiDuAn(newObj);
    console.log('fbObj:', fbObj);
    return redirect(`/danhsach/loaiduan`);
}

export default function TaoMoi() {
    const navigate = useNavigate();

    return (
        <Form method="post" id="contact-form">

            <label>
                <span>Tên</span>
                <input
                    type="text"
                    name="ten"
                    placeholder="Tên loại dự án"
                // defaultValue={contact.twitter}
                />
            </label>
            <label>
                <span>Trọng số ưu tiên</span>
                <input
                    type="text"
                    name="trongso"
                    placeholder="1, 2, 3..."
                // defaultValue={contact.avatar}
                />
            </label>
            <label>
                <span>Trạng thái</span>
                <select className="form-select" name="trangthai">
                    <option value={'active'}>ACTIVE</option>
                    <option value={'inactive'}>INACTIVE</option>
                </select>
            </label>
            <label>
                <span>Mô tả</span>
                <textarea
                    name="mota"
                    // defaultValue={contact.notes}
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

import { redirect } from "react-router-dom";
import { xoaQuanLy } from "../../../database";

export async function action({ params }) {
    await xoaQuanLy(params.id, 'ttbppb');
    // console.log(params.objNames);
    return redirect(`/quanly/ttbppb`)
    // return null
}
import { redirect } from "react-router-dom";
import { xoaDanhMuc } from "../../database";

export async function action({ params }) {
    await xoaDanhMuc(params.id, params.objName ? params.objName : 'loaiduan');
    // console.log(params.objNames);
    return redirect(`/danhmuc/${params.objName ? params.objName : 'loaiduan'}`)
    // return null
}
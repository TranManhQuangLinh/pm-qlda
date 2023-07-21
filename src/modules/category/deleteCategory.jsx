import { redirect } from "react-router-dom";
import { deleteCategory } from "../../database";

export async function action({ params }) {
    await deleteCategory(params.id, params.objName ? params.objName : 'projectType');
    // console.log(params.objNames);
    return redirect(`/category/${params.objName ? params.objName : 'projectType'}`)
    // return null
}
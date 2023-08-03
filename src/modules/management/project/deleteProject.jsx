import { redirect } from "react-router-dom";
import { deleteManagement } from "../../../apis/database";

export async function action({ params }) {
    await deleteManagement(params.id, 'project');
    // console.log(params.objNames);
    return redirect(`/management/project`)
    // return null
}
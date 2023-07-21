import { redirect } from "react-router-dom";
import { deleteManagement } from "../../../database";

export async function action({ params }) {
    await deleteManagement(params.id, 'personnel');
    // console.log(params.objNames);
    return redirect(`/management/personnel`)
    // return null
}
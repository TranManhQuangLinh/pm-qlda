import { redirect } from "react-router-dom";
import { xoaLoaiDuAn } from "../database";

export async function action({ params }) {
    await xoaLoaiDuAn(params.idLDA);
    return redirect('/danhsach/loaiduan')
}
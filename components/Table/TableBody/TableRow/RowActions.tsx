"use client"
import { AlunoContext } from "@/context/alunoCtx";
import $ from "jquery";
import { useRouter } from "next/navigation";
import React, { useContext, useRef } from "react";
export default function RowActions({ RA }: { RA: string }) {
    const alunoCtx = useContext(AlunoContext);
    const router = useRouter()
    async function onDelete() {
        $.ajax({
            url: "/api/alunos?RA=" + RA,
            type: "DELETE"
        }).then(res => {
            alert(res);
            router.refresh();
        })
    }
    async function onUpdate() {
        alunoCtx?.editable.setEdit(true);
        $.ajax({
            url: "/api/alunos?RA=" + RA,
        }).then(res => {
            alunoCtx?.setAluno(old => ({
                ...old,
                Name: res.name,
                Email: res.email,
                CPF: res.cpf,
                RA
            }));
        }).catch(() => {
            alert("Houve um erro na busca")
        })


    }

    return (
        <td className="flex justify-center items-center  gap-4 border-l
            ">
            {alunoCtx?.editable.edit ? <button onClick={() => {
                alunoCtx.editable.setEdit(false)
            }} className="text-sm opacity-50 hover:underline hover:opacity-100 transition-opacity">Cadastrar</button> : <button onClick={onUpdate} className="text-sm opacity-50 hover:underline hover:opacity-100 transition-opacity">Editar</button>}
            <button onClick={onDelete} className="text-sm opacity-50 hover:underline hover:opacity-100 transition-opacity">Excluir</button>
        </td>
    )
}
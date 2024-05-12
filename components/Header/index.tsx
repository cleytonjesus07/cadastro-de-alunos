"use client"

import { AlunoContext } from "@/context/alunoCtx"
import { useContext } from "react"

export default function Header() {
    const alunoctx = useContext(AlunoContext);
    return (
        <div>
            {alunoctx?.editable.edit ? "Editar Aluno" : "Cadastrar Aluno"}
        </div>
    )
}
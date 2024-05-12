"use client"
import $ from "jquery";
import { FormEvent, MouseEventHandler, useContext } from "react";
import { useRouter } from "next/navigation";
import { AlunoContext } from "@/context/alunoCtx";
export default function Form() {
    const alunoctx = useContext(AlunoContext)
    const router = useRouter()
    function handleCadastro() {
        const data = { Nome: alunoctx?.aluno.Name, CPF: alunoctx?.aluno.CPF, Email: alunoctx?.aluno.Email };
        if (alunoctx?.aluno.Name === "" || alunoctx?.aluno.Email == "" || alunoctx?.aluno.CPF == "") {
            return;
        }
        $.ajax({
            url: "/api/alunos",
            method: "POST",
            data: JSON.stringify(data)
        })
            .then(() => {
                alert("Cadastrado com sucesso!")
                router.refresh();
            })
            .catch(() => {
                alert("Houve um problema ao cadastrar o aluno.");
            });
    }
    function handleEdicao() {
        const data = { name: alunoctx?.aluno.Name, cpf: alunoctx?.aluno.CPF, email: alunoctx?.aluno.Email, RA: alunoctx?.aluno.RA };
        if (alunoctx?.aluno.Name === "" || alunoctx?.aluno.Email == "" || alunoctx?.aluno.CPF == "") {
            return;
        }
        $.ajax({
            url: "/api/alunos",
            type: "PUT",
            data: JSON.stringify(data)
        }).then(() => {
            alert("Registro atualizado com sucesso")
            router.refresh();
        }).catch(() => {
            alert("Houve um problema na alteração dos dados")
        }).always(() => {
            alunoctx?.editable.setEdit(false);
            alunoctx?.setAluno({ Name: "", CPF: "", Email: "", RA: "" })
        })

    }

    return (
        <div className="flex flex-col">
            <fieldset className="flex flex-col gap-5">
                <input value={alunoctx?.aluno.Name}
                    name="Nome"
                    type="text"
                    className="bg-transparent"
                    placeholder="Digite o nome do aluno"
                    onChange={(e) => alunoctx?.setAluno(old => ({ ...old, Name: e.target.value }))}
                />
                <input value={alunoctx?.aluno.CPF}
                    name="CPF"
                    type="text"
                    className="bg-transparent"
                    placeholder="Digite o cpf do aluno"
                    onChange={(e) => alunoctx?.setAluno(old => ({ ...old, CPF: e.target.value }))}
                />
                <input value={alunoctx?.aluno.Email}
                    name="Email"
                    type="email"
                    className="bg-transparent"
                    placeholder="Digite o email do aluno"
                    onChange={(e) => alunoctx?.setAluno(old => ({ ...old, Email: e.target.value }))}
                />
            </fieldset>
            {alunoctx?.editable.edit ?
                <button className="hover:cursor-pointer p-2" onClick={handleEdicao}>Registrar Edição</button>
                :
                <button className="hover:cursor-pointer p-2" onClick={handleCadastro}>Cadastrar</button>
            }
        </div>
    )
}

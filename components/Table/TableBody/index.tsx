import { TableAlunos } from "@/model/TableAlunos";
import TableRow from "./TableRow";
import { Aluno } from "@prisma/client";

export default async function TableBody() {
    const aluno = new TableAlunos();
    const res = await aluno.getAlunos();
    return (
        <tbody className="text-center">
            {res.map(({ RA, cpf, email, name }: Aluno) => {
                return <TableRow key={RA} ra={RA} cpf={cpf} email={email} nome={name} />
            })}
        </tbody>
    )
}
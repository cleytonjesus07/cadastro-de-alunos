import RowActions from "./RowActions"

interface TableRowProps {
    ra: string,
    nome: string,
    cpf: string,
    email: string
}
export default function TableRow(props: TableRowProps) {

    return (
        <tr>
            <td>{props.ra}</td>
            <td>{props.nome}</td>
            <td>{props.cpf}</td>
            <td>{props.email}</td>
            <RowActions RA={props.ra} />
        </tr>
    )
}

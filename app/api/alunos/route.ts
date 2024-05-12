import { TableAlunos } from "@/model/TableAlunos";
import { Aluno } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const RA = request.nextUrl.searchParams.get("RA");
    const tableAlunos = new TableAlunos();
    if (RA === null || RA === undefined) {
        return;
    }
    const aluno = await tableAlunos.getAlunoByRA(RA);
    return NextResponse.json(aluno)
}
export async function PUT(request: NextRequest) {
    const aluno: Aluno = await request.json();
    const tableAlunos = new TableAlunos();
    tableAlunos.updateAluno(aluno);
    return NextResponse.json("Jóia");
}

export async function POST(request: NextRequest) {
    const aluno: { Nome: string, CPF: string, Email: string } = await request.json();

    const tableAlunos = new TableAlunos();
    tableAlunos.saveAluno(aluno)
    return NextResponse.json("Jóia")
}

export async function DELETE(request: NextRequest) {
    const tableAlunos = new TableAlunos();
    const RA = request.nextUrl.searchParams.get("RA");
    if (RA === null) {
        return NextResponse.error();
    }
    const oAlunoExiste: Aluno = await tableAlunos.getAlunoByRA(RA);
    if (!oAlunoExiste) {
        return NextResponse.error();
    }
    const res: boolean = await tableAlunos.deleteAlunoByRA(RA);
    return res ? NextResponse.json("Aluno excluído com sucesso") : NextResponse.error();
}
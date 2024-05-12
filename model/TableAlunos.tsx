import { Aluno, PrismaClient } from "@prisma/client";

export class TableAlunos {
    private prisma;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAlunos(): Promise<Aluno[]> {
        return await this.prisma.aluno.findMany();
    }

    async getAlunoByRA(RA: string): Promise<Aluno> {
        return await this.prisma.aluno.findFirstOrThrow({ where: { RA } });
    }

    async saveAluno(aluno: { Nome: string, CPF: string, Email: string }): Promise<boolean> {
        return await this.prisma.aluno
            .create({
                data: {
                    name: aluno.Nome,
                    email: aluno.Email,
                    cpf: aluno.CPF
                }
            })
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            })
    }

    async updateAluno(aluno: { name: string, cpf: string, email: string, RA: string }): Promise<Aluno | void> {
        const alunoExistente = await this.getAlunoByRA(aluno.RA);
        if (!alunoExistente) {
            return;
        };
        return await this.prisma.aluno.update({ where: { RA: aluno.RA }, data: aluno });
    }

    async deleteAlunoByRA(RA: string): Promise<boolean> {
        return await this.prisma.aluno.delete({ where: { RA } })
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            })
    }
}
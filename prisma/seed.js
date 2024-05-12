const { PrismaClient } = require('@prisma/client')
const { faker } = require("@faker-js/faker")
const prisma = new PrismaClient()
const load = async () => {
    try {
        const alunos = [], quantidade = 10;
        for (let index = 0; index < quantidade; index++) {
            const name = faker.person.fullName();
            const alunoSchema = {
                name,
                email: faker.internet.email({ firstName: name }),
                cpf: faker.helpers.fromRegExp("[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}")
            }
            alunos.push(alunoSchema);
        }
        await prisma.aluno.createMany({ data: alunos })
    } catch (e) {
        console.error(e)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

load()
"use client"
import React, { useState, createContext, useContext, ReactNode } from "react";

interface Aluno {
    Name: string;
    CPF: string;
    Email: string;
    RA?: string
}

interface AlunoContextType {
    aluno: Aluno;
    setAluno: React.Dispatch<React.SetStateAction<Aluno>>;
    editable: {
        edit: boolean;
        setEdit: React.Dispatch<React.SetStateAction<boolean>>;
    }
}

export const AlunoContext = createContext<AlunoContextType | undefined>(undefined);

interface AlunoProviderProps {
    children: ReactNode;
}

export function AlunoProvider({ children }: AlunoProviderProps) {
    const [edit, setEdit] = useState<boolean>(false);
    const [aluno, setAluno] = useState<Aluno>({
        Name: "",
        CPF: "",
        Email: "",
        RA: ""
    });

    return (
        <AlunoContext.Provider value={{ aluno, setAluno, editable: { edit, setEdit } }}>
            {children}
        </AlunoContext.Provider>
    );
}



"use client"
import Header from "../Header"

export default function Modal() {
    return (
        <div className="fixed text-black top-0 bottom-0 left-0 right-0 bg-black bg-opacity-85 flex justify-center items-center p-10">
            <div className="bg-slate-200 p-4 text-center w-full h-full">
                <Header headerTitle="ALUNO" />
            </div>
        </div>
    )
}
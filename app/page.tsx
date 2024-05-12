import Form from "@/components/Form";
import Header from "@/components/Header";
import SideMenu from "@/components/SideMenu";
import Table from "@/components/Table";

export default function Home() {
  return (
    <>
      <Header />
      <Form />
      <main className="flex mt-5">
        <SideMenu />
        <Table />
      </main>
    </>
  );

}


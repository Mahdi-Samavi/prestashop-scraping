import { useState, useEffect } from "react";
import { UilPlus, UilPen, UilTrashAlt } from "@iconscout/react-unicons";
import { Breadcrumbs, Card, Link, Table, Tooltip } from "../../Components";

export default function Index() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    loadStores();
  }, []);

  const loadStores = () => {
    window.electron.invoke("store:index").then((result) => {
      setStores(result.data);

      window.electron.send("close", "store:index");
    });
  };

  const handleDestroy = (id) => {
    window.electron.invoke("store:destroy", id).then(() => {
      loadStores();

      window.electron.send("close", "store:destroy");
    });
  };

  return (
    <>
      <Breadcrumbs
        items={[{ name: "Dashboard", url: "" }, { name: "Stores" }]}
      />

      <Card title="List of stores">
        <Card.Actions>
          <Link
            to="/stores/add"
            appendClassName="px-2 rounded-full"
            data-tip="Add store"
          >
            <UilPlus size={20} />
          </Link>
          <Tooltip />
        </Card.Actions>

        <Card.Body>
          <Table
            header={[
              "Store",
              "Admin URL",
              "Email",
              "Added At",
              "Edited At",
              "Status",
              "",
            ]}
          >
            {stores &&
              stores.map((store) => (
                <Table.Row key={store.id}>
                  <Table.Th>{store.name}</Table.Th>
                  <Table.Td>{store.admin_url}</Table.Td>
                  <Table.Td>{store.email}</Table.Td>
                  <Table.Td>{store.created_at}</Table.Td>
                  <Table.Td>{store.updated_at}</Table.Td>
                  <Table.Td>{store.status}</Table.Td>
                  <Table.Td className="flex justify-between flex-nowrap xl:justify-evenly">
                    <Link
                      to={"/stores/edit/" + store.id}
                      className="p-1 font-medium text-blue-600"
                    >
                      <UilPen size={20} />
                    </Link>

                    <button
                      className="p-1 font-medium text-red-600"
                      onClick={() => handleDestroy(store.id)}
                    >
                      <UilTrashAlt size={20} />
                    </button>
                  </Table.Td>
                </Table.Row>
              ))}
          </Table>
        </Card.Body>
      </Card>
    </>
  );
}

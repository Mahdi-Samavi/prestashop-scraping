import { useState, useEffect } from "react";
import { UilPlus, UilPen, UilTrashAlt } from "@iconscout/react-unicons";
import { Breadcrumbs, Card, Link, Table, Tooltip } from "../../Components";

export default function Index() {
  const [schemas, setSchemas] = useState([]);

  useEffect(() => {
    loadSchemas();
  }, []);

  const loadSchemas = () => {
    window.electron.invoke("schema:index").then((result) => {
      setSchemas(result.data);

      window.electron.send("close", "schema:index");
    });
  };

  const handleDestroy = (id) => {
    window.electron.invoke("schema:destroy", id).then(() => {
      loadSchemas();

      window.electron.send("close", "schema:destroy");
    });
  };

  return (
    <>
      <Breadcrumbs
        items={[{ name: "Dashboard", url: "" }, { name: "Schemas" }]}
      />

      <Card title="List of schemas">
        <Card.Actions>
          <Link
            to="/schemas/add"
            appendClassName="px-2 rounded-full"
            data-tip="Add schema"
          >
            <UilPlus size={20} />
          </Link>
          <Tooltip />
        </Card.Actions>

        <Card.Body>
          <Table header={["Schema", "Added At", "Edited At", ""]}>
            {schemas &&
              schemas.map((schema) => (
                <Table.Row key={schema.id}>
                  <Table.Th>{schema.name}</Table.Th>
                  <Table.Td>{schema.created_at}</Table.Td>
                  <Table.Td>{schema.updated_at}</Table.Td>
                  <Table.Td className="flex justify-between flex-nowrap xl:justify-evenly">
                    <Link
                      to={"/schemas/edit/" + schema.id}
                      className="p-1 font-medium text-blue-600"
                    >
                      <UilPen size={20} />
                    </Link>

                    <button
                      className="p-1 font-medium text-red-600"
                      onClick={() => handleDestroy(schema.id)}
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

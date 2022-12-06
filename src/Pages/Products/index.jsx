import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  UilPlus,
  UilPen,
  UilTrashAlt,
  UilCheck,
  UilTimes,
} from "@iconscout/react-unicons";
import { Breadcrumbs, Card, Link, Table, Tooltip } from "../../Components";

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    window.electron.invoke("product:index").then((result) => {
      window.electron.send("close", "product:index");
      if (!result.success) navigate("/stores");
      setProducts(result.data);
    });
  };

  const handleDestroy = (id) => {
    window.electron.invoke("store:destroy", id).then(() => {
      loadProducts();

      window.electron.send("close", "store:destroy");
    });
  };

  return (
    <>
      <Breadcrumbs
        items={[{ name: "Dashboard", url: "" }, { name: "Products" }]}
      />

      <Card title="List of products">
        <Card.Actions>
          <Link
            to="/products/add"
            appendClassName="px-2 rounded-full"
            data-tip="Add product"
          >
            <UilPlus size={20} />
          </Link>
          <Tooltip />
        </Card.Actions>

        <Card.Body>
          <Table
            header={[
              "Product",
              "Admin Store",
              "Schema",
              "Crawled At",
              "Added At",
              "Edited At",
              "Status",
              "",
            ]}
          >
            {products &&
              products.map((product) => (
                <Table.Row key={product.id}>
                  <Table.Th>{product.name}</Table.Th>
                  <Table.Td>{product.store}</Table.Td>
                  <Table.Td>{product.schema}</Table.Td>
                  <Table.Td>{product.crawled_at}</Table.Td>
                  <Table.Td>{product.created_at}</Table.Td>
                  <Table.Td>{product.updated_at}</Table.Td>
                  <Table.Td>
                    {product.status ? (
                      <UilCheck className="inline" size={28} color="#23C300" />
                    ) : (
                      <UilTimes className="inline" size={28} color="#FF3232" />
                    )}
                  </Table.Td>
                  <Table.Td className="flex justify-between flex-nowrap xl:justify-evenly">
                    <Link
                      to={"/products/edit/" + product.id}
                      className="p-1 font-medium text-blue-600"
                    >
                      <UilPen size={20} />
                    </Link>

                    <button
                      className="p-1 font-medium text-red-600"
                      onClick={() => handleDestroy(product.id)}
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

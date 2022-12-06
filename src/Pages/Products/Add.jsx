import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UilSave } from "@iconscout/react-unicons";
import {
  Breadcrumbs,
  Button,
  Card,
  Checkbox,
  DescInput,
  Label,
  Select,
  Switch,
  TextInput,
} from "../../Components";

export default function Add() {
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    window.electron.invoke("product:create").then((result) => {
      window.electron.send("close", "product:create");

      setData(result.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {};
    const data = new FormData(e.target);

    data.forEach((value, key) => (formData[key] = value));

    window.electron.invoke("product:add", formData).then((result) => {
      window.electron.send("close", "product:add");
      if (result.success) navigate("/products");
    });
  };

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Dashboard", url: "" },
          { name: "Products", url: "products" },
          { name: "Add new Product" },
        ]}
      />

      <Card title="Add product">
        <Card.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <Label htmlFor="name">Product name</Label>
              <TextInput type="text" name="name" id="name" required />
              <DescInput>
                Product name in the admin section of the store
              </DescInput>
            </div>
            <div className="mb-6">
              <Label htmlFor="store-id">Admin store</Label>
              <Select name="store_id" id="store-id" defaultValue="0" required>
                <option value="0" disabled>
                  Select the store management panel
                </option>
                {data &&
                  data.stores.map((store) => (
                    <option key={store.id} value={store.id}>
                      {store.name}
                    </option>
                  ))}
              </Select>
            </div>
            <div className="mb-6">
              <Label htmlFor="schema-id">Schema</Label>
              <Select name="schema_id" id="schema-id" defaultValue="0" required>
                <option value="0" disabled>
                  Select the schema
                </option>
                {data &&
                  data.schemas.map((schema) => (
                    <option key={schema.id} value={schema.id}>
                      {schema.name}
                    </option>
                  ))}
              </Select>
            </div>
            <div className="mb-6">
              <Label htmlFor="page-url">Page URL</Label>
              <TextInput type="text" name="page_url" id="page-url" required />
              <DescInput>
                Enter the link of the product page in the main store with
                http:// or https://.
              </DescInput>
            </div>
            <div className="mb-6">
              <Checkbox
                name="set_discounted_price"
                id="set-discounted-price"
                label="Set discounted price"
              />
              <DescInput>
                If the product has a discount, it will set the discounted price.
                (New price)
              </DescInput>
            </div>
            <div className="mb-6">
              <Checkbox
                name="ignore_manipulation"
                id="ignore-manipulation"
                label="Regardless of the price manipulation"
              />
              <DescInput>
                If the <b className="text-gray-500">Set discounted price</b>{" "}
                field is active and the product has a discount, it prevents
                price manipulation.
              </DescInput>
            </div>
            <div className="mb-6">
              <Label htmlFor="manipulation-amount">Manipulation amount</Label>
              <div className="flex">
                <TextInput
                  type="number"
                  name="manipulation_amount"
                  id="manipulation-amount"
                  className="rounded-r-none"
                  placeholder="Amount affecting the original price"
                  required
                />
                <Select
                  name="manipulation_type"
                  id="manipulation-type"
                  className="w-1/4 min-w-fit -ml-[1px] rounded-l-none rounded-r-none"
                  required
                >
                  <option value="1">Percentage</option>
                  <option value="2">Currency</option>
                </Select>
                <Select
                  name="manipulation_side"
                  id="manipulation-side"
                  className="w-1/4 min-w-fit -ml-[1px] rounded-l-none"
                  required
                >
                  <option value="1">Increase</option>
                  <option value="2">Decrease</option>
                </Select>
              </div>
            </div>
            <div className="mb-6">
              <Switch name="status" label="Status" />
            </div>
            <div className="flex flex-row-reverse">
              <Button type="submit" className="bg-slate-400">
                <span>Add</span>
                <Button.Icon>
                  <UilSave size={20} />
                </Button.Icon>
              </Button>
            </div>
          </form>
        </Card.Body>
      </Card>
    </>
  );
}

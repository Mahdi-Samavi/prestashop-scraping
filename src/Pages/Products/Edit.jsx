import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

export default function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    window.electron.invoke("product:get", id).then((result) => {
      window.electron.send("close", "product:get");
      setProduct(result.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {};
    const data = new FormData(e.target);

    data.forEach((value, key) => (formData[key] = value));

    window.electron
      .invoke("product:edit", product.id, formData)
      .then((result) => {
        window.electron.send("close", "product:edit");
        if (result.success) navigate("/products");
      });
  };

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Dashboard", url: "" },
          { name: "Products", url: "products" },
          { name: "Edit Product" },
        ]}
      />

      <Card title={"Edit product (" + (product && product.name) + ")"}>
        <Card.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <Label htmlFor="name">Product name</Label>
              <TextInput
                type="text"
                name="name"
                id="name"
                defaultValue={product && product.name}
                required
              />
            </div>
            <div className="mb-6">
              <Label htmlFor="store-id">Admin store</Label>
              <Select
                name="store_id"
                id="store-id"
                value={product && product.store_id}
                required
              >
                {product &&
                  product.stores.map((store) => (
                    <option key={store.id} value={store.id}>
                      {store.name}
                    </option>
                  ))}
              </Select>
            </div>
            <div className="mb-6">
              <Label htmlFor="schema-id">Schema</Label>
              <Select
                name="schema_id"
                id="schema-id"
                value={product && product.schema_id}
                required
              >
                <option value="0" disabled>
                  Select the schema
                </option>
                {product &&
                  product.schemas.map((schema) => (
                    <option key={schema.id} value={schema.id}>
                      {schema.name}
                    </option>
                  ))}
              </Select>
            </div>
            <div className="mb-6">
              <Label htmlFor="page-url">Page URL</Label>
              <TextInput
                type="text"
                name="page_url"
                id="page-url"
                defaultValue={product && product.page_url}
                required
              />
              <DescInput>
                Enter the link of the product page in the main store with
                http:// or https://.
              </DescInput>
            </div>
            <div className="mb-6">
              <Checkbox
                name="set_discounted_price"
                id="set-discounted-price"
                defaultChecked={product && product.set_discounted_price}
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
                defaultChecked={product && product.ignore_manipulation}
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
                  defaultValue={product && product.manipulation_amount}
                  placeholder="Amount affecting the original price"
                  required
                />
                <Select
                  name="manipulation_type"
                  id="manipulation-type"
                  className="w-1/4 min-w-fit -ml-[1px] rounded-l-none rounded-r-none"
                  value={product && product.manipulation_type}
                  required
                >
                  <option value="1">Percentage</option>
                  <option value="2">Currency</option>
                </Select>
                <Select
                  name="manipulation_side"
                  id="manipulation-side"
                  className="w-1/4 min-w-fit -ml-[1px] rounded-l-none"
                  value={product && product.manipulation_side}
                  required
                >
                  <option value="1">Increase</option>
                  <option value="2">Decrease</option>
                </Select>
              </div>
            </div>
            <div className="mb-6">
              <Switch
                name="status"
                label="Status"
                defaultChecked={product && product.status}
              />
            </div>
            <div className="flex flex-row-reverse">
              <Button type="submit" className="bg-slate-400">
                <span>Edit</span>
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

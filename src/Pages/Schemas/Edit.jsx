import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UilSave } from "@iconscout/react-unicons";
import {
  Breadcrumbs,
  Button,
  Card,
  DescInput,
  Label,
  Select,
  TextInput,
} from "../../Components";

export default function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [schema, setSchema] = useState();

  useEffect(() => {
    window.electron.invoke("schema:get", id).then((result) => {
      window.electron.send("close", "schema:get");
      setSchema(result.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {};
    const data = new FormData(e.target);

    data.forEach((value, key) => (formData[key] = value));

    window.electron
      .invoke("schema:edit", schema.id, formData)
      .then((result) => {
        window.electron.send("close", "schema:edit");
        if (result.success) navigate("/schemas");
      });
  };

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Dashboard", url: "" },
          { name: "Schemas", url: "schemas" },
          { name: "Edit Schema" },
        ]}
      />

      <Card title={"Edit schema (" + (schema && schema.name) + ")"}>
        <Card.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <Label htmlFor="name">Name</Label>
              <TextInput
                type="text"
                name="name"
                defaultValue={schema && schema.name}
                id="name"
                required
              />
            </div>
            <div className="mb-6">
              <Label htmlFor="regular-price-element">
                Regular price element
              </Label>
              <TextInput
                type="text"
                name="regular_price_element"
                defaultValue={schema && schema.regular_price_element}
                id="regular-price-element"
                required
              />
              <DescInput>
                The XPath of the regular price tag or element on the
                product&apos;s main site.
              </DescInput>
            </div>
            <div className="mb-6">
              <Label htmlFor="discounted-element">Discounted element</Label>
              <TextInput
                type="text"
                name="discounted_element"
                defaultValue={schema && schema.discounted_element}
                id="discounted-element"
                required
              />
              <DescInput>
                The XPath of the discount tag or element on the product&apos;s
                main site. Price element when there is a discounted.{" "}
                <b className="text-gray-500">(before applying the discount)</b>
              </DescInput>
            </div>
            <div className="mb-6">
              <Label htmlFor="discount-element">Discount element</Label>
              <TextInput
                type="text"
                name="discount_element"
                defaultValue={schema && schema.discount_element}
                id="discount-element"
                required
              />
              <DescInput>
                The XPath of the discount tag or element on the product&apos;s
                main site.{" "}
                <b className="text-gray-500">(after applying the discount)</b>
              </DescInput>
            </div>
            <div className="mb-6">
              <Label>Price rounding method</Label>
              <Select
                name="round_type"
                id="round-type"
                value={schema && schema.round_type}
                required
              >
                <option value="1">No rounding</option>
                <option value="2">Round up</option>
                <option value="3">Normal rounding</option>
                <option value="4">Round down</option>
              </Select>
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

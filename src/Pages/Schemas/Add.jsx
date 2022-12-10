import { useNavigate } from "react-router-dom";
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

export default function Add() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {};
    const data = new FormData(e.target);

    data.forEach((value, key) => (formData[key] = value));

    window.electron.invoke("schema:add", formData).then((result) => {
      window.electron.send("close", "schema:add");
      if (result.success) navigate("/schemas");
    });
  };

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Dashboard", url: "" },
          { name: "Schemas", url: "schemas" },
          { name: "Add new Schema" },
        ]}
      />

      <Card title="Add schema">
        <Card.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <Label htmlFor="name">Name</Label>
              <TextInput type="text" name="name" id="name" required />
            </div>
            <div className="mb-6">
              <Label htmlFor="regular-price-element">
                Regular price element
              </Label>
              <TextInput
                type="text"
                name="regular_price_element"
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
              <Select name="round_type" id="round-type" required>
                <option value="1">No rounding</option>
                <option value="2">Round up</option>
                <option value="3">Normal rounding</option>
                <option value="4">Round down</option>
              </Select>
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

import { UilSave, UilFlask } from "@iconscout/react-unicons";
import {
  Breadcrumbs,
  Button,
  Card,
  Label,
  Switch,
  TextInput,
} from "../../Components";
import { useNavigate } from "react-router-dom";

export default function Add() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {};
    const data = new FormData(e.target);

    data.forEach((value, key) => (formData[key] = value));

    window.electron.invoke("store:add", formData).then((result) => {
      window.electron.send("close", "store:add");
      if (result.success) navigate("/stores");
    });
  };

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Dashboard", url: "" },
          { name: "Stores", url: "stores" },
          { name: "Add new Store" },
        ]}
      />

      <Card title="Add store">
        <Card.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <Label htmlFor="name">Store name</Label>
              <TextInput type="text" name="name" id="name" required />
            </div>
            <div className="mb-6">
              <Label htmlFor="admin-url">Admin URL</Label>
              <TextInput type="text" name="admin_url" id="admin-url" required />
            </div>
            <div className="mb-6">
              <Label htmlFor="email">Email</Label>
              <TextInput type="email" name="email" id="email" required />
            </div>
            <div className="mb-6">
              <Label htmlFor="password">Password</Label>
              <TextInput
                type="password"
                name="password"
                id="password"
                className="tracking-[5px]"
                required
              />
            </div>
            <div className="mb-6">
              <Switch name="status" label="Status" />
            </div>
            <div className="flex flex-row-reverse gap-x-4">
              <Button type="submit" className="bg-slate-400">
                <span>Add</span>
                <Button.Icon>
                  <UilSave size={20} />
                </Button.Icon>
              </Button>
              <Button type="button" className="bg-slate-200">
                <span>Test</span>
                <Button.Icon>
                  <UilFlask size={20} />
                </Button.Icon>
              </Button>
            </div>
          </form>
        </Card.Body>
      </Card>
    </>
  );
}

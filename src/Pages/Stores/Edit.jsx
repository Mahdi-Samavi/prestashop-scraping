import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UilSave, UilFlask } from "@iconscout/react-unicons";
import {
  Breadcrumbs,
  Button,
  Card,
  Label,
  Switch,
  TextInput,
} from "../../Components";

export default function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [store, setStore] = useState();

  useEffect(() => {
    window.electron.invoke("store:get", id).then((result) => {
      window.electron.send("close", "store:get");
      setStore(result.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {};
    const data = new FormData(e.target);

    data.forEach((value, key) => (formData[key] = value));

    window.electron.invoke("store:edit", store.id, formData).then((result) => {
      window.electron.send("close", "store:edit");
      if (result.success) navigate("/stores");
    });
  };

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Dashboard", url: "" },
          { name: "Stores", url: "stores" },
          { name: "Edit Store" },
        ]}
      />

      <Card title={"Edit store (" + (store && store.name) + ")"}>
        <Card.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <Label htmlFor="name">Store name</Label>
              <TextInput
                type="text"
                name="name"
                defaultValue={store && store.name}
                id="name"
                required
              />
            </div>
            <div className="mb-6">
              <Label htmlFor="admin-url">Admin URL</Label>
              <TextInput
                type="text"
                name="admin_url"
                defaultValue={store && store.admin_url}
                id="admin-url"
                required
              />
            </div>
            <div className="mb-6">
              <Label htmlFor="email">Email</Label>
              <TextInput
                type="email"
                name="email"
                defaultValue={store && store.email}
                id="email"
                required
              />
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
              <Switch
                name="status"
                label="Status"
                defaultChecked={store && store.status}
              />
            </div>
            <div className="flex flex-row-reverse gap-x-4">
              <Button type="submit" className="bg-slate-400">
                <span>Edit</span>
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

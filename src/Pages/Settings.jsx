import { useEffect, useState } from "react";
import { UilSave } from "@iconscout/react-unicons";
import {
  Breadcrumbs,
  Button,
  Card,
  DescInput,
  Label,
  Select,
  TextInput,
} from "../Components";

export default function Settings() {
  const [setting, setSetting] = useState();

  useEffect(() => {
    window.electron.invoke("setting:getter").then((result) => {
      window.electron.send("close", "setting:getter");
      setSetting(result.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {};
    const data = new FormData(e.target);

    data.forEach((value, key) => (formData[key] = value));

    window.electron.invoke("setting:edit-all", formData).then(() => {
      window.electron.send("close", "setting:edit-all");
    });
  };

  return (
    <>
      <Breadcrumbs
        items={[{ name: "Dashboard", url: "" }, { name: "Settings" }]}
      />

      <Card title="Setting">
        <Card.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <Label htmlFor="delay_check">Delay</Label>
              <TextInput
                type="number"
                name="delay_check"
                defaultValue={setting && setting.delay_check}
                id="delay_check"
                min="1"
                required
              />
              <DescInput>
                Delay time for checking crawling time in minutes
              </DescInput>
            </div>
            <div className="mb-6">
              <Label htmlFor="crawling-day">Crawling day</Label>
              <Select
                name="crawling_day"
                id="crawling-day"
                value={setting && setting.crawling_day}
                required
              >
                <option value="1">Everyday</option>
                <option value="2">Odd days</option>
                <option value="3">Even days</option>
                <option value="4">Thursdays only</option>
                <option value="5">Fridays only</option>
              </Select>
            </div>
            <div className="mb-6">
              <Label htmlFor="crawling-time">Crawling time</Label>
              <Select
                name="crawling_time"
                id="crawling-time"
                value={setting && setting.crawling_time}
                required
              >
                {[...Array(24).keys()].map((hour) => (
                  <option key={hour} value={hour}>
                    {hour <= 9 ? "0" : ""}
                    {hour}:00
                  </option>
                ))}
              </Select>
            </div>
            <div className="flex flex-row-reverse">
              <Button type="submit" className="bg-slate-400">
                <span>Save</span>
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

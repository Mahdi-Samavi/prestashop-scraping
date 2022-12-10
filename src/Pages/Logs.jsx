import { useState, useEffect } from "react";
import { Breadcrumbs, Card } from "../Components";

export default function Logs() {
  const [log, setLog] = useState();

  useEffect(() => {
    window.electron.invoke("log:get").then((result) => {
      window.electron.send("close", "log:get");
      setLog(result.data);
    });
  }, []);

  return (
    <>
      <Breadcrumbs items={[{ name: "Dashboard", url: "" }, { name: "Logs" }]} />

      <Card>
        <Card.Body>
          <pre
            className="overflow-x-scroll leading-tight min-h-[175px] shadow-sm p-2 rounded text-sm"
            dangerouslySetInnerHTML={{ __html: log }}
          ></pre>
        </Card.Body>
      </Card>
    </>
  );
}

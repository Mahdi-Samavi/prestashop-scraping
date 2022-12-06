import { useState, useEffect } from "react";
import { UilBug } from "@iconscout/react-unicons";

export default function Crawler() {
  const [pid, setPid] = useState(null);
  const [crawling, toggle] = useState(0);

  useEffect(() => {
    window.electron.invoke("setting:getter", "crawling").then((result) => {
      window.electron.send("close", "setting:getter");
      if (result.data == "1") {
        toggleCrawl(1);
      }
    });
  }, []);

  const toggleCrawl = (state) => {
    toggle(state);
    window.electron.invoke("crawl:handle", state, pid).then((result) => {
      if (!state) window.electron.send("close", "crawl:handle");
      setPid(result.data.pid);
    });
  };

  return (
    <button
      className={
        (crawling ? "bg-gray-300 " : "") +
        "flex justify-center items-center w-[32px] m-[3px] transition rounded-full hover:bg-gray-300"
      }
      onClick={() => toggleCrawl(!crawling)}
    >
      <UilBug size={20} />
    </button>
  );
}

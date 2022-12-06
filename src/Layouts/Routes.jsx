import { Routes as R, Route } from "react-router-dom";
import {
  AddStore,
  Dashboard,
  EditStore,
  Logs,
  Products,
  Settings,
  Stores,
} from "../Pages";

export default function Routes() {
  const pages = [
    { name: "dashboard", url: "", page: Dashboard, exact: true },
    { name: "stores", url: "stores", page: Stores },
    { name: "add store", url: "stores/add", page: AddStore },
    { name: "edit store", url: "stores/edit/:id", page: EditStore },
    { name: "products", url: "products", page: Products },
    { name: "settings", url: "settings", page: Settings },
    { name: "logs", url: "logs", page: Logs },
  ];

  return (
    <R>
      {pages.map((page) => (
        <Route
          key={page.name}
          exact={page.exact !== "undefined" && page.exact}
          path={"/" + page.url}
          element={<page.page />}
        />
      ))}
    </R>
  );
}

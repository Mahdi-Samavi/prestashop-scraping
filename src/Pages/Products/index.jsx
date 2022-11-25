import { Breadcrumbs } from "../../Components";

export default function Products() {
  return (
    <>
      <Breadcrumbs
        items={[{ name: "Dashboard", url: "" }, { name: "Products" }]}
      />
    </>
  );
}

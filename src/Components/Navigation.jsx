import Link from "./Link";
import {
  UilDashboard,
  UilShop,
  UilShoppingBag,
  UilFileInfoAlt,
} from "@iconscout/react-unicons";

export default function Navigation() {
  return (
    <>
      <ul className="flex flex-col gap-y-2">
        <li>
          <Link to="/">
            <UilDashboard size={22} />
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/stores">
            <UilShop size={22} />
            Stores
          </Link>
        </li>
        <li>
          <Link to="/products">
            <UilShoppingBag size={22} />
            Products
          </Link>
        </li>
        <li className="mt-8">
          <Link to="/logs">
            <UilFileInfoAlt size={22} />
            Logs
          </Link>
        </li>
      </ul>
    </>
  );
}

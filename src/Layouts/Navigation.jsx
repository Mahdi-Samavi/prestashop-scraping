import { NavLink } from "../Components";
import {
  UilDashboard,
  UilShop,
  UilLayerGroup,
  UilShoppingBag,
  UilFileInfoAlt,
} from "@iconscout/react-unicons";

export default function Navigation() {
  return (
    <>
      <ul className="flex flex-col gap-y-2">
        <li>
          <NavLink to="/">
            <UilDashboard size={22} />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/stores">
            <UilShop size={22} />
            Stores
          </NavLink>
        </li>
        <li>
          <NavLink to="/schemas">
            <UilLayerGroup size={22} />
            Schemas
          </NavLink>
        </li>
        <li>
          <NavLink to="/products">
            <UilShoppingBag size={22} />
            Products
          </NavLink>
        </li>
        <li className="mt-8">
          <NavLink to="/logs">
            <UilFileInfoAlt size={22} />
            Logs
          </NavLink>
        </li>
      </ul>
    </>
  );
}

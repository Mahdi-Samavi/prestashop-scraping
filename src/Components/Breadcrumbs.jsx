/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { UilAngleDoubleRight } from "@iconscout/react-unicons";

export default function Breadcrumbs(props) {
  const lastItem = props.items.pop();
  return (
    <div className="px-4 py-2 mb-4 bg-slate-100 rounded-xl">
      <ul className="flex text-sm gap-x-2">
        {props.items.map((item) => (
          <li key={item.name}>
            <Link to={"/" + item.url}>{item.name}</Link>
            <UilAngleDoubleRight
              className="inline-block ml-2"
              color="#b7b7b7"
              size={14}
            />
          </li>
        ))}
        <li>{lastItem.name}</li>
      </ul>
    </div>
  );
}

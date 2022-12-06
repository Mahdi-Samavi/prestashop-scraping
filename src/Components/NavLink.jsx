/* eslint-disable react/prop-types */
import { NavLink as L } from "react-router-dom";

export default function NavLink({
  to,
  className,
  appendClassName,
  children,
  ...props
}) {
  const newClassName =
    typeof className === "undefined"
      ? "flex items-center px-4 py-2 text-sm transition gap-x-3 rounded-xl bg-opacity-30 hover:bg-gray-300"
      : className;

  return (
    <L
      to={to}
      className={({ isActive }) =>
        (isActive ? "bg-gray-400 " : "bg-gray-200 ") +
        newClassName +
        (appendClassName == undefined ? "" : " " + appendClassName)
      }
      {...props}
    >
      {children}
    </L>
  );
}

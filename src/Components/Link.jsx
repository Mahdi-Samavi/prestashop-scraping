/* eslint-disable react/prop-types */
import { Link as L } from "react-router-dom";

export default function Link({
  to,
  className,
  appendClassName,
  children,
  ...props
}) {
  const newClassName =
    typeof className === "undefined"
      ? "flex items-center px-4 py-2 text-sm transition bg-gray-200 gap-x-3 rounded-xl bg-opacity-30 hover:bg-gray-300 focus:bg-gray-300"
      : className;

  return (
    <L
      to={to}
      className={
        newClassName +
        (appendClassName == undefined ? "" : " " + appendClassName)
      }
      {...props}
    >
      {children}
    </L>
  );
}

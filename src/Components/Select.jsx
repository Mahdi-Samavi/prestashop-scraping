import { useEffect, useRef } from "react";

/* eslint-disable react/prop-types */
export default function Select({ value, className = "", children, ...props }) {
  const select = useRef();

  useEffect(() => {
    if (value) select.current.value = value;
  });

  return (
    <select ref={select} className={"select-input " + className} {...props}>
      {children}
    </select>
  );
}

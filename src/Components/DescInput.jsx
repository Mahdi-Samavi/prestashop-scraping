/* eslint-disable react/prop-types */
export default function DescInput({ children, ...props }) {
  return (
    <p className="desc-input" {...props}>
      {children}
    </p>
  );
}

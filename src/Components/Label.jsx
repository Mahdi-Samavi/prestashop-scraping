// eslint-disable-next-line react/prop-types
export default function Label({ children, ...props }) {
  return (
    <label className="block mb-2 text-sm font-medium text-gray-900" {...props}>
      {children}
    </label>
  );
}

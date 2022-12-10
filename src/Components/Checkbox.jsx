/* eslint-disable react/prop-types */
export default function Checkbox({ id, label, ...props }) {
  return (
    <div className="flex flex-row items-center">
      <input id={id} type="checkbox" className="checkbox-input" {...props} />
      <label htmlFor={id} className="ml-3 text-sm font-medium text-gray-900">
        {label}
      </label>
    </div>
  );
}

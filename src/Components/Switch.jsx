/* eslint-disable react/prop-types */
export default function Switch({ label, ...props }) {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" {...props} />
      <span className="mr-3 text-sm">{label}</span>
      <div className="relative w-11 h-6 bg-gray-200 rounded-full ring-gray-300 peer peer-focus:ring peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-400"></div>
    </label>
  );
}

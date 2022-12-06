/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
function Table({ header, children }) {
  return (
    <div className="overflow-x-auto shadow-sm rounded-xl ">
      <table className="w-full text-sm text-center whitespace-nowrap">
        <thead className="text-xs uppercase bg-slate-50">
          <tr>
            {header.map((item) => (
              <th key={item} scope="col" className="p-4">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

Table.Row = ({ children, className = "" }) => (
  <tr
    className={
      "bg-slate-50 border-b hover:bg-gray-300 hover:bg-opacity-30 " + className
    }
  >
    {children}
  </tr>
);

Table.Th = ({ children, className = "" }) => (
  <th
    scope="row"
    className={"px-4 py-3 font-medium text-gray-900 " + className}
  >
    {children}
  </th>
);

Table.Td = ({ children, className = "" }) => (
  <td className={"px-4 py-3 " + className}>{children}</td>
);

export default Table;

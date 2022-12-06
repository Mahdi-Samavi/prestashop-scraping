/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
function Button({ className, children, ...props }) {
  return (
    <button className={"btn " + className} {...props}>
      {children}
    </button>
  );
}

Button.Icon = ({ children }) => <div className="icon">{children}</div>;

export default Button;

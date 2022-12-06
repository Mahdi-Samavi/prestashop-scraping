// eslint-disable-next-line react/prop-types
export default function TextInput({ className = "", ...props }) {
  return <input className={"text-input " + className} {...props} />;
}

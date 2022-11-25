/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { Children } from "react";

function Card(props) {
  let _actions, _body;
  Children.forEach(props.children, (child) => {
    if (child.type == Card.Actions) _actions = child;
    if (child.type == Card.Body) _body = child;
  });

  return (
    <div className="bg-slate-100 rounded-xl">
      <div
        className={
          (_actions != undefined ? "flex justify-between items-center " : "") +
          "px-4 py-2 border-b text-sm"
        }
      >
        {props.title && <span>{props.title}</span>}

        {_actions}
      </div>

      {_body}
    </div>
  );
}

Card.Actions = ({ children }) => children;

Card.Body = ({ children }) => <div className="px-4 py-6">{children}</div>;

export default Card;

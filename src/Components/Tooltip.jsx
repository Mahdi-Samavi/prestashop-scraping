/* eslint-disable react/prop-types */
import ReactTooltip from "react-tooltip";

export default function Tooltip({ place, type, effect, ...props }) {
  return (
    <ReactTooltip
      className="tooltip"
      place={place ? place : "top"}
      type={type ? type : "light"}
      effect={effect ? effect : "solid"}
      {...props}
    />
  );
}

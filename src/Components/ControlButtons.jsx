import {
  UilMultiply,
  UilSquareShape,
  UilMinus,
} from "@iconscout/react-unicons";

export default function ControlButtons() {
  const handleControl = (name) => window.electron.send(name + "-app");

  return (
    <div>
      <button
        className="window-control-button"
        onClick={() => handleControl("minimize")}
      >
        <UilMinus size="14" />
      </button>

      <button
        className="window-control-button"
        onClick={() => handleControl("maximize")}
      >
        <UilSquareShape size="14" />
      </button>

      <button
        className="window-control-button"
        onClick={() => handleControl("close")}
      >
        <UilMultiply size="14" />
      </button>
    </div>
  );
}

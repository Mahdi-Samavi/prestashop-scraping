import { Navigation, Link } from "../Components";
import { UilSetting, UilInfoCircle } from "@iconscout/react-unicons";

export default function Sidebar() {
  const handleAbout = () => {
    window.electron.send("about:open");
  };
  return (
    <div className="flex flex-col justify-between w-3/12 min-w-[215px] max-w-[285px] bg-slate-100 border-r px-8 py-6">
      <div>
        <Navigation />
      </div>
      <div className="flex flex-col gap-y-2">
        <Link to="/settings">
          <UilSetting size={22} />
          Settings
        </Link>

        <button
          className="flex items-center px-4 py-2 text-sm transition bg-gray-200 gap-x-3 rounded-xl bg-opacity-30 hover:bg-gray-300 focus:bg-gray-300"
          onClick={handleAbout}
        >
          <UilInfoCircle size={22} />
          About
        </button>
      </div>
    </div>
  );
}

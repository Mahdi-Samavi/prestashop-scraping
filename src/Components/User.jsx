import { UilUser } from "@iconscout/react-unicons";

export default function User() {
  return (
    <button className="flex items-center gap-2 user-nav">
      <i className="p-[6px] transition rounded-full">
        <UilUser size={20} />
      </i>
      <span className="text-sm">Mahdi</span>
    </button>
  );
}

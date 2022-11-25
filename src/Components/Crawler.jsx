import { UilBug } from "@iconscout/react-unicons";
import { Link } from ".";

export default function Crawler() {
  return (
    <Link
      to="/toggle-crawler"
      className="flex justify-center items-center w-[32px] m-[3px] transition rounded-full hover:bg-gray-300 focus:bg-gray-300"
    >
      <UilBug size={20} />
    </Link>
  );
}

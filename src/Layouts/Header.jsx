import { ControlButtons, Crawler, User, Logo } from "../Components";

export default function Header() {
  return (
    <header>
      <div className="flex gap-4">
        <Crawler />
        <User />
        <ControlButtons />
      </div>

      <div className="flex items-center">
        <Logo />
      </div>
    </header>
  );
}

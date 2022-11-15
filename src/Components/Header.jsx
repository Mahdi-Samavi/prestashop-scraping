import { ControlButtons, User, Logo } from ".";

export default function Header() {
  return (
    <header>
      <div className="flex gap-4">
        <User />
        <ControlButtons />
      </div>

      <div className="flex items-center">
        <Logo />
      </div>
    </header>
  );
}

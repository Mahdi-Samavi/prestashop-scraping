import { HashRouter as Router } from "react-router-dom";
import { Header, Routes, Sidebar } from "./Layouts";

export default function App() {
  return (
    <Router>
      <Header />

      <div className="flex flex-grow overflow-hidden">
        <Sidebar />

        <div className="flex-1 p-8 overflow-x-hidden">
          <Routes />
        </div>
      </div>
    </Router>
  );
}

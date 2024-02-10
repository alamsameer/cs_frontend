import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

const Page: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const toggleNav = () => setIsNavOpen(!isNavOpen);
  return (
    <div className="page-container relative flex w-full min-h-full border-2 border-gray-950 h-screen">
      <Sidebar toggleNav={toggleNav} isNavOpen={isNavOpen} />
      <div className="content-container flex-1">
        {/*  for home route there will be / --> dashboard  */}
        {/* topbar */}
        <Topbar toggleNav={toggleNav} />
        <Outlet />
      </div>
    </div>
  );
};

export default Page;

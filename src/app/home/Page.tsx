import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

const Page: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const toggleNav = () => setIsNavOpen(!isNavOpen);
  return (
    <div className="page-container overflow-hidden relative flex w-full  h-screen">
      <Sidebar toggleNav={toggleNav} isNavOpen={isNavOpen} />
      <div className="content-container h-full flex-1">
        {/*  for home route there will be / --> dashboard  */}
        {/* topbar */}
        <Topbar toggleNav={toggleNav} />
        <div className="h-[90%] overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Page;

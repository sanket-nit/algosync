import { Outlet } from "react-router-dom";
import Navbar from "../../components/shared/Navbar";
import { Toaster } from "../../components/ui/toaster";

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Toaster />
      <main className="h-full w-full px-6 pt-28">
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;

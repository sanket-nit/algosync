import useAuth from "@/hooks/useAuth";
import useLogout from "@/hooks/useLogout";
import useScrollTop from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { ModelToggle } from "../ui/model-toggle";

const Navbar = () => {
  const scrolled = useScrollTop();
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();
  const logout = useLogout();

  const isSigninPage = location.pathname === "/signin";

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className={cn("z-50 bg-background fixed top-0 flex items-center justify-between w-full p-6", scrolled && "bg-bottom shadow-sm")}>
      <span className="font-bold cursor-pointer" onClick={() => navigate(auth?.accessToken ? '/home' : '/')}>
        AlgoSync
      </span>
      <div className="flex space-x-2 items-center justify-center">
        {auth?.accessToken ? (
          <Button variant={"destructive"} onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button variant={"default"} onClick={() => (isSigninPage ? navigate("/signup") : navigate("signin"))}>
            {isSigninPage ? "Sign up" : "Sign in"}
          </Button>
        )}

        <ModelToggle />
      </div>
    </nav>
  );
};

export default Navbar;

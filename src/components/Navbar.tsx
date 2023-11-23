import useScrollTop from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { ModelToggle } from "./ui/model-toggle";

const Navbar = () => {
  const scrolled = useScrollTop();
  const navigate = useNavigate();

  return (
    <nav className={cn("z-50 bg-background fixed top-0 flex items-center justify-between w-full p-6", scrolled && "bg-bottom shadow-sm")}>
      <span className="font-bold cursor-pointer" onClick={() => navigate("/")}>
        AlgoSync
      </span>
        <ModelToggle />
    </nav>
  );
};

export default Navbar;

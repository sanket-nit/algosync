import useRefresh from "@/hooks/useRefresh";
import { useEffect } from "react";

const Home = () => {
  const refresh = useRefresh();

  const logRefresh = async () => {
    // const s = await refresh();

    await refresh()
  }

  useEffect(() => {
    logRefresh();
  }, [])

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;

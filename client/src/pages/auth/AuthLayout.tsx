import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;
  return (
    <>
      {isAuthenticated ? (
        <Navigate to={"/"} />
      ) : (
        <section className="flex justify-center items-center min-h-full">
          <Outlet />
        </section>
      )}
    </>
  );
};

export default AuthLayout;

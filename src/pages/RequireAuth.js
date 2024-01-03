import React from "react";
import { useCookies } from "react-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth() {
  const [cookies, setCookie] = useCookies(["token"]);
  const auth = cookies.token;
  console.log({ auth: auth });
  const location = useLocation();
  return auth ? (
    <Outlet />
  ) : (
    // <Navigate to="/login" state={{ from: location }} replace />
    <Navigate to="/" />
  );
}

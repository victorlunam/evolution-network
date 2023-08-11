import { useAuth } from "@store/index";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

type PrivateRoutesProps = {
  children: ReactNode;
};

const PrivateRoute = ({ children }: PrivateRoutesProps) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location.pathname,
        }}
        replace
      />
    );
  }

  return children;
};

export default PrivateRoute;

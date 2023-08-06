import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  isAllowed: boolean;
  children: JSX.Element;
  redirectPath: string;
};

export default function ProtectedRoute(
  props: ProtectedRouteProps
): JSX.Element {
  if (!props.isAllowed) {
    return <Navigate to={props.redirectPath} replace />;
  }

  return props.children;
}

import { useAtomValue } from "jotai";
import { isAuthAtom } from "../app/atoms";
import { Navigate, useParams } from "react-router-dom";
import ResetPassword from "../components/ResetPassword";
import ForgotPassword from "../components/ForgotPassword";

export default function Password() {
  const { action } = useParams();

  if (useAtomValue(isAuthAtom)) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      {action == "forgot" && <ForgotPassword />}
      {action == "edit" && <ResetPassword />}
    </div>
  );
}

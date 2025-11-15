import { authOptions } from "./auth-options";
import { getServerSession as _getServerSession } from "next-auth";

export function getServerSession() {
  return _getServerSession(authOptions);
}

import { JwtPayload } from "jwt-decode";

export interface Token extends JwtPayload {
  role?: string
}

import { User } from "../../type/User";

export type AuthStateType = {
    user: User|null;
    token: string|null;
}
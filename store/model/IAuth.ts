import IUser from "./IUser";

export default interface IAuth {
  loggedIn: boolean,
  user: IUser | null,
}

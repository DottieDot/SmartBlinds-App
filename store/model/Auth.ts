import IUser from "./User";

export default interface Auth {
  loggedIn: boolean
  user: IUser | null
}

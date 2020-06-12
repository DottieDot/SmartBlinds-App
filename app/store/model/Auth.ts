import User from "./User";

export default interface Auth {
  loggedIn :boolean
  user     :User | null
}

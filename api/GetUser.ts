import OAuth2 from "../util/OAuth2"
import { IUser } from "../store/model"


export default async (): Promise<IUser | null> => {
  try {
    const { user } = await OAuth2.Request('/api/user').then(res => res.json())

    return user
  }
  catch (e) {
    console.log(e)
    return null
  }
}

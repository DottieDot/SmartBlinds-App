import OAuth2 from "../util/OAuth2"
import { User } from "../store/model"


export default async (): Promise<User | null> => {
  try {
    const { user } = await OAuth2.Request('/api/user').then(res => res.json())

    return user || null
  }
  catch (e) {
    console.log(e)
    return null
  }
}

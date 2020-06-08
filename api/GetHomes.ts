import OAuth2 from "../util/OAuth2"
import { User, Home } from "../store/model"


export default async (): Promise<Home[] | null> => {
  try {
    const { data } = await OAuth2.Request('/api/homes').then(res => res.json())

    return data || null
  }
  catch (e) {
    return null
  }
}

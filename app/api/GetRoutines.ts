import OAuth2 from "../util/OAuth2"


export default async (): Promise<any[]|null> => {
  try {
    const { data } = await OAuth2.Request('/api/routines').then(res => res.json())

    return data ?? null
  }
  catch (e) {
    return null
  }
}

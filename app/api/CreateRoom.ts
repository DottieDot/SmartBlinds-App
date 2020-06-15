import OAuth2 from '../util/OAuth2'

export default async (name: string, homeId: number): Promise<number|null> => {
  try {
    const { id } = await OAuth2.Request(`/api/homes/${homeId}/rooms`, {
      body: JSON.stringify({ name: name }),
      method: 'post',
    }).then(res => res.json())

    return id ?? null
  }
  catch (e) {
    return null
  }
}

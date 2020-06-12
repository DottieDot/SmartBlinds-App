import OAuth2 from '../util/OAuth2'

export default async (name: string): Promise<number|null> => {
  try {
    const { id } = await OAuth2.Request('/api/create-home', {
      body: JSON.stringify({ name: name }),
      method: 'post',
    }).then(res => res.json())

    return id ?? null
  }
  catch (e) {
    return null
  }
}

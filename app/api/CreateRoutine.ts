import OAuth2 from '../util/OAuth2'

export default async (name: string): Promise<number|null> => {
  try {
    const { id } = await OAuth2.Request('/api/routines', {
      body: JSON.stringify({ name }),
      method: 'post',
    }).then(res => res.json())

    return id ?? null
  }
  catch (e) {
    return null
  }
}

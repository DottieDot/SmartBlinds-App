import OAuth2 from '../util/OAuth2'

export default async (name: string, email: string): Promise<boolean|null> => {
  try {
    const { success } = await OAuth2.Request(`/api/user/details`, {
      body: JSON.stringify({ name, email }),
      method: 'patch',
    }).then(res => res.json())

    return success ?? null
  }
  catch (e) {
    return null
  }
}

import OAuth2 from '../util/OAuth2'

export default async (password: string): Promise<boolean|null> => {
  try {
    const { success } = await OAuth2.Request(`/api/user/password`, {
      body: JSON.stringify({ password }),
      method: 'patch',
    }).then(res => res.json())

    return success ?? null
  }
  catch (e) {
    return null
  }
}

import OAuth2 from '../util/OAuth2'

export default async (home: number, name: string): Promise<boolean> => {
  try {
    const { success } = await OAuth2.Request(`/api/homes/${home}/name`, {
      body: JSON.stringify({ name }),
      method: 'patch',
    }).then(res => res.json())

    return success ?? false
  }
  catch (e) {
    return false
  }
}

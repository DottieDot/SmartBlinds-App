import OAuth2 from '../util/OAuth2'

export default async (home: number): Promise<boolean> => {
  try {
    const { success } = await OAuth2.Request(`/api/homes/${home}`, {
      method: 'delete',
    }).then(res => res.json())

    return success ?? false
  }
  catch (e) {
    return false
  }
}

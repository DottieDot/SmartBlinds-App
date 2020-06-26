import OAuth2 from '../util/OAuth2'

export default async (routine: number): Promise<boolean> => {
  try {
    const { success } = await OAuth2.Request(`/api/routines/${routine}`, {
      method: 'delete',
    }).then(res => res.json())

    return success ?? false
  }
  catch (e) {
    return false
  }
}

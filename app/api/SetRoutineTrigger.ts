import OAuth2 from '../util/OAuth2'

export default async (routine: number, trigger: string): Promise<boolean> => {
  try {
    const { success } = await OAuth2.Request(`/api/routines/${routine}/trigger`, {
      body: JSON.stringify({ trigger }),
      method: 'patch',
    }).then(res => res.json())

    return success ?? false
  }
  catch (e) {
    return false
  }
}

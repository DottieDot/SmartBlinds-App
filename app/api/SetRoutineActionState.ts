import OAuth2 from '../util/OAuth2'

export default async (action: number, state: number): Promise<boolean> => {
  try {
    const { success } = await OAuth2.Request(`/api/routines/actions/${action}/state`, {
      body: JSON.stringify({ state }),
      method: 'patch',
    }).then(res => res.json())

    return success ?? false
  }
  catch (e) {
    return false
  }
}

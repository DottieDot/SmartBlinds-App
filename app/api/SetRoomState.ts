import OAuth2 from '../util/OAuth2'

export default async (room: number, state: number): Promise<boolean> => {
  try {
    const { success } = await OAuth2.Request(`/api/rooms/${room}/state`, {
      body: JSON.stringify({ state }),
      method: 'patch',
    }).then(res => res.json())

    return success ?? false
  }
  catch (e) {
    return false
  }
}

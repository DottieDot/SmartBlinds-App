import OAuth2 from '../util/OAuth2'

export default async (room: number, name: string): Promise<boolean> => {
  try {
    const { success } = await OAuth2.Request(`/api/rooms/${room}/name`, {
      body: JSON.stringify({ name }),
      method: 'patch',
    }).then(res => res.json())

    return success ?? false
  }
  catch (e) {
    return false
  }
}

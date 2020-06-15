import OAuth2 from '../util/OAuth2'

export default async (roomId: number): Promise<boolean> => {
  try {
    const { success } = await OAuth2.Request(`/api/rooms/${roomId}`, {
      method: 'delete',
    }).then(res => res.json())

    return success ?? false
  }
  catch (e) {
    return false
  }
}

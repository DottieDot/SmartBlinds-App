import OAuth2 from '../util/OAuth2'

export default async (routine: number, room: number): Promise<number|null> => {
  try {
    const { id } = await OAuth2.Request(`/api/routines/${routine}/actions`, {
      body: JSON.stringify({ room_id: room }),
      method: 'post',
    }).then(res => res.json())

    return id ?? null
  }
  catch (e) {
    return null
  }
}

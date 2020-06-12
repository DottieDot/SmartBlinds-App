import { createContext, useContext, useState, useEffect } from 'react'
import { useTypedSelector } from '../../../store'
import { roomSelector } from '../../../store/selectors'
import { Room } from '../../../store/model'

const RoomContext = createContext<number>(0)

export const useRoomId = () => useContext(RoomContext)

export const useRoom = () => {
  const _room = useTypedSelector(roomSelector(useRoomId()))
  const [room, setRoom] = useState<Room>(_room)

  useEffect(() => {
    if (_room) {
      setRoom(_room)
    }
  }, [_room])

  return room
}

export const RoomContextProvier = RoomContext.Provider

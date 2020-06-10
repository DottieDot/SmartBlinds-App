import { createContext, useContext } from 'react'
import { useTypedSelector } from '../../../store'
import { roomSelector } from '../../../store/selectors'

const RoomContext = createContext<number>(0)

export const useRoomId = () => useContext(RoomContext)

export const useRoom = () => useTypedSelector(roomSelector(useRoomId()))

export const RoomContextProvier = RoomContext.Provider

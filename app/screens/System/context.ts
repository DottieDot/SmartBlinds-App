import { createContext, useContext } from 'react'
import { useTypedSelector } from '../../store'
import { systemSelector } from '../../store/selectors'

const SystemContext = createContext<number>(0)

export const useSystemId = () => useContext(SystemContext)

export const useSystem = () => useTypedSelector(systemSelector(useSystemId()))

export const SystemContextProvier = SystemContext.Provider

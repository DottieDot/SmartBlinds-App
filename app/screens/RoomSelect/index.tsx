import React from 'react'
import { useTypedSelector } from '../../store'
import { HomeList, Room } from '../../components'
import style from './style'
import { roomSelector } from '../../store/selectors'
import { useNavigation } from '@react-navigation/native'
import { useNavigationParams } from '../../util/Navigation'

const Item = ({ id }: { id: number }) => {
  const { name } = useTypedSelector(roomSelector(id))
  const { navigate } = useNavigation()
  const params = useNavigationParams()

  return (
    <Room
      name={name}
      icon="blank"
      style={style.room}
      onPress={() => {
        navigate(params?.returnRoute, { room: id  })
      }}
    />
  )
}

export default () => {
  const homes = useTypedSelector(state => state.homes)

  return (
    <HomeList
      homes={homes}
      style={style.list}
      renderItem={({ item }) => <Item id={item} />}
    />
  )
}

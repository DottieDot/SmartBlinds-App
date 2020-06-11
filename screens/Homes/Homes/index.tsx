import React from 'react'
import { Room, HomeList } from '../../../components'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTypedSelector, RootState } from '../../../store'
import { Switch } from 'react-native-paper'
import style from './style'
import { useNavigation } from '@react-navigation/native'
import { HomesStackNavigation } from '../params'
import { useDispatch } from 'react-redux'
import { setRoomState } from '../../../store/actions/rooms'

const Item = ({ id }: { id: number }) => {
  const dispatch = useDispatch()
  const { navigate } = useNavigation() as HomesStackNavigation
  const { name, state } = useTypedSelector((state: RootState) => state.rooms[id])

  return (
    <Room
      name={name}
      icon="blank"
      style={style.room}
      trailing={
        <Switch
          value={state < .95}
          onValueChange={(value) => dispatch(setRoomState(id, value ? 0 : 1))}
          style={{
            transform: [{
              rotate: '-90deg'
            }]
          }}
        />
      }
      onPress={() => {
        // Make app feel more responsive
        setTimeout(() => {
          navigate('room', {
            room: id,
          })
        }, 0)
      }}
    />
  )
}

export default () => {
  const homes = useTypedSelector(state => state.homes)

  return (
    <SafeAreaView>
      <HomeList
        homes={homes}
        style={style.list}
        renderItem={({ item }) => <Item id={item} />}
      />
    </SafeAreaView>
  )
}

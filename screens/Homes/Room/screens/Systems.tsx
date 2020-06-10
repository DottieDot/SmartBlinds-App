import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { useTypedSelector } from '../../../../store'
import { RoomScreenRouteProp, RoomScreenNavigationProp } from '../../params'
import System from '../../../../components/System'

const Item = ({ id }: { id: number }) => {
  const system = useTypedSelector(state => state.systems[id])

  return (
    <System name={system.name} style={{ marginBottom: 8 }} />
  )
}

interface Props {
  route: RoomScreenRouteProp
  navigation: RoomScreenNavigationProp
}

export default ({ route }: Props) => {
  const room = useTypedSelector(state => state.rooms[route.params.room])

  return (
    <FlatList
      style={{ margin: 16 }}
      data={room.systems}
      keyExtractor={id => id.toString()}
      renderItem={({ item }) => <Item id={item} />}
    />
  )
}

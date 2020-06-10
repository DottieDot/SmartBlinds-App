import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { useTypedSelector } from '../../../../store'
import System from '../../../../components/System'
import { useRoom } from '../context'

const Item = ({ id }: { id: number }) => {
  const system = useTypedSelector(state => state.systems[id])

  return (
    <System name={system.name} style={{ marginBottom: 8 }} />
  )
}

export default () => {
  const room = useRoom()

  return (
    <FlatList
      style={{ margin: 16 }}
      data={room.systems}
      keyExtractor={id => id.toString()}
      renderItem={({ item }) => <Item id={item} />}
    />
  )
}

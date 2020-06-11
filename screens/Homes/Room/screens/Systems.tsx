import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { useTypedSelector } from '../../../../store'
import System from '../../../../components/System'
import { useRoom } from '../context'
import systemSelector from '../../../../store/selectors/systemSelector'
import { useNavigation } from '@react-navigation/native'
import { SystemStackNavigation } from '../../../System/params'

const Item = ({ id }: { id: number }) => {
  const { navigate } = useNavigation() as SystemStackNavigation
  const system = useTypedSelector(systemSelector(id))

  return (
    <System 
      name={system.name} 
      style={{ marginBottom: 8 }} 
      onPress={() => navigate('system', { system: id })}
    />
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

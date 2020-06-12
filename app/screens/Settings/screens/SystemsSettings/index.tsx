import React from 'react'
import { useTypedSelector } from '../../../../store'
import { FlatList } from 'react-native-gesture-handler'
import { List, Divider } from 'react-native-paper'
import { System } from '../../../../store/model'

const Item = React.memo(({ system }: { system: System }) => {
  return (
    <React.Fragment>
      <List.Item
        title={system.name}
      />
      <Divider />
    </React.Fragment>
  )
})

export default () => {
  const systems = useTypedSelector(store => Object.values(store.systems).filter(item => item.room_id === null))

  return (
    <FlatList
      data={systems}
      keyExtractor={({ id }) => id.toString()}
      renderItem={({ item }) => <Item system={item} />}
    />
  )
}

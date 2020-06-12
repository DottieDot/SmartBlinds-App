import React from 'react'
import { useTypedSelector } from '../../../../store'
import { FlatList } from 'react-native-gesture-handler'
import { List, Divider, Paragraph } from 'react-native-paper'
import { System } from '../../../../store/model'
import { useNavigation } from '@react-navigation/native'

const Item = React.memo(({ system }: { system: System }) => {
  const { navigate } = useNavigation()

  return (
    <React.Fragment>
      <List.Item
        title={system.name}
        onPress={() => navigate('system', {
          system: system.id,
        })}
      />
      <Divider />
    </React.Fragment>
  )
})

export default () => {
  const systems = useTypedSelector(store => Object.values(store.systems).filter(item => item.room_id === null))

  return (
    <React.Fragment>
      {!!systems.length ? (<FlatList
        data={systems}
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item }) => <Item system={item} />}
      />) : (
        <Paragraph style={{ padding: 16, textAlign: 'center' }}>No unlinked systems.</Paragraph>
      )}
    </React.Fragment>
  )
}

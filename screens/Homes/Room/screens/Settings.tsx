import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { TextInput, FAB } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { setRoomName } from '../../../../store/actions/rooms'
import { useRoom } from '../context'

export default () => {
  const dispatch = useDispatch()
  const room = useRoom()
  const [name, setName] = useState(room.name)

  return (
    <View style={styles.root}>
      <TextInput
        textContentType="nickname"
        label="Name"
        value={name}
        onChangeText={setName}
      />
      <FAB
        style={styles.fab}
        visible={name !== room.name && name.length != 0}
        icon="check"
        onPress={() => dispatch(setRoomName(room.id, name))}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    margin: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})

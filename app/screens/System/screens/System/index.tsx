import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { List, FAB, Divider, Surface } from 'react-native-paper'
import { useTypedSelector } from '../../../../store'
import { roomSelector, homeSelector } from '../../../../store/selectors'
import styles from './styles'
import { useSystem } from '../../context'
import { useNavigation } from '@react-navigation/native'
import { setSystemRoom, setSystemName } from '../../../../store/actions/systems'
import { useDispatch } from 'react-redux'
import { TextInput } from '../../../../components'
import { useTheme } from 'react-native-paper/src/core/theming'

const RoomPicker = ({ roomId }: { roomId: number }) => {
  const room = useTypedSelector(roomSelector(roomId))
  const home = useTypedSelector(homeSelector(room.home_id))
  const { navigate } = useNavigation()
  const theme = useTheme()

  return (
    <Surface style={{ borderRadius: theme.roundness, elevation: 4 }}>
      <List.Item 
        title="Room"
        description={home ? `${home.name}: ${room.name}` : undefined}
        onPress={() => navigate('room_select', { returnRoute: 'system' })}
      />
    </Surface>
  )
}

export default ({ route }: { route: any }) => {
  const dispatch = useDispatch()
  const system = useSystem()
  const room = useTypedSelector(roomSelector(system.room_id ?? -1))
  const [newName, setNewName] = useState(system.name)
  const [newRoom, setNewRoom] = useState(room.id)

  useEffect(() => {
    if (route.params?.room) {
      setNewRoom(route.params.room)
    }
  }, [route.params?.room])

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.contentContainer}>
      <TextInput
        type="nickname"
        label="Name"
        value={newName}
        onChangeText={setNewName}
        style={styles.textInput}
      />
      <RoomPicker
        roomId={newRoom}
      />
      <FAB
        icon="check"
        visible={(newRoom !== room.id) || (newName !== system.name)}
        style={styles.fab}
        onPress={() => {
          if (newRoom !== room.id) {
            dispatch(setSystemRoom(system.id, newRoom))
          }
          if (newName !== system.name) {
            dispatch(setSystemName(system.id, newName))
          }
        }}
      />
    </ScrollView>
  )
}

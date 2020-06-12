import React, { useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { List } from 'react-native-paper'
import { useTypedSelector } from '../../../../store'
import { roomSelector, homeSelector } from '../../../../store/selectors'
import styles from './styles'
import { useSystem } from '../../context'
import { useNavigation } from '@react-navigation/native'
import { setSystemRoom } from '../../../../store/actions/systems'
import { useDispatch } from 'react-redux'

export default ({ route }: { route: any }) => {
  const dispatch = useDispatch()
  const system = useSystem()
  const room = useTypedSelector(roomSelector(system.room_id))
  const home = useTypedSelector(homeSelector(room.home_id))
  const { navigate, goBack } = useNavigation()

  useEffect(() => {
    if (route.params?.room) {
      dispatch(setSystemRoom(system.id, route.params.room))
      goBack()
    }
  }, [route.params?.room])

  return (
    <ScrollView style={styles.root}>
      <List.Item 
        title="Room"
        description={`${home.name}: ${room.name}`}
        style={styles.listItem}
        onPress={() => navigate('room_select', { returnRoute: 'system' })}
      />
    </ScrollView>
  )
}

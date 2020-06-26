import React, { useState } from 'react'
import { Room, HomeList } from '../../../components'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTypedSelector } from '../../../store'
import { Switch, FAB, Portal } from 'react-native-paper'
import style from './style'
import { useNavigation } from '@react-navigation/native'
import { HomesStackNavigation } from '../params'
import { useDispatch } from 'react-redux'
import { setRoomState, createRoom } from '../../../store/actions/rooms'
import * as Dialogs from './dialogs'
import { roomSelector } from '../../../store/selectors'
import { addHome } from '../../../store/actions/homes'

const Item = ({ id }: { id: number }) => {
  const dispatch = useDispatch()
  const { navigate } = useNavigation() as HomesStackNavigation
  const { name, state } = useTypedSelector(roomSelector(id)) ?? {}

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
        navigate('room', {
          room: id,
        })
      }}
    />
  )
}

export default () => {
  const homes = useTypedSelector(state => state.homes)
  const dispatch = useDispatch()
  const [fabState, setFabState] = useState(false)
  const [newHome, setNewHome] = useState(false)
  const [newRoom, setNewRoom] = useState(false)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomeList
        homes={homes}
        style={style.list}
        renderItem={({ item }) => <Item id={item} />}
      />
      <FAB.Group
        visible={true}
        open={fabState}
        style={style.fab}
        icon={fabState ? 'close' : 'plus'}
        onStateChange={({open}) => setFabState(open)}
        actions={[
          { icon: 'home',      label: 'New Home', onPress: () => { setNewHome(true) } },
          { icon: 'bed-empty', label: 'New Room', onPress: () => { setNewRoom(true) } },
        ]}
      />
      <Portal>
        <Dialogs.NewHome 
          visible={newHome}
          onDismiss={() => setNewHome(false)}
          onCancel={() => setNewHome(false)}
          onConfirm={(name) => {
            dispatch(addHome(name))
            setNewHome(false)
          }}
        />
        <Dialogs.NewRoom 
          visible={newRoom}
          onDismiss={() => setNewRoom(false)}
          onConfirm={(name, home) => {
            dispatch(createRoom(name, home))
            setNewRoom(false)
          }}
        />
      </Portal>
    </SafeAreaView>
  )
}

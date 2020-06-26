import React, { useState, useEffect, useRef } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { useTypedSelector } from '../../../../store'
import { routineSelector, routineActionSelector, roomSelector } from '../../../../store/selectors'
import { Room, TextInput, DayPicker } from '../../../../components'
import { List, Subheading, FAB, Portal } from 'react-native-paper'
import { View, Keyboard } from 'react-native'
import style from './style'
import { useDispatch } from 'react-redux'
import { setRoutineName, setRoutineTrigger, setRoutineDays, addRoutineAction } from '../../../../store/actions/routines'
import DateTimePicker from '@react-native-community/datetimepicker'
import { RoutineScreenRouteProp } from '../../params'
import { useNavigation } from '@react-navigation/native'

export { default as Header } from './header'

const Item = ({ actionId }: { actionId: number }) => {
  const { action, room } = useTypedSelector(state => {
    const action = routineActionSelector(actionId)(state)
    return {
      action,
      room: roomSelector(action.room_id)(state)
    }
  })
  
  return (
    <Room
      name={room.name}
      icon="blank"
      style={style.room}
      trailing={(
        <Subheading style={style.roomState}>
          {action.state * 100}%
        </Subheading>
      )}
    />
  )
}

const Content = ({ routineId }: { routineId: number }) => {
  const routine = useTypedSelector(routineSelector(routineId)) ?? {}
  const dispatch = useDispatch()
  const [origName, setOrigName] = useState(routine.name)
  const [datePicker, setDatePicker] = useState(false)
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    if (routine.trigger_at) {
      const tmp = new Date()
      // @ts-ignore
      date.setHours(...routine.trigger_at.split(':'))
      setDate(date)
    }
  }, [routine.trigger_at])

  return (
    <View>
      <TextInput
        mode="outlined"
        label="Routine name"
        style={style.textInput}
        value={routine.name}
        onChangeText={(text) => {
          dispatch(setRoutineName(routine.id, text, false))
        }}
        onBlur={() => {
          if (routine.name === '') {
            dispatch(setRoutineName(routine.id, origName, false))
          }
          else if (origName !== routine.name) {
            dispatch(setRoutineName(routine.id, routine.name, true, origName))
            setOrigName(routine.name)
          }
        }}
        error={!routine.name}
        withHelperText={false}
      />
      <TextInput
        mode="outlined"
        label="Time"
        style={style.textInput}
        value={routine.trigger_at}
        withHelperText={false}
        onFocus={() => {
          Keyboard.dismiss()
          setDatePicker(true)
        }}
      />
      <List.Subheader>Days</List.Subheader>
      <DayPicker
        value={routine.days}
        onValueChange={(days) => dispatch(setRoutineDays(routine.id, days))}
      />
      <List.Subheader>Rooms</List.Subheader>
      {datePicker && <DateTimePicker
        value={date}
        mode="time"
        display="default"
        onChange={(e, date) => {
          setDatePicker(false)
          if (e.type === 'set' && date) {
            dispatch(setRoutineTrigger(routine.id, date.toTimeString().split(' ')[0]))
          }
        }}
      />}
    </View>
  )
}

interface Props {
  route: RoutineScreenRouteProp
}

export default ({ route }: Props) => {
  const actions = useTypedSelector(state => routineSelector(route.params.routine)(state)?.actions)
  const { navigate } = useNavigation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (route.params.room) {
      dispatch(addRoutineAction(route.params.routine, route.params.room))
    }
  }, [route.params.room])

  return (
    <View style={style.root}>
      <FlatList
        data={actions ?? []}
        keyExtractor={(item) => item.toString()}
        contentContainerStyle={style.listStyle}
        ListHeaderComponent={() => <Content routineId={route.params.routine} />}
        renderItem={({ item }) => <Item actionId={item} />}
      />
      <FAB
        style={style.fab}
        visible={true}
        icon="plus"
        onPress={() => navigate('room_select', { returnRoute: 'routine' })}
      />
    </View>
  )
}

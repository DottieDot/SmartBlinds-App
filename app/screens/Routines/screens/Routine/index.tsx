import React, { useState, useEffect } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { RoutineScreenRouteProp } from '../../params'
import { useTypedSelector } from '../../../../store'
import { routineSelector, routineActionSelector, roomSelector } from '../../../../store/selectors'
import { Room, TextInput, DayPicker } from '../../../../components'
import { List, Subheading } from 'react-native-paper'
import { View } from 'react-native'
import style from './style'
import { useDispatch } from 'react-redux'
import { setRoutineName, setRoutineTrigger, setRoutineDays } from '../../../../store/actions/routines'

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
  const [triggetAt, setTriggerAt] = useState(routine.trigger_at)

  useEffect(() => {
    if (routine.trigger_at !== triggetAt) {
      setTriggerAt(routine.trigger_at)
    }
  }, [routine])

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
      />
      <TextInput
        mode="outlined"
        label="Time"
        style={style.textInput}
        value={routine.trigger_at}
        onChangeText={(text) => {
          setTriggerAt(text)
        }}
        onBlur={() => {
          dispatch(setRoutineTrigger(routine.id, triggetAt))
        }}
      />
      <List.Subheader>Days</List.Subheader>
      <DayPicker
        value={routine.days}
        onValueChange={(days) => dispatch(setRoutineDays(routine.id, days))}
      />
      <List.Subheader>Rooms</List.Subheader>
    </View>
  )
}

interface Props {
  route: RoutineScreenRouteProp
}

export default ({ route }: Props) => {
  const actions = useTypedSelector(state => routineSelector(route.params.routine)(state)?.actions)

  return (
    <FlatList
      data={actions ?? []}
      keyExtractor={(item) => item.toString()}
      contentContainerStyle={style.listStyle}
      ListHeaderComponent={() => <Content routineId={route.params.routine} />}
      renderItem={({ item }) => <Item actionId={item} />}
    />
  )
}

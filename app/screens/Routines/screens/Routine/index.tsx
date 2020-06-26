import React, { useState, useEffect } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { RoutineScreenRouteProp } from '../../params'
import { useTypedSelector } from '../../../../store'
import { routineSelector, routineActionSelector, roomSelector } from '../../../../store/selectors'
import { Room, TextInput } from '../../../../components'
import { Text, List, Subheading } from 'react-native-paper'
import { View } from 'react-native'
import style from './style'
import { Formik } from 'formik'
import { Routine } from '../../../../store/model'

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
  const routine = useTypedSelector(routineSelector(routineId))

  return (
    <View>
      <TextInput
        mode="outlined"
        label="Routine name"
        style={style.textInput}
        value={routine.name}
        onChangeText={() => {
          
        }}
      />
      <TextInput
        mode="outlined"
        label="Time"
        style={style.textInput}
      />
      <List.Subheader>Days</List.Subheader>
      <List.Subheader>Rooms</List.Subheader>
    </View>
  )
}

interface Props {
  route: RoutineScreenRouteProp
}

export default ({ route }: Props) => {
  const actions = useTypedSelector(state => routineSelector(route.params.routine)(state).actions)

  return (
    <FlatList
      data={actions}
      keyExtractor={(item) => item.toString()}
      contentContainerStyle={style.listStyle}
      ListHeaderComponent={() => <Content routineId={route.params.routine} />}
      renderItem={({ item }) => <Item actionId={item} />}
    />
  )
}

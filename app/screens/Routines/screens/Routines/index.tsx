import React, { useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { useTypedSelector } from '../../../../store'
import { routineSelector } from '../../../../store/selectors'
import { Routine } from '../../../../components'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { RoutinesStackNavigation } from '../../params'
import { FAB, Portal, Dialog } from 'react-native-paper'
import NewRoutineDialog from './NewRoutineDialog'
import { useDispatch } from 'react-redux'
import { addRoutine } from '../../../../store/actions/routines'

const Item = React.memo(({ routineId }: { routineId: number }) => {
  const routine = useTypedSelector(routineSelector(routineId))
  const { navigate } = useNavigation() as RoutinesStackNavigation

  return (
    <Routine
      name={routine.name}
      icon="blank"
      style={{ marginBottom: 8 }}
      onPress={() => {
        navigate('routine', {
          routine: routineId,
        })
      }}
    />
  )
})

export default () => {
  const routines = useTypedSelector(state => state.routines)
  const [dialog, setDialog] = useState(false)
  const dispatch = useDispatch()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={Object.values(routines)}
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item }) => <Item routineId={item.id} />}
        contentContainerStyle={{ padding: 16 }}
      />
      <FAB
        style={{ position: 'absolute', right: 16, bottom: 16 }}
        visible={true}
        icon="plus"
        onPress={() => {
          setDialog(true)
        }}
      />
      <Portal>
        <NewRoutineDialog
          visible={dialog}
          onCancel={() => { 
            setDialog(false)
          }}
          onCreate={(name) => {
            setDialog(false)
            dispatch(addRoutine(name))
          }}
        />
      </Portal>
    </SafeAreaView>
  )
}

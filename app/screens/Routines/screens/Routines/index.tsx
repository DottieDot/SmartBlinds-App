import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { useTypedSelector } from '../../../../store'
import { routineSelector } from '../../../../store/selectors'
import { Routine } from '../../../../components'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { RoutinesStackNavigation } from '../../params'

const Item = React.memo(({ routineId }: { routineId: number }) => {
  const routine = useTypedSelector(routineSelector(routineId))
  const { navigate } = useNavigation() as RoutinesStackNavigation

  return (
    <Routine
      name={routine.name}
      icon="blank"
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

  return (
    <SafeAreaView>
      <FlatList
        data={Object.values(routines)}
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item }) => <Item routineId={item.id} />}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeAreaView>
  )
}

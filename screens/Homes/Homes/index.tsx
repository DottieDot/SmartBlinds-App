import React, { useState, ReactNode, useEffect } from 'react'
import { Room } from '../../../components'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTypedSelector, RootState } from '../../../store'
import { Switch, Caption } from 'react-native-paper'
import { SectionList, SectionListData } from 'react-native'
import style from './style'
import { useNavigation } from '@react-navigation/native'
import { HomesStackNavigation } from '../params'
import { useDispatch } from 'react-redux'
import { setRoomState } from '../../../store/actions/rooms'

const Item = ({ id }: { id: number }) => {
  const dispatch = useDispatch()
  const { navigate } = useNavigation() as HomesStackNavigation
  const { name, state } = useTypedSelector((state: RootState) => state.rooms[id])

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
        // Make app feel more responsive
        setTimeout(() => {
          navigate('room', {
            room: id,
          })
        }, 0)
      }}
    />
  )
}

export default () => {
  const homes = useTypedSelector(state => state.homes)
  const [sections, setSections] = useState<SectionListData<number>[]>([])

  useEffect(() => {
    setSections(Object.values(homes).map((dat) => ({
      title: dat.name,
      id: dat.id,
      data: dat.rooms,
    })))
  }, [homes])

  return (
    <SafeAreaView>
      <SectionList
        style={style.list}
        sections={sections}
        keyExtractor={(id) => id}
        renderItem={({ item }) => <Item id={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Caption style={style.roomTitle}>
            {title}
          </Caption>
        )}
      />
    </SafeAreaView>
  )
}

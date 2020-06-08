import React, { useState, ReactNode, useEffect } from 'react'
import { Room } from '../../../components'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTypedSelector } from '../../../store'
import { FlatList } from 'react-native-gesture-handler'
import { Switch, Text } from 'react-native-paper'
import { SectionList, SectionListData } from 'react-native'
import * as model from '../../../store/model'
import style from './style'
import { useNavigation } from '@react-navigation/native'

export default () => {
  const homes = useTypedSelector(state => state.homes)
  const [sections, setSections] = useState<SectionListData<model.Room>[]>([])
  const { navigate } = useNavigation()

  useEffect(() => {
    setSections(homes.map((dat) => ({
      title: dat.name,
      data: dat.rooms,
    })))
  }, [homes])

  return (
    <SafeAreaView>
      <SectionList
        style={style.list}
        sections={sections}
        keyExtractor={({ id }) => id}
        renderItem={({ item: { id, name, state } }) => (
          <Room
            name={name}
            icon="blank"
            style={style.room}
            trailing={
              <Switch  
                value={state < .95}
              />
            }
            onPress={() => {
              navigate('room', {
                id: id
              })
            }}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={style.roomTitle}>
            {title}
          </Text>
        )}
      />
    </SafeAreaView>
  )
}

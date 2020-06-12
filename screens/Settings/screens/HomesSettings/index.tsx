import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { useTypedSelector } from '../../../../store'
import { Home } from '../../../../store/model'
import { homeSelector } from '../../../../store/selectors'
import { List, Divider } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const Item = ({ id }: { id: number }) => {
  const { navigate } = useNavigation()
  const home = useTypedSelector(homeSelector(id))
  
  return (
    <List.Item
      title={home.name} 
      onPress={() => {
        navigate('home', {
          home: id
        })
      }}
    />
  )
}

export default () => {
  const homes = useTypedSelector(state => Object.values(state.homes))

  return (
    <FlatList
      data={homes}
      keyExtractor={({ id }: Home) => id.toString()}
      renderItem={({ item: { id }, index }) => (
        <React.Fragment>
          <Item id={id} />
          {((index + 1) < homes.length) && <Divider />}
        </React.Fragment>
      )}
    />
  )
}

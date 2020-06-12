import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import licenses from '../../../../assets/licenses.json'
import { List, Divider } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { ListRenderItemInfo } from 'react-native'

const Item = React.memo(({ item, index }: ListRenderItemInfo<typeof licenses[0]>) => {
  const { navigate } = useNavigation()

  return (
    <React.Fragment>
      <List.Item
        title={item.name}
        description={`Version: ${item.version}`}
        onPress={item.license_file ? () => {
          navigate('license', {
            data: item,
          })
        } : undefined}
      />
      {((index + 1) < licenses.length) && <Divider />}
    </React.Fragment>
  )
})

export default React.memo(() => {
  return (
    <FlatList
      data={licenses}
      keyExtractor={({ name, version }) => `${name}@${version}`}
      renderItem={props => <Item {...props} />}
    />
  )
})

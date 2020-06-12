import React, { useState } from 'react'
import { useTypedSelector } from '../../store'
import { homeSelector } from '../../store/selectors'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, Appbar, Dialog, Portal, Paragraph, TextInput, FAB } from 'react-native-paper'
import { AppbarHeader } from '../../components'
import { StackHeaderProps } from '@react-navigation/stack'
import { useNavigationParams } from '../../util/Navigation'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { removeHome, setHomeName } from '../../store/actions/homes'
import style from './style'

export const Header = ({ navigation, scene: { descriptor: { options } } }: StackHeaderProps) => {
  const params = useNavigationParams()
  const home = useTypedSelector(homeSelector(params?.home))
  const [deleteDialog, setDeleteDialog] = useState(false)
  const { goBack } = useNavigation()
  const dispatch = useDispatch()

  return (
    <React.Fragment>
      <AppbarHeader style={options.headerStyle}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={home?.name} />
        <Appbar.Action 
          icon="delete" 
          onPress={() => setDeleteDialog(true)}
        />
      </AppbarHeader>
      <Portal>
        <Dialog 
          visible={deleteDialog && !!home} 
          onDismiss={() => setDeleteDialog(false)}
        >
          <Dialog.Title>Delete Home?</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{home?.name} and its rooms will be permanently deleted. This action can not be undone.</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDeleteDialog(false)}>Cancel</Button>
            <Button 
              onPress={() => {
                dispatch(removeHome(home?.id))
                setDeleteDialog(false)
                goBack()
              }}
            >
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </React.Fragment>
  )
}

export default ({ route }: any) => {
  const home = useTypedSelector(homeSelector(route.params.home))
  const dispatch = useDispatch()
  const [name, setName] = useState(home?.name)

  return (
    <ScrollView contentContainerStyle={style.root}>
      <TextInput
        textContentType="nickname"
        label="Name"
        value={name}
        onChangeText={setName}
        style={style.input}
      />
      <FAB
        style={style.fab}
        visible={name !== home?.name && name.length != 0}
        icon="check"
        onPress={() => dispatch(setHomeName(home.id, name))}
      />
    </ScrollView>
  )
}

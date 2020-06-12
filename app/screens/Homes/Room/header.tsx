import React, { useState } from 'react'
import { StackHeaderProps } from '@react-navigation/stack'
import { useNavigationParams } from '../../../util/Navigation'
import { useTypedSelector } from '../../../store'
import { homeSelector, roomSelector } from '../../../store/selectors'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { AppbarHeader } from '../../../components'
import { Appbar, Portal, Dialog, Paragraph, Button } from 'react-native-paper'
import { removeHome } from '../../../store/actions/homes'
import { removeRoom } from '../../../store/actions/rooms'

export default ({ navigation, scene: { descriptor: { options } } }: StackHeaderProps) => {
  const params = useNavigationParams()
  const room = useTypedSelector(roomSelector(params?.room))
  const [deleteDialog, setDeleteDialog] = useState(false)
  const { goBack } = useNavigation()
  const dispatch = useDispatch()

  return (
    <React.Fragment>
      <AppbarHeader style={options.headerStyle}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={room?.name} />
        <Appbar.Action 
          icon="delete" 
          onPress={() => setDeleteDialog(true)}
        />
      </AppbarHeader>
      <Portal>
        <Dialog 
          visible={deleteDialog && !!room} 
          onDismiss={() => setDeleteDialog(false)}
        >
          <Dialog.Title>Delete Room?</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{room?.name} will be permanently deleted. This action can not be undone.</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDeleteDialog(false)}>Cancel</Button>
            <Button 
              onPress={() => {
                goBack()
                setDeleteDialog(false)
                dispatch(removeRoom(room?.id))
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

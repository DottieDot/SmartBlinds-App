import React, { useState } from 'react'
import { StackHeaderProps } from '@react-navigation/stack'
import { useNavigationParams } from '../../../../util/Navigation'
import { useTypedSelector } from '../../../../store'
import { routineSelector } from '../../../../store/selectors'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { Appbar, Portal, Dialog, Paragraph, Button } from 'react-native-paper'
import { AppbarHeader } from '../../../../components'
import { removeRoutine } from '../../../../store/actions/routines'

export default ({ navigation, scene: { descriptor: { options } } }: StackHeaderProps) => {
  const params = useNavigationParams()
  const routine = useTypedSelector(routineSelector(params?.routine))
  const [deleteDialog, setDeleteDialog] = useState(false)
  const { goBack } = useNavigation()
  const dispatch = useDispatch()

  return (
    <React.Fragment>
      <AppbarHeader style={options.headerStyle}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={routine?.name} />
        <Appbar.Action 
          icon="delete" 
          onPress={() => setDeleteDialog(true)}
        />
      </AppbarHeader>
      <Portal>
        <Dialog 
          visible={deleteDialog && !!routine} 
          onDismiss={() => setDeleteDialog(false)}
        >
          <Dialog.Title>Delete Routine?</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{routine?.name} will be permanently deleted. This action can not be undone.</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDeleteDialog(false)}>Cancel</Button>
            <Button 
              onPress={() => {
                goBack()
                setDeleteDialog(false)
                dispatch(removeRoutine(routine?.id))
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



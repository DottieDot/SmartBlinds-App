import React, { useState } from 'react'
import { Dialog, Button } from 'react-native-paper'
import { TextInput } from '../../../../components'

interface Props {
  onCancel: () => void
  onCreate: (name: string) => void
  visible: boolean
}

export default ({ onCancel, onCreate, visible }: Props) => {
  const [name, setName] = useState('')

  const handleClose = () => {
    setName('')
    onCancel()
  }

  const handleSubmit = () => {
    onCreate(name)
    setName('')
  }

  return (
    <Dialog
      visible={visible}
      onDismiss={handleClose}
    >
      <Dialog.Title>New Routine</Dialog.Title>
      <Dialog.Content>
        <TextInput
          type="nickname"
          label="Name"
          value={name}
          onChangeText={setName}
          mode="outlined"
          withHelperText={false}
        />
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={handleClose}>Cancel</Button>
        <Button onPress={handleSubmit}>Create</Button>
      </Dialog.Actions>
    </Dialog>
  )
}


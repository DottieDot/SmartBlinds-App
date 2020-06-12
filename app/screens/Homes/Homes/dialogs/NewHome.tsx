import React, { useState, useEffect } from 'react'
import { Dialog, TextInput, Button } from 'react-native-paper'

interface Props {
  visible    : boolean
  onDismiss ?: () => void
  onCancel   : () => void
  onConfirm  : (name: string) => void
}

export default ({ visible, onDismiss, onCancel, onConfirm }: Props) => {
  const [name, setName] = useState('')

  useEffect(() => {
    setName('')
  }, [visible])

  return (
    <Dialog visible={visible} onDismiss={onDismiss}>
      <Dialog.Title>New Home</Dialog.Title>
      <Dialog.Content>
        <TextInput
          label="Name"
          textContentType="nickname"
          value={name}
          onChangeText={setName}
          autoFocus
        />
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onCancel}>Cancel</Button>
        <Button
          disabled={name.length === 0}
          onPress={() => onConfirm(name)}
        >
          Create
        </Button>
      </Dialog.Actions>
    </Dialog>
  )
}

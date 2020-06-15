import React, { useState, useEffect } from 'react'
import { Dialog, TextInput, Button } from 'react-native-paper'
import { Picker } from '../../../../components'
import { useTypedSelector } from '../../../../store'

interface Props {
  visible: boolean
  onDismiss: () => void
  onConfirm: (name: string, home: number) => void
}

export default ({ visible, onDismiss, onConfirm }: Props) => {
  const homes = Object.values(useTypedSelector(state => state.homes))
  const [name, setName] = useState('')
  const [home, setHome] = useState<number | null>(null)

  useEffect(() => {
    setName('')
  }, [visible])

  const handleDismiss = () => {
    setName('')
    setHome(null)

    onDismiss()
  }

  const handleConfirm = () => {
    setName('')
    setHome(null)

    onConfirm(name, home ?? -1)
  }

  if (home === null) {
    return (
      <Picker
        title="Select Home"
        visible={visible}
        options={homes.map(({ id, name }) => ({
          value: id.toString(),
          title: name,
        }))}
        onDismiss={handleDismiss}
        onValueChange={(value) => {
          setHome(+value)
        }}
      />
    )
  }

  return (
    <Dialog visible={visible} onDismiss={handleDismiss}>
      <Dialog.Title>New Room</Dialog.Title>
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
        <Button onPress={handleDismiss}>Cancel</Button>
        <Button
          disabled={name.length === 0}
          onPress={handleConfirm}
        >
          Create
        </Button>
      </Dialog.Actions>
    </Dialog>
  )
}

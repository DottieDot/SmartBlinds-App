import React from 'react'
import { List, RadioButton, useTheme, Dialog } from 'react-native-paper'
import { FlatList } from 'react-native-gesture-handler'
import { View } from 'react-native'

export interface PickerProps {
  visible       :boolean
  options       :{ title: string, value: string, }[]
  selectedValue?:number | string
  onValueChange :(value: string, index: number) => void
  onDismiss     :() => void
  title        ?:string
}

export default ({ visible, options, selectedValue, onValueChange, onDismiss, title }: PickerProps) => {
  const theme = useTheme()

  return (
    <Dialog
      visible={visible}
      onDismiss={onDismiss}
    >
      {title && <Dialog.Title>{title}</Dialog.Title>}
      <Dialog.Content style={{ paddingHorizontal: 0 }}>
        <FlatList
          data={options}
          keyExtractor={({ value }) => value}
          renderItem={({ item: { title, value }, index }) => (
            <List.Item
              style={{ paddingHorizontal: 20 }}
              title={title}
              onPress={() => onValueChange(value, index)}
              right={() => (
                <View pointerEvents="none">
                  {(typeof selectedValue !== 'undefined') && (
                    <RadioButton
                      value=""
                      status={(
                        (typeof selectedValue === 'string')
                          ? selectedValue === value
                          : selectedValue === index
                      ) ? 'checked' : 'unchecked'}
                    />
                  )}
                </View>
              )}
            />
          )}
        />
      </Dialog.Content>
    </Dialog>
  )
}


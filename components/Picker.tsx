import React from 'react'
import { Modal, List, RadioButton, useTheme } from 'react-native-paper'
import { FlatList } from 'react-native-gesture-handler'
import { View, StyleProp, ViewStyle } from 'react-native'

export interface PickerProps {
  visible       :boolean
  options       :{ title: string, value: string, }[]
  selectedValue :number | string
  onValueChange :(value: string, index: number) => void
  onDismiss     :() => void
  style        ?:StyleProp<ViewStyle>
}

export default ({ visible, options, selectedValue, onValueChange, onDismiss, style }: PickerProps) => {
  const theme = useTheme()

  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      contentContainerStyle={[style, {
        marginHorizontal: 32,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.roundness,
      }]}
    >
      <FlatList
        data={options}
        keyExtractor={({ value }) => value}
        renderItem={({ item: { title, value }, index }) => (
          <List.Item
            title={title}
            onPress={() => onValueChange(value, index)}
            right={() => (
              <View pointerEvents="none">
                <RadioButton
                  value=""
                  status={(
                    (typeof selectedValue === 'string')
                      ? selectedValue === value
                      : selectedValue === index
                  ) ? 'checked' : 'unchecked'}
                />
              </View>
            )}
          />
        )}
      />
    </Modal>
  )
}


import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { List, Portal, Subheading } from 'react-native-paper'
import { useTypedSelector } from '../../../../store'
import { Picker } from '../../../../components'
import { PickerProps } from '../../../../components/Picker'
import { useDispatch } from 'react-redux'
import { setTheme } from '../../../../store/actions/settings'
import { Settings } from '../../../../store/model'

const themeOptions: PickerProps['options'] = [
  { title: 'System', value: 'system' },
  { title: 'Light', value: 'light' },
  { title: 'Dark', value: 'dark' },
]

const themeNames = {
  system: 'System',
  light: 'Light',
  dark: 'Dark',
}

export default () => {
  const dispatch = useDispatch()
  const settings = useTypedSelector(state => state.settings)
  const [themePicker, setThemePicker] = useState(false)

  return (
    <ScrollView>
      <List.Item 
        title="Theme"
        description="The theme of the app"
        onPress={() => setThemePicker(true)}
        right={() => (
          <Subheading style={{ alignSelf: 'center' }}>
            {themeNames[settings.theme]}
          </Subheading>
        )}
      />

      <Portal>
        <Picker
          visible={themePicker}
          options={themeOptions} 
          selectedValue={settings.theme}
          onDismiss={() => setThemePicker(false)}
          onValueChange={theme => {
            setThemePicker(false)
            dispatch(setTheme(theme as Settings['theme']))
          }}
        />
      </Portal>
    </ScrollView>
  )
}

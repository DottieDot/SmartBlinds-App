import React from 'react'
import { Surface, useTheme, List } from 'react-native-paper'
import { StyleProp, ViewStyle } from 'react-native'

interface Props {
  name: string
  onPress?: () => void
  trailing?: React.ReactNode
  style?: StyleProp<ViewStyle>
}

export default ({ name, onPress, trailing, style }: Props) => {
  const theme = useTheme()

  return (
    <Surface style={[{ 
      elevation: 2, 
      borderRadius: theme.roundness,
    }, style]}>
      <List.Item
        title={name}
        onPress={onPress}
        right={(props) => trailing}
      />
    </Surface>
  )
}

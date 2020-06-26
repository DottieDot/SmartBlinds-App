import React, { useState } from 'react'
import { Surface, Text, TouchableRipple, useTheme, overlay } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'

interface Props {
  value: number,
  onValueChange: (days: number) => void
}

interface ItemProps extends Props {
  day   : number,
  letter: string,
}

const letters = [
  'S',
  'M',
  'T',
  'W',
  'T',
  'F',
  'S',
]

const Item = ({ day, letter, value, onValueChange } : ItemProps) => {
  const theme = useTheme()
  const selected = !!(value & (1 << day))

  const surfaceColor = 
    (theme.dark && theme.mode === 'adaptive') 
      ? overlay(4, theme.colors.surface).toString()
      : theme.colors.surface

  return (
    <TouchableRipple
      onPress={() => {
        const newValue = selected 
          ? value ^ (1 << day)
          : value | (1 << day)
        onValueChange(newValue)
      }}
      style={{
        elevation: 4,
        borderRadius: theme.roundness,
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: selected ? theme.colors.primary : surfaceColor
      }}
    >
      <Text>{letter}</Text>
    </TouchableRipple>
  )
}

export default (props: Props) => {
  return (
    <ScrollView
      style={{
        flexDirection: 'column',
        
      }}
      contentContainerStyle={{
        paddingHorizontal: 16,
        justifyContent: 'space-between',
      }}
      horizontal
    >
      {letters.map((letter, day) => (
        <Item 
          {...props}
          day={day}
          letter={letter}
          key={day}
        />
      ))}
    </ScrollView>
    
  )
}

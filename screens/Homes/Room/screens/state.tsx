import React, { useState } from 'react'
import { View } from 'react-native'
import { useDispatch } from 'react-redux'
import { setRoomState } from '../../../../store/actions/rooms'
import { VerticalSlider } from '../../../../components'
import { useTheme } from 'react-native-paper'
import Color from 'color'
import { useRoom } from '../context'

export default () => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const room = useRoom()
  const [height, setHeight] = useState(0)
  
  const trackColor = Color(theme.colors.onSurface).mix(Color(theme.colors.surface), .75).toString()
  const indicatorColor = Color(theme.colors.onSurface).mix(Color(theme.colors.surface), .5).toString()

  return (
    <View 
      style={{ flex: 1, margin: 16 }}
      onLayout={(event) => setHeight(Math.min(event.nativeEvent.layout.height, 400))}
    >
      {height ? (
        <VerticalSlider
          min={0}
          max={1}
          value={1 - room.state}
          onComplete={(value) => dispatch(setRoomState(room.id, 1 - value))}
          width="100%"
          height={height}
          borderRadius={theme.roundness}
          minimumTrackTintColor={theme.colors.surface}
          maximumTrackTintColor={trackColor}
          showBallIndicator
          ballIndicatorPosition="50%"
          ballIndicatorHeight={10}
          renderIndicator={(value) => (
            <View  
              style={{ 
                height: 10,
                width: 50, 
                marginLeft: -25,
                backgroundColor: indicatorColor,
                borderRadius: 90,
                marginTop: -Math.min(((1 - value) * height) - 25, 25),
              }}
              pointerEvents="none"
            />
          )}
        />
      ) : null}
    </View>
  )
}

import React, { useState, useEffect } from 'react'
import { Home } from '../store/model';
import { SectionListData, SectionList, StyleProp, ViewStyle, SectionListRenderItem } from 'react-native';
import { Caption } from 'react-native-paper';

interface Props {
  homes: { [key: number]: Home }
  style?: StyleProp<ViewStyle>
  renderItem: SectionListRenderItem<number>
}

export default ({ homes, style, renderItem }: Props) => {
  const [sections, setSections] = useState<SectionListData<number>[]>([])

  useEffect(() => {
    setSections(Object.values(homes).map((dat) => ({
      title: dat.name,
      id: dat.id,
      data: dat.rooms,
    })))
  }, [homes])

  return (
    <SectionList
    style={style}
    sections={sections}
    keyExtractor={(id) => id}
    renderItem={renderItem}
    renderSectionHeader={({ section: { title } }) => (
      <Caption>
        {title}
      </Caption>
    )}
  />
  )
}

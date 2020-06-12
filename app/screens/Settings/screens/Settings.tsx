import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { List, Divider } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const settings = [
  {
    title: 'App',
    items: [
      {
        title: 'App Settings',
        description: 'App related settings',
        route: 'app_settings',
      },
      {
        title: 'About',
        description: 'Information about this app',
        route: 'about',
      },
    ]
  },
  {
    title: 'Home',
    items: [
      {
        title: 'Homes',
        description: 'Manage your homes',
        route: 'homes_settings'
      },
      {
        title: 'Unlinked systems',
        description: 'Manage your unlinked systems',
        route: 'systems_settings'
      },
    ]
  },
  {
    title: 'Account',
    items: [
      {
        title: 'Account',
        description: 'Manage your account',
        route: 'account_settings'
      },
    ]
  },
]

const Section = ({ section: { title, items }}: any) => {
  const { navigate } = useNavigation()

  return (
    <List.Section>
      <List.Subheader>{title}</List.Subheader>
      {items.map(({ title, description, route }: any) => (
        <List.Item
          title={title}
          description={description}
          key={route}
          onPress={() => navigate(route)}
        />
      ))}
      <Divider />
    </List.Section>
  )
}

export default () => {
  return (
    <ScrollView>
      {settings.map(section => <Section key={section.title} section={section} />)}
    </ScrollView>
  )
}

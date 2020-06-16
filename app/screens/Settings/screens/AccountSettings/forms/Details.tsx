import React from 'react'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import * as YupScemes from '../../../../../yup-schemes'
import { TextInput } from '../../../../../components'
import { Button } from 'react-native-paper'
import { useTypedSelector } from '../../../../../store'
import style from '../style'
import { useDispatch } from 'react-redux'
import { SetDetails } from '../../../../../store/actions/auth'

const changePasswordSchema = Yup.object().shape({
  name: YupScemes.name.required('Required field'),
  email: YupScemes.email.required('Required field'),
})

export default () => {
  const dispatch = useDispatch()
  const user = useTypedSelector(state => state.auth.user)

  return (
    <Formik
      initialValues={{
        name: user?.name,
        email: user?.email
      }}
      enableReinitialize={true}
      validationSchema={changePasswordSchema}
      onSubmit={({ name, email }, helpers) => {
        if (!name || !email) {
          return
        }

        dispatch(SetDetails(name, email))
        helpers.resetForm({
          values: {
            email, 
            name
          }
        })
      }}
    > 
      {({ handleSubmit, isValid, dirty }) => (
        <React.Fragment>
          <TextInput
            label="Name"
            name="name"
            type="name"
            style={style.input}
            maxLength={255}
          />
          <TextInput
            label="E-Mail"
            name="email"
            type="email"
            style={style.input}
            maxLength={255}
          />
          <Button
            disabled={!isValid || !dirty}
            onPress={handleSubmit}
            mode="contained"
            style={style.button}
          >
            Save details
          </Button>
        </React.Fragment>
      )}
    </Formik>
  )
}

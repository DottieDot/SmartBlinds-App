import React from 'react'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import * as YupScemes from '../../../../../yup-schemes'
import { TextInput } from '../../../../../components'
import { Button } from 'react-native-paper'
import style from '../style'
import * as api from '../../../../../api'

const changePasswordSchema = Yup.object().shape({
  password: YupScemes.password.required('Required field'),
  repeatPassword: Yup.string().oneOf([Yup.ref('password'), 'Passwords must match']).required('Required field'),
})

export default () => {
  return (
    <Formik
      initialValues={{
        password: '',
        repeatPassword: ''
      }}
      validationSchema={changePasswordSchema}
      onSubmit={async ({ password }, { resetForm, setSubmitting }) => {
        setSubmitting(true)
        await api.ChangePassword(password)
        setSubmitting(false)
        resetForm()
      }}
    > 
      {({ handleSubmit, isValid, dirty, isSubmitting }) => (
        <React.Fragment>
          <TextInput
            label="Password"
            name="password"
            type="password"
            style={style.input}
            disabled={isSubmitting}
          />
          <TextInput
            label="Repeat password"
            name="repeatPassword"
            type="password"
            style={style.input}
            disabled={isSubmitting}
          />
          <Button
            disabled={!isValid || !dirty}
            onPress={handleSubmit}
            mode="contained"
            style={style.button}
            loading={isSubmitting}
          >
            Change Password
          </Button>
        </React.Fragment>
      )}
    </Formik>
  )
}


import React from 'react'
import { Link } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

import TextField from "../../components/inputs/textField/textField"
import Button from "../../components/inputs/buttons/button"

import { LoginPageLayout, TextFieldContainer, Title, ButtonContainer } from '../login/login.styled'

const Login = () => {

  const onSubmit = async (values) => {
    const { email, password } = values
    const response = await axios.post("http://localhost:8081/api/login", { email, password }).catch((err) => {
      if (err && err.response)
        console.log(err)
    })

    if (response) {
      console.log("response:", response)
      const { token } = response.data
      localStorage.setItem('token', token)
    }
  }
  const validate = Yup.object(
    {
      email: Yup.string()
        .email('Email is invalid').required('Required'),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters").required('Required'),
    }
  )
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validate}
      onSubmit={values => {
        console.log(values)
        onSubmit(values)
      }}
    >
      {formik => (
        <LoginPageLayout>
          <Title>
            Login
          </Title>
          <Form onSubmit={formik.handleSubmit}>
            <TextFieldContainer>
              <TextField label="Email" name="email" type="email" ></TextField>
            </TextFieldContainer>
            <TextFieldContainer>
              <TextField label="Password" name="password" type="password" ></TextField>
            </TextFieldContainer>
            <ButtonContainer>
              <Link to="/signup">Don't have an account?</Link>
              <Button type="submit" text="Login" />
            </ButtonContainer>
          </Form>
        </LoginPageLayout>
      )
      }
    </Formik>
  )
}

export default Login
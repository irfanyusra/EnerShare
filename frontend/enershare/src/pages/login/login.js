
import React from 'react'

import { Link, useHistory } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

import TextField from "../../components/inputs/textField/textField"
import Button from "../../components/inputs/buttons/button"

import { LoginPageLayout, TextFieldContainer, Title, ButtonContainer, ColumnContainer, LoginFormContainer, LoginForm } from '../login/login.styled'

const Login = () => {
  let history = useHistory();

  const onSubmit = (values) => {
    const { email, password } = values
    axios.post("http://localhost:8080/api/login", { email, password })
    .then((response) => {
      let setUserLoggedIn = async () => {
        const { token } = response.data.response
        localStorage.setItem('token', token)
      }
      setUserLoggedIn().then(()=> {
        history.push("/dashboard")
      })
    })
    .catch((err) => {
      if (err && err.response)
        console.log(err)
    })
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
    <LoginPageLayout>

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
          <ColumnContainer>
            <Title>
              Login
            </Title>
            <LoginFormContainer>
              <LoginForm onSubmit={formik.handleSubmit}>
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
              </LoginForm>
            </LoginFormContainer>
          </ColumnContainer>
        )
        }
      </Formik>
    </LoginPageLayout>
  )
}

export default Login
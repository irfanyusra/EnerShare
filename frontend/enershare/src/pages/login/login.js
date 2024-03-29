
import React, { useState } from 'react'

import { Link, useHistory } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import Loader from "../../components/loader/loader"

import TextField from "../../components/inputs/textField/textField"
import Button from "../../components/inputs/buttons/button"

import {
  LoginPageLayout,
  TextFieldContainer,
  Title,
  ButtonContainer,
  ColumnContainer,
  LoginFormContainer,
  LoginForm,
  LogoTitleContainer,
  EnerShareLogo,
} from '../login/login.styled'

const Login = () => {
  const [loading, setLoading] = useState(false);
  let history = useHistory();

  const onSubmit = (values) => {
    setLoading(true);
    const { email, password } = values
    axios.post("http://localhost:8080/api/login", { email, password })
      .then((response) => {
        const { token } = response.data.response
        localStorage.setItem('token', token)
        history.push("/dashboard")
      }).catch((err) => {
        if (err && err.response) {
          console.log(err);
        }
        setLoading(false);
      })
  }
  const validate = Yup.object(
    {
      email: Yup.string()
        .email('Email is invalid')
        .required('Required'),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required('Required'),
    }
  )
  return (
    <LoginPageLayout>
      {loading ? (<Loader />) : (
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
              <LogoTitleContainer>
                <EnerShareLogo />
                <Title>
                  Login
                </Title>
              </LogoTitleContainer>
              <LoginFormContainer>
                <LoginForm onSubmit={formik.handleSubmit}>
                  <TextFieldContainer>
                    <TextField type="email" label="Email" name="email" placeholder="hello@enershare.com"  ></TextField>
                  </TextFieldContainer>
                  <TextFieldContainer>
                    <TextField type="password" label="Password" name="password" placeholder="Must have at least 6 characters" ></TextField>
                  </TextFieldContainer>
                  <ButtonContainer>
                    <Link to="/signup">Don't have an account?</Link>
                    <Button type="submit" color="white" backgroundColor="#3AB972" text="Login" />
                  </ButtonContainer>
                </LoginForm>
              </LoginFormContainer>
            </ColumnContainer>
          )
          }
        </Formik>
      )}
    </LoginPageLayout>
  )
}

export default Login
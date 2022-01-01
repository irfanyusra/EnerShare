
import React from "react"
import { Link, useHistory } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

import TextField from "../../components/inputs/textField/textField"
import Button from "../../components/inputs/buttons/button"
import { SignupPageLayout, TextFieldContainer, Title, ButtonContainer } from '../signup/signup.styled'

const SignUp = () => {
  let history = useHistory()

  const onSubmit = async (values) => {
    const { email, password, address, name, utility_account } = values
    const response = await axios.post("http://localhost:8080/api/signup", { email, password, address, name, utility_account }).catch((err) => {
      if (err && err.response)
        console.log(err)
    })

    if (response)
      console.log(response)
      history.push("/dashboard")
  }
  const validate = Yup.object(
    {
      email: Yup.string()
        .email('Email is invalid').required('Required'),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters").required('Required'),
      address: Yup.string()
        .required('Required'),
    }
  )
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        address: '',
        utility_account: ''
      }}
      validationSchema={validate}
      onSubmit={values => {
        console.log(values)
        onSubmit(values)
      }}
    >
      {formik => (
        <SignupPageLayout>
          <Title>
            Sign Up
          </Title>
          <Form onSubmit={formik.handleSubmit}>
            <TextFieldContainer>
              <TextField label="Name" name="name" type="name" ></TextField>
            </TextFieldContainer>
            <TextFieldContainer>
              <TextField label="Email" name="email" type="email" ></TextField>
            </TextFieldContainer>
            <TextFieldContainer>
              <TextField label="Password" name="password" type="password" ></TextField>
            </TextFieldContainer>
            <TextFieldContainer>
              <TextField label="Address" name="address" type="text" ></TextField>
            </TextFieldContainer>
            <TextFieldContainer>
              <TextField label="Utility Account" name="utility_account" type="text" ></TextField>
            </TextFieldContainer>
            <ButtonContainer>
              <Link to='/login'>Already have an account?</Link>
              <Button type="submit" text="Sign Up" />
            </ButtonContainer>
          </Form>
        </SignupPageLayout>
      )
      }
    </Formik>
  )
}

export default SignUp

import React from "react"
import {Link} from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

import TextField from "../../components/inputs/textField/textField"
import Button from "../../components/inputs/buttons/button"
import { SignupPageLayout, TextFieldContainer, Title, ButtonContainer } from '../signup/signup.styled'


const SignUp = () => {

  const onSubmit = async (values) => {
    const { email, password, address } = values
    const response = await axios.post("http://localhost:8081/api/signup", { email, password, address }).catch((err) => {
      if (err && err.response)
        console.log(err)
    })

    if (response)
      console.log("successful signup")
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
        email: '',
        password: '',
        address: '',
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
              <TextField label="Email" name="email" type="email" ></TextField>
            </TextFieldContainer>
            <TextFieldContainer>
              <TextField label="Password" name="password" type="password" ></TextField>
            </TextFieldContainer>
            <TextFieldContainer>
              <TextField label="Address" name="address" type="text" ></TextField>
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
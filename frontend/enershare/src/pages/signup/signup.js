
import React from "react"
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

import TextField from "../../components/inputs/textField/textField"
import Button from "../../components/inputs/buttons/button"

const SignUp = () => {

  const onSubmit = async (values) => {
    const { email, password, address } = values
    const response = await axios.post("http://localhost:8081/api/signup", {email, password, address}).catch((err) => {
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
    initialValues = {{ 
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
        <div>
          <h1>
            Sign Up
          </h1>
          <Form onSubmit={formik.handleSubmit}>
            <TextField label="Email" name="email" type="email" ></TextField>
            <TextField label="Password" name="password" type="password" ></TextField>
            <TextField label="Address" name="address" type="text" ></TextField>
            <Button type="submit" text="Sign Up"/>
          </Form>
        </div>
        )
      }
    </Formik>
  )
} 

export default SignUp
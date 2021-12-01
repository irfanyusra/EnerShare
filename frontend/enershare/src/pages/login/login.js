
import React from "react"
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

import TextField from "../../components/inputs/textField/textField"
import Button from "../../components/inputs/buttons/button"

const Login = () => {

  const onSubmit = async (values) => {
    const { email, password } = values
    const response = await axios.post("http://localhost:8081/api/login", {email, password}).catch((err) => {
      if (err && err.response)
        console.log(err)
    })

    if (response)
      console.log("Login successful")
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
    initialValues = {{ 
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
        <div>
          <h1>
            Login
          </h1>
          <Form onSubmit={formik.handleSubmit}>
            <TextField label="Email" name="email" type="email" ></TextField>
            <TextField label="Password" name="password" type="password" ></TextField>
            <Button type="submit" text="Login"/>
          </Form>
        </div>
        )
      }
    </Formik>
  )
} 

export default Login
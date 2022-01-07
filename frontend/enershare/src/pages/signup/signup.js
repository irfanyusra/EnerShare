
import React, { useState } from "react"
import { Link, useHistory } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import Loader from "../../components/loader/loader"

import TextField from "../../components/inputs/textField/textField"
import Button from "../../components/inputs/buttons/button"
import {
  SignupPageLayout,
  TextFieldContainer,
  Title,
  ButtonContainer,
  ColumnContainer,
  SignupFormContainer,
  SignupForm,
  LogoContainer,
  EnerShareLogo,
} from '../signup/signup.styled'

const SignUp = () => {
  const [loading, setLoading] = useState(false);

  let history = useHistory()
  const onSubmit = (values) => {
    setLoading(true);
    const { email, password, address, name, utility_account } = values
    axios.post("http://localhost:8080/api/signup", { email, password, address, name, utility_account }).then((response) => {
      console.log(response);
      const { token } = response.data.response;
      localStorage.setItem('token', token);
      history.push("/dashboard");
    }).catch((err) => {
      if (err && err.response) {
        console.log(err);
      }
      setLoading(false);
    });
  }
  const validate = Yup.object(
    {
      name: Yup.string()
        .required('required'),
      email: Yup.string()
        .email('Email is invalid').required('Required'),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters").required('Required'),
      address: Yup.string()
        .required('Required'),
      utility_account: Yup.number()
        .test('len', 'Must be exactly 6 digits', val => val?.toString().length === 6)
        .required('Required'),
    }
  )
  return (
    <SignupPageLayout>
      {loading ? (<Loader />) : (
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
            <ColumnContainer>
              <LogoContainer>
                <EnerShareLogo />
              </LogoContainer>
              <Title>
                Sign Up
              </Title>
              <SignupFormContainer>
                <SignupForm onSubmit={formik.handleSubmit}>
                  <TextFieldContainer>
                    <TextField label="Name" name="name" type="name" placeholder="John Doe"></TextField>
                  </TextFieldContainer>
                  <TextFieldContainer>
                    <TextField label="Email" name="email" type="email" placeholder="hello@enershare.com" ></TextField>
                  </TextFieldContainer>
                  <TextFieldContainer>
                    <TextField label="Password" name="password" type="password" placeholder="Must be at least 6 characters"></TextField>
                  </TextFieldContainer>
                  <TextFieldContainer>
                    <TextField label="Address" name="address" type="text" placeholder="123-456 Cherry St"></TextField>
                  </TextFieldContainer>
                  <TextFieldContainer>
                    <TextField label="Utility Account" name="utility_account" type="number" placeholder={123456} ></TextField>
                  </TextFieldContainer>
                  <ButtonContainer>
                    <Link to='/login'>Already have an account?</Link>
                    <Button type="submit" backgroundColor="#3AB972" color="white" text="Sign Up" />
                  </ButtonContainer>
                </SignupForm>
              </SignupFormContainer>
            </ColumnContainer>
          )}
        </Formik>
      )}
    </SignupPageLayout >
  )
}

export default SignUp
import React from 'react'
import { Formik, Form } from 'formik'
import "./sell.css";
import * as Yup from 'yup'
import axios from 'axios'
import TextField from "../../components/inputs/textField/textField"
import Button from "../../components/inputs/buttons/button"

function sell() {

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
                rate: 0.00,
                quantity: 0,
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
                        Sell
                    </h1>
                    <Form onSubmit={formik.handleSubmit}>
                        <div className="rate">
                            <TextField className="rate" label="Rate" name="rate" type="number" min="0.01" step="0.01" max="2500"></TextField>
                            <div className='rate'>$/kWh</div>
                        </div>
                        <TextField label="Quantity" name="quantity" type="number" min="0.01" step="0.01" max="2500"></TextField>

                        <Button type="submit" text="Sell" />
                        <div className='rate'>$/kWh</div>
                    </Form>
                </div>
            )
            }
        </Formik>
    )
}

export default sell

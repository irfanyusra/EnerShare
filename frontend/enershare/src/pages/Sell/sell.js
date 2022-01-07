import React, { useState } from "react"
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import TextField from "../../components/inputs/textField/textField"
import { getUserId } from "../../helperFunctions/getUserId"
import Loader from "../../components/loader/loader"

import {
    SellPageLayout,
    SellColumn,
    Title,
    SellButton,
    TextFieldContainer,
    EnergyTypeDroplist,
    SellEnergyTypeContainer,
} from "./sell.styled"


function Sell() {
    const user_id = getUserId()
    const [loading, setLoading] = useState(false);

    const updatePrice = (event, formik) => {
        setLoading(true);
        let rate, amount_energy;
        if (event.currentTarget.id === "rate") {
            rate = parseFloat(event.currentTarget.value);
            amount_energy = parseInt(document.getElementById("amount_energy").value)
        }
        else if (event.currentTarget.id === "amount_energy") {
            amount_energy = parseInt(event.currentTarget.value);
            rate = parseFloat(document.getElementById("rate").value)
        }
        formik.setFieldValue("price", rate * amount_energy);
        setLoading(false);
    }

    const onSubmit = async (values) => {
        setLoading(true);
        try {
            const { price, rate, amount_energy, energy_type } = values;
            await axios.post("http://localhost:8080/api/createPosting", { user_id, price, rate, amount_energy, energy_type });
            alert("Sale Successfully Posted!");
        } catch (err) {
            if (err && err.response) {
                console.log(err);
                alert(err);
            }
        }
        setLoading(false);
    }
    const validate = Yup.object(
        {
            rate: Yup.number()
                .required('Required'),
            amount_energy: Yup.number()
                .required('Required'),
            price: Yup.number()
                .required('Required'),
        }
    )

    return (
        <Formik
            initialValues={{
                rate: 0,
                amount_energy: 0,
                price: 0,
                energy_type: "Solar",
            }}
            validationSchema={validate}
            onSubmit={(values, actions) => {
                console.log(values);
                onSubmit(values).then(() => {
                    actions.setSubmitting(false);
                    actions.resetForm({
                        values: {
                            rate: 0,
                            amount_energy: 0,
                            price: 0,
                            energy_type: "Solar",
                        },
                    });
                });
            }}
        >
            {formik => (
                <SellPageLayout>
                    {loading ? (<Loader />) : (
                        <SellColumn>
                            <Title>
                                Sell
                            </Title>
                            <Form onSubmit={formik.handleSubmit}>
                                <TextFieldContainer>
                                    <TextField className="rate" label="Rate ($/kWh)" name="rate" type="number" id="rate" min="0.001" step="0.001" max="2500" onChange={(e) => {
                                        formik.setFieldValue("rate", e.currentTarget.value);
                                        updatePrice(e, formik);
                                    }}></TextField>
                                </TextFieldContainer>
                                <TextFieldContainer>
                                    <TextField label="Amount of Energy (kWh)" name="amount_energy" type="number" id="amount_energy" min="0" max="2500" onChange={(e) => {
                                        formik.setFieldValue("amount_energy", e.currentTarget.value);
                                        updatePrice(e, formik);
                                    }}></TextField>
                                </TextFieldContainer>
                                <TextFieldContainer>
                                    <SellEnergyTypeContainer>
                                        <label>Energy Type</label>
                                        <EnergyTypeDroplist name="energy_type" id="energy_type" onChange={(e) => {
                                            formik.handleChange(e);
                                            formik.setFieldValue("energy_type", e.currentTarget.value);
                                        }}>
                                            <option value="Solar">Solar</option>
                                            <option value="Wind">Wind</option>
                                            <option value="Hydro">Hydro</option>
                                        </EnergyTypeDroplist>
                                    </SellEnergyTypeContainer>
                                </TextFieldContainer>
                                <TextFieldContainer>
                                    <TextField label="Price ($)" name="price" type="number" id="price" disabled></TextField>
                                </TextFieldContainer>
                                <SellButton type="submit" >Sell</SellButton>
                            </Form>
                        </SellColumn>
                    )}
                </SellPageLayout >
            )
            }
        </Formik >
    )
}

export default Sell

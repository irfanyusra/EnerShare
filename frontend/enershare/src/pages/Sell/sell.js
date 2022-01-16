import React, { useState, useEffect } from "react"
import { Formik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import DOMPurify from 'dompurify'
import TextField from "../../components/inputs/textField/textField"
import Button from "../../components/inputs/buttons/button"
import { getUserId } from "../../helperFunctions/getUserId"
import Loader from "../../components/loader/loader"

import {
    SellPageLayout,
    SellColumnContainer,
    Title,
    ButtonContainer,
    TextFieldContainer,
    EnergyTypeDroplist,
    SellEnergyTypeContainer,
    // LogoContainer,
    // EnerShareLogo,
    SellForm,
    SellFormContainer,
} from "./sell.styled"


function Sell() {
    const user_id = getUserId()
    const [loading, setLoading] = useState(false);
    const [energyAvailable, setEnergyAvailable] = useState(0)

    useEffect(async () => {
        setLoading(true)
        try {
            let cumulativeRemainingEnergy = await axios.get(`http://localhost:8080/api/userCumulativeRemainingEnergy/${user_id}`)
            let user = await axios.get(`http://localhost:8080/api/user/${user_id}`)
            setEnergyAvailable(cumulativeRemainingEnergy.data.response - user.data.response.energy_sell_in_order)
        } catch (err) {
            if (err && err.response) {
                console.log(err.response.data)
                alert(err.response.data)
            }
        }

        setLoading(false)
    }, [])

    const updatePrice = (event, formik) => {
        setLoading(true)
        let rate, amount_energy
        if (event.currentTarget.id === "rate") {
            rate = parseFloat(event.currentTarget.value);
            amount_energy = parseFloat(document.getElementById("amount_energy").value)
        }
        else if (event.currentTarget.id === "amount_energy") {
            amount_energy = parseFloat(event.currentTarget.value)
            rate = parseFloat(document.getElementById("rate").value)
        }
        formik.setFieldValue("price", parseFloat((rate * amount_energy).toFixed(3)))
        setLoading(false)
    }

    const onSubmit = async (values) => {
        setLoading(true)
        try {
            const { price, rate, amount_energy, energy_type } = values
            await axios.post("http://localhost:8080/api/createPosting", { user_id, price, rate, amount_energy, energy_type })
            alert("Sale Successfully Posted!")
        } catch (err) {
            if (err && err.response) {
                console.log(err.response.data)
                alert(err.response.data)
            }
        }
        setLoading(false)
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
        <SellPageLayout>
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
                    loading ? (<Loader />) : (
                        <SellColumnContainer>
                            {/* <LogoContainer>
                                <EnerShareLogo />
                            </LogoContainer> */}
                            <Title>
                                Sell
                            </Title>
                            <SellFormContainer>
                                <SellForm onSubmit={formik.handleSubmit}>
                                    <TextFieldContainer>
                                        <TextField className="energyAvailable" type="number" label="Available Energy (kWh)" name="energyAvailable" id="energyAvailable" value={DOMPurify.sanitize(energyAvailable.toString())} style={{ background: "rgb(232, 241, 250)" }} disabled></TextField>
                                    </TextFieldContainer>
                                    <TextFieldContainer>
                                        <TextField className="rate" label="Rate ($/kWh)" name="rate" type="number" id="rate" min="0.01" step="0.01" max="2500" onChange={(e) => {
                                            formik.setFieldValue("rate", e.currentTarget.value)
                                            updatePrice(e, formik)
                                        }}></TextField>
                                    </TextFieldContainer>
                                    <TextFieldContainer>
                                        <TextField label="Amount of Energy (kWh)" name="amount_energy" type="number" id="amount_energy" min="0" step="0.1" max={energyAvailable} onChange={(e) => {
                                            formik.setFieldValue("amount_energy", e.currentTarget.value)
                                            updatePrice(e, formik)
                                        }}></TextField>
                                    </TextFieldContainer>
                                    <TextFieldContainer>
                                        <SellEnergyTypeContainer>
                                            <label>Energy Type</label>
                                            <EnergyTypeDroplist name="energy_type" id="energy_type" onChange={(e) => {
                                                formik.handleChange(e)
                                                formik.setFieldValue("energy_type", e.currentTarget.value)
                                            }}>
                                                <option value="Solar">Solar</option>
                                                <option value="Wind">Wind</option>
                                                <option value="Hydro">Hydro</option>
                                            </EnergyTypeDroplist>
                                        </SellEnergyTypeContainer>
                                    </TextFieldContainer>
                                    <TextFieldContainer>
                                        <TextField label="Price ($)" name="price" type="number" id="price" style={{ background: "rgb(232, 241, 250)" }} disabled></TextField>
                                    </TextFieldContainer>
                                    <ButtonContainer>
                                        <Button type="submit" backgroundColor="#3AB972" color="white" text="Sell" />
                                    </ButtonContainer>
                                </SellForm>
                            </SellFormContainer>
                        </SellColumnContainer>
                    )
                )}
            </Formik >
        </SellPageLayout >
    )
}

export default Sell

import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import { Formik } from 'formik'
import * as Yup from 'yup'
import Loader from "../loader/loader"
import Button from "../../components/inputs/buttons/button"
import TextField from "../../components/inputs/textField/textField"

import {
    ClientModalBackground,
    ClientModalContentContainer,
    ClientModalContentBody,
    ClientModalContentHeader,
    ButtonContainer,
    SummaryTable,
    ClientModalTitle,
    TextFieldContainer,
    AddClientForm,
} from "./addClientModal.styled"

const AddClientModal = ({ addClientModalOpen, close }) => {
    const [loading, setLoading] = useState(false);
    const contentRef = useRef()

    const onSubmit = async (values) => {
        try {
            setLoading(true);
            const { client_name } = values
            let username = client_name
            await axios.post("http://localhost:8080/api/enrollBlockchainClient", { username });
            alert("Client Sucessfully Added!");
        } catch (err) {
            if (err && err.response) {
                console.log(err.response.data);
                alert("Error: Error with Creating a new Client");
            }
        }
        setLoading(false);
        close();
        window.location.reload()
    }

    const validate = Yup.object(
        {
            client_name: Yup.string()
                .required('required'),
        }
    )

    if (!addClientModalOpen) return null
    return (
        <ClientModalBackground>
            <Formik
                initialValues={{
                    client_name: "",
                }}
                validationSchema={validate}
                onSubmit={(values, actions) => {
                    console.log(values);
                    onSubmit(values).then(() => {
                        actions.resetForm({
                            values: {
                                client_name: "",
                            },
                        });
                    });
                }}
            >
                {formik => (
                    loading ? (<Loader />) : (
                        <ClientModalContentContainer>
                            <AddClientForm onSubmit={formik.handleSubmit}>
                                <ClientModalContentHeader>
                                    <ClientModalTitle>Add Client</ClientModalTitle>
                                </ClientModalContentHeader>
                                <ClientModalContentBody ref={contentRef}>
                                    <SummaryTable>
                                        <tr>
                                            <TextFieldContainer>
                                                <TextField type="name" label="Client Name" name="client_name" id="client_name" placeholder="Client Name"></TextField>
                                            </TextFieldContainer>
                                        </tr>
                                    </SummaryTable>
                                    &nbsp;
                                    <ButtonContainer>
                                        <Button backgroundColor="#FF0000" color="white" text="Cancel" onClick={close}></Button>
                                        <Button backgroundColor="#3AB972" color="white" text="Confirm" type="submit"></Button>
                                    </ButtonContainer>
                                </ClientModalContentBody>
                            </AddClientForm>
                        </ClientModalContentContainer>
                    )
                )}
            </Formik >
        </ClientModalBackground>
    )
}

export default AddClientModal

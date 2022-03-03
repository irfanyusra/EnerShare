import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import { Formik } from 'formik'
import * as Yup from 'yup'
import Loader from "../loader/loader"
import Button from "../../components/inputs/buttons/button"
import TextField from "../../components/inputs/textField/textField"

import {
    PeerModalBackground,
    PeerModalContentContainer,
    PeerModalContentBody,
    PeerModalContentHeader,
    ButtonContainer,
    SummaryTable,
    PeerModalTitle,
    TextFieldContainer,
    AddPeerForm,
} from "./addPeerModal.styled"

const AddPeerModal = ({ addPeerModalOpen, close }) => {
    const [loading, setLoading] = useState(false);
    const contentRef = useRef()

    const onSubmit = async (values) => {
        try {
            setLoading(true);
            const { peer_name, port_number } = values
            let peerName = peer_name
            let corePeerPort = port_number
            await axios.post("http://localhost:8080/api/newPeer", { peerName, corePeerPort });
            alert("Peer Sucessfully Added!");
        } catch (err) {
            if (err && err.response) {
                console.log(err.response.data);
                alert(err.response.data);
            }
        }
        setLoading(false);
        close();
    }

    const validate = Yup.object(
        {
            peer_name: Yup.string()
                .required('required'),
            port_number: Yup.number()
                .test('len', 'Must be exactly 1-4 digits', val => val?.toString().length > 0 && val?.toString().length <= 4)
                .required('Required'),
        }
    )

    if (!addPeerModalOpen) return null
    return (
        <PeerModalBackground>
            <Formik
                initialValues={{
                    peer_name: "",
                    port_number: 0,
                }}
                validationSchema={validate}
                onSubmit={(values, actions) => {
                    console.log(values);
                    onSubmit(values).then(() => {
                        actions.resetForm({
                            values: {
                                peer_name: "",
                                port_number: 0,
                            },
                        });
                    });
                }}
            >
                {formik => (
                    loading ? (<Loader />) : (
                        <PeerModalContentContainer>
                            <AddPeerForm onSubmit={formik.handleSubmit}>
                                <PeerModalContentHeader>
                                    <PeerModalTitle>Add Peer</PeerModalTitle>
                                </PeerModalContentHeader>
                                <PeerModalContentBody ref={contentRef}>
                                    <SummaryTable>
                                        <tr>
                                            <TextFieldContainer>
                                                <TextField type="name" label="Peer Name" name="peer_name" id="peer_name" placeholder="Peer Name"></TextField>
                                            </TextFieldContainer>
                                        </tr>
                                        <tr>
                                            <TextFieldContainer>
                                                <TextField type="number" label="Port" name="port_number" id="port_number" min="0" step="1" max="9999" onChange={(p) => {
                                                    formik.setFieldValue("port_number", p.currentTarget.value)
                                                }}></TextField>
                                            </TextFieldContainer>
                                        </tr>
                                    </SummaryTable>
                                    &nbsp;
                                    <ButtonContainer>
                                        <Button backgroundColor="#FF0000" color="white" text="Cancel" onClick={close}></Button>
                                        <Button backgroundColor="#3AB972" color="white" text="Confirm" type="submit"></Button>
                                    </ButtonContainer>
                                </PeerModalContentBody>
                            </AddPeerForm>
                        </PeerModalContentContainer>
                    )
                )}
            </Formik >
        </PeerModalBackground>
    )
}

export default AddPeerModal

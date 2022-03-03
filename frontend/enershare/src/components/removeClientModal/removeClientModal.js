import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import { getUserId } from "../../helperFunctions/getUserId"
import Loader from "../loader/loader"
import Button from "../../components/inputs/buttons/button"

import {
    RemoveClientModalBackground,
    RemoveClientModalContentContainer,
    RemoveClientModalContentBody,
    RemoveClientModalContentHeader,
    ButtonContainer,
    PurchaseSummaryTable,
    PurchaseSummaryTableDataContainer,
    RemoveClientModalTitle,
    PurchaseSummaryTableDataLeft,
    PurchaseSummaryTableDataRight,
} from "./removeClientModal.styled"

const RemoveClientModal = ({ removeClientModalOpen, close, username }) => {
    const [loading, setLoading] = useState(false);
    const contentRef = useRef()

    const DeleteClient = async () => {
        try {
            setLoading(true);
            await axios.delete("http://localhost:8080/api/blockchainClient", { username });
            alert("Client Sucessfully Deleted!");
        } catch (err) {
            if (err && err.response) {
                console.log(err.response.data);
                alert(err.response.data);
            }
        }
        setLoading(false);
        close();
    }

    if (!removeClientModalOpen) return null
    return (
        <RemoveClientModalBackground>
            {loading ? (<Loader />) : (
                <RemoveClientModalContentContainer>
                    <RemoveClientModalContentHeader>
                        <RemoveClientModalTitle>Client Information</RemoveClientModalTitle>
                    </RemoveClientModalContentHeader>
                    <RemoveClientModalContentBody ref={contentRef}>
                        <PurchaseSummaryTable>
                            <tr>
                                <PurchaseSummaryTableDataContainer>
                                    <PurchaseSummaryTableDataLeft>ClientName</PurchaseSummaryTableDataLeft>
                                    <PurchaseSummaryTableDataRight>{username}</PurchaseSummaryTableDataRight>
                                </PurchaseSummaryTableDataContainer>
                            </tr>
                        </PurchaseSummaryTable>
                        &nbsp;
                        <ButtonContainer>
                            <Button backgroundColor="#FF0000" color="white" text="Cancel" onClick={close}></Button>
                            <Button backgroundColor="#3AB972" color="white" text="Delete" onClick={DeleteClient}></Button>
                        </ButtonContainer>
                    </RemoveClientModalContentBody>
                </RemoveClientModalContentContainer>
            )}
        </RemoveClientModalBackground>
    )
}

export default RemoveClientModal

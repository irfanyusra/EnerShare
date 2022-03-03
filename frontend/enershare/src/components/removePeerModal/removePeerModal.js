import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import { getUserId } from "../../helperFunctions/getUserId"
import Loader from "../loader/loader"
import Button from "../../components/inputs/buttons/button"

import {
    BuyModalBackground,
    BuyModalContentContainer,
    BuyModalContentBody,
    BuyModalContentHeader,
    ButtonContainer,
    PurchaseSummaryTable,
    PurchaseSummaryTableDataContainer,
    BuyModalTitle,
    PurchaseSummaryTableDataLeft,
    PurchaseSummaryTableDataRight,
    PurchaseSummaryPriceContainer,
    PurchaseSummaryPrice,
} from "./removePeerModal.styled"

const user_id = getUserId()

const RemovePeerModal = ({ addPeerModalOpen, close }) => {
    const [loading, setLoading] = useState(false);
    const contentRef = useRef()

    const Submit = async () => {
        try {
            setLoading(true);
            // await axios.post("http://localhost:8080/api/enrollPeerUser", { posting_id, user_id });
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

    if (!addPeerModalOpen) return null
    return (
        <BuyModalBackground>
            {loading ? (<Loader />) : (
                <BuyModalContentContainer>
                    <BuyModalContentHeader>
                        <BuyModalTitle>Add Peer Information</BuyModalTitle>
                    </BuyModalContentHeader>
                    <BuyModalContentBody ref={contentRef}>

                        <PurchaseSummaryPriceContainer>
                            <PurchaseSummaryPrice>
                                Q
                            </PurchaseSummaryPrice>
                        </PurchaseSummaryPriceContainer>
                        &nbsp;
                        <PurchaseSummaryTable>
                            <tr>
                                <PurchaseSummaryTableDataContainer>
                                    <PurchaseSummaryTableDataLeft>Peer Name</PurchaseSummaryTableDataLeft>
                                    {/* <PurchaseSummaryTableDataRight>{amount_energy} kWh</PurchaseSummaryTableDataRight> */}
                                </PurchaseSummaryTableDataContainer>
                            </tr>
                            <tr>
                                <PurchaseSummaryTableDataContainer>
                                    <PurchaseSummaryTableDataLeft>Description</PurchaseSummaryTableDataLeft>
                                    {/* <PurchaseSummaryTableDataRight>${rate}/kWh</PurchaseSummaryTableDataRight> */}
                                </PurchaseSummaryTableDataContainer>
                            </tr>
                        </PurchaseSummaryTable>
                        &nbsp;
                        <ButtonContainer>
                            <Button backgroundColor="#FF0000" color="white" text="Cancel" onClick={close}></Button>
                            <Button backgroundColor="#3AB972" color="white" text="Add Peer" onClick={Submit}></Button>
                        </ButtonContainer>
                    </BuyModalContentBody>
                </BuyModalContentContainer>
            )}
        </BuyModalBackground>
    )
}

export default RemovePeerModal

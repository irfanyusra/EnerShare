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
} from "../buyModal/buyModal.styled"



const BuyModal = ({ buyModalOpen, close, selectedPosting: { _id, amount_energy, rate, price } }) => {
    const user_id = getUserId()
    const [loading, setLoading] = useState(false);
    console.log("POSTING TO BUY: " + _id)
    console.log("USER BUY: " + user_id)
    const contentRef = useRef()
    const posting_id = _id

    const Submit = async () => {
        try {
            setLoading(true);
            await axios.put("http://localhost:8080/api/buyPosting", { posting_id, user_id });
            alert("Successful Purchase!");
        } catch (err) {
            if (err && err.response) {
                console.log(err.response.data);
                alert(err.response.data);
            }
        }
        setLoading(false);
        close();
        window.location.reload()
    }

    if (!buyModalOpen) return null
    return (
        <BuyModalBackground>
            {loading ? (<Loader />) : (
                <BuyModalContentContainer>
                    <BuyModalContentHeader>
                        <BuyModalTitle>Confirm Purchase</BuyModalTitle>
                    </BuyModalContentHeader>
                    <BuyModalContentBody ref={contentRef}>

                        <PurchaseSummaryPriceContainer>
                            <PurchaseSummaryPrice>
                                ${price}
                            </PurchaseSummaryPrice>
                        </PurchaseSummaryPriceContainer>
                        &nbsp;
                        <PurchaseSummaryTable>
                            <tr>
                                <PurchaseSummaryTableDataContainer>
                                    <PurchaseSummaryTableDataLeft>Amount of Energy</PurchaseSummaryTableDataLeft>
                                    <PurchaseSummaryTableDataRight>{amount_energy} kWh</PurchaseSummaryTableDataRight>
                                </PurchaseSummaryTableDataContainer>
                            </tr>
                            <tr>
                                <PurchaseSummaryTableDataContainer>
                                    <PurchaseSummaryTableDataLeft>Rate</PurchaseSummaryTableDataLeft>
                                    <PurchaseSummaryTableDataRight>${rate}/kWh</PurchaseSummaryTableDataRight>
                                </PurchaseSummaryTableDataContainer>
                            </tr>
                        </PurchaseSummaryTable>
                        &nbsp;
                        <ButtonContainer>
                            <Button backgroundColor="#FF0000" color="white" text="Cancel" onClick={close}></Button>
                            <Button backgroundColor="#3AB972" color="white" text="Purchase" onClick={Submit}></Button>
                        </ButtonContainer>
                    </BuyModalContentBody>
                </BuyModalContentContainer>
            )}
        </BuyModalBackground>
    )
}

export default BuyModal

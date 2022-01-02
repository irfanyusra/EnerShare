import React, { useEffect, useRef } from "react";
import axios from 'axios';
import { getUserId } from "../../helperFunctions/getUserId"

import {
    BuyModalBackground,
    BuyModalContent,
    PurchaseButton,
    CancelButton,
    ButtonsContainer,
    PurchaseSummaryTable,
    PurchaseSummaryTableData,
    BuyModalTitle,
} from "../buyModal/buyModal.styled"

const user_id = getUserId()

const BuyModal = ({ buyModalOpen, close, postingId, energyAmount, rate, price }) => {
    console.log("POSTING TO BUY: " + postingId)
    const contentRef = useRef()
    const posting_id = postingId;

    const Submit = async () => {

        await axios.put("http://localhost:8080/api/buyPosting", { posting_id, user_id }).catch((err) => {
            if (err && err.response) {
                console.log(err);
            }
            else {
                alert("Successful Purchase!");
            }
        });

        close();
    }

    useEffect(() => {
        if (!buyModalOpen) return

        function listener(event) {
            if (contentRef.current?.contains(event.target)) return
            close()
        }

        window.addEventListener('click', listener)

        return () => window.removeEventListener('click', listener)
    }, [buyModalOpen])

    if (!buyModalOpen) return null
    return (
        <BuyModalBackground>
            <BuyModalContent ref={contentRef}>
                <BuyModalTitle>Confirm Order </BuyModalTitle>&nbsp;&nbsp;
                <PurchaseSummaryTable>
                    <tr>
                        <PurchaseSummaryTableData>Amount of Energy</PurchaseSummaryTableData>
                        <PurchaseSummaryTableData>{energyAmount} kWh</PurchaseSummaryTableData>
                    </tr>
                    <tr>
                        <PurchaseSummaryTableData>Rate</PurchaseSummaryTableData>
                        <PurchaseSummaryTableData>${rate}/kWh</PurchaseSummaryTableData>
                    </tr>
                    <tr>
                        <PurchaseSummaryTableData>Total Price</PurchaseSummaryTableData>
                        <PurchaseSummaryTableData>${price}</PurchaseSummaryTableData>
                    </tr>
                </PurchaseSummaryTable>
                &nbsp;
                <ButtonsContainer>
                    <PurchaseButton onClick={Submit}>Purchase</PurchaseButton>
                    &nbsp;
                    <CancelButton onClick={close}>Cancel</CancelButton>
                </ButtonsContainer>
            </BuyModalContent>
        </BuyModalBackground>
    )
}

export default BuyModal

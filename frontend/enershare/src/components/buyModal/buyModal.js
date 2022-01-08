import React, { useState, useRef, useEffect} from "react";
import axios from 'axios';
import { getUserId } from "../../helperFunctions/getUserId"
import Loader from "../loader/loader"

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

const BuyModal = ({ buyModalOpen, close, selectedPosting: { _id, amount_energy, rate, price } }) => {
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
                console.log(err);
                alert(err);
            }
        }
        setLoading(false);
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
    }, [buyModalOpen, close])

    if (!buyModalOpen) return null
    return (
        <BuyModalBackground>
            {loading ? (<Loader />) : (
                <BuyModalContent ref={contentRef}>
                    <BuyModalTitle>Confirm Order </BuyModalTitle> &nbsp;
                    <PurchaseSummaryTable>
                        <tr>
                            <PurchaseSummaryTableData>Amount of Energy</PurchaseSummaryTableData>
                            <PurchaseSummaryTableData>{amount_energy} kWh</PurchaseSummaryTableData>
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
                        <CancelButton onClick={close}>Cancel</CancelButton>
                        &nbsp;
                        <PurchaseButton onClick={Submit}>Purchase</PurchaseButton>
                    </ButtonsContainer>
                </BuyModalContent>
            )}
        </BuyModalBackground>
    )
}

export default BuyModal

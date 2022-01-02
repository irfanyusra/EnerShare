import React, { useEffect, useRef } from "react";

import {
    BuyModalBackground,
    BuyModalContent,
    CancelButton,
} from "../buyModal/buyModal.styled"

const BuyModal = ({ buyModalOpen, close, postingId }) => {
    console.log("POSTING TO BUY: " + postingId)
    const contentRef = useRef()

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
                BUY STUFF
                {/* TODO: Nick add the buy stuff here */}
                <CancelButton onClick={close}>Cancel</CancelButton>
            </BuyModalContent>
        </BuyModalBackground>
    )
}

export default BuyModal

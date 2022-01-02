import React, { useState, useEffect } from "react"

import { BsFillBagPlusFill } from "react-icons/bs"

import NavigationBar from "../../components/navigationBar/navigationBar"
import BuyModal from "../../components/buyModal/buyModal"

import {
    MarketplaceLayout,
    MarketplaceColumn,
    MarketplaceTitle,
    MarketplaceListingContainer,
    MarketplaceListings,
    MarketplaceHeadingRow,
    MarketplaceListingRow,
    MarketplaceListingHeading,
    MarketplaceListingData,
    BuyButton,
} from './marketplace.styled'

let mockPostings = [
    {
        id: 1,
        timestamp: 1640817844783,
        amount_energy: 30,
        rate: '$10/kWh',
        price: 100,
    },
    {
        id: 2,
        timestamp: 1640817844783,
        amount_energy: 20,
        rate: '$10/kWh',
        price: 110,
    },
]

const Marketplace = () => {
    const [buyModalOpen, setBuyModalOpen] = useState(false)
    const [postingSelectedId, setPostingSelectedId] = useState('')

    //   useEffect(() => {
    //     //TODO: REPLACE WITH AXIOS CALL TO BACKEND
    //   }, [])

    { console.log(buyModalOpen) }
    return (
        <MarketplaceLayout>
            <NavigationBar></NavigationBar>
            <MarketplaceColumn>
                <BuyModal buyModalOpen={buyModalOpen} close={() => setBuyModalOpen(false)} postingId={postingSelectedId} />
                <MarketplaceTitle>Marketplace</MarketplaceTitle>
                <MarketplaceListingContainer>
                    <MarketplaceListings>
                        <MarketplaceHeadingRow>
                            <MarketplaceListingHeading>Date</MarketplaceListingHeading>
                            <MarketplaceListingHeading>Amount of Energy</MarketplaceListingHeading>
                            <MarketplaceListingHeading>Rate</MarketplaceListingHeading>
                            <MarketplaceListingHeading>Price</MarketplaceListingHeading>
                            <MarketplaceListingHeading>Buy</MarketplaceListingHeading>
                        </MarketplaceHeadingRow>
                        {mockPostings.map((item, id) => (
                            <MarketplaceListingRow key={id}>
                                <MarketplaceListingData>{item.timestamp}</MarketplaceListingData>
                                <MarketplaceListingData>{item.amount_energy}</MarketplaceListingData>
                                <MarketplaceListingData>{item.rate}</MarketplaceListingData>
                                <MarketplaceListingData>{item.price}</MarketplaceListingData>
                                <MarketplaceListingData>
                                    <BuyButton onClick={() => {
                                        setBuyModalOpen(true)
                                        setPostingSelectedId(item.id)
                                    }}><BsFillBagPlusFill /></BuyButton>
                                </MarketplaceListingData>
                            </MarketplaceListingRow>
                        ))}
                    </MarketplaceListings>
                </MarketplaceListingContainer>
            </MarketplaceColumn>
        </MarketplaceLayout>
    )
}

export default Marketplace
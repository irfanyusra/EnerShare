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
        rate: 10,
        price: 300,
    },
    {
        id: 2,
        timestamp: 1640817844783,
        amount_energy: 20,
        rate: 10,
        price: 200,
    },
]

const Marketplace = () => {
    const [buyModalOpen, setBuyModalOpen] = useState(false)
    const [postingSelectedId, setPostingSelectedId] = useState('')
    const [postingSelectedEnergyAmount, setPostingSelectedEnergyAmount] = useState('')
    const [postingSelectedRate, setPostingSelectedRate] = useState('')
    const [postingSelectedPrice, setPostingSelectedPrice] = useState('')

    //   useEffect(() => {
    //     //TODO: REPLACE WITH AXIOS CALL TO BACKEND
    //   }, [])

    { console.log(buyModalOpen) }
    return (
        <MarketplaceLayout>
            <NavigationBar></NavigationBar>
            <MarketplaceColumn>
                <BuyModal buyModalOpen={buyModalOpen} close={() => setBuyModalOpen(false)} postingId={postingSelectedId} energyAmount={postingSelectedEnergyAmount} rate={postingSelectedRate} price={postingSelectedPrice} />
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
                                <MarketplaceListingData>{item.amount_energy} kWh</MarketplaceListingData>
                                <MarketplaceListingData>${item.rate}/kWh</MarketplaceListingData>
                                <MarketplaceListingData>${item.price}</MarketplaceListingData>
                                <MarketplaceListingData>
                                    <BuyButton onClick={() => {
                                        setBuyModalOpen(true)
                                        setPostingSelectedId(item.id)
                                        setPostingSelectedEnergyAmount(item.amount_energy)
                                        setPostingSelectedRate(item.rate)
                                        setPostingSelectedPrice(item.price)
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
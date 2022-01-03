import React, { useState, useEffect } from "react"
import axios from "axios"

import { BsFillBagPlusFill } from "react-icons/bs"
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

// let mockPostings = [
//     {
//         id: 1,
//         timestamp: 1640817844783,
//         amount_energy: 30,
//         rate: 10,
//         price: 300,
//     },
//     {
//         id: 2,
//         timestamp: 1640817844783,
//         amount_energy: 20,
//         rate: 10,
//         price: 200,
//     },
// ]

const Marketplace = () => {
    const [buyModalOpen, setBuyModalOpen] = useState(false)
    const [postings, setPostings] = useState([])
    const [selectedPosting, setSelectedPosting] = useState({})

    useEffect(() => {
        const response = axios.get("http://localhost:8080/api/allActivePostings")
            .then((resp) => {
                console.log('allActivePostings')
                console.log(resp)
                let sortedPostings = resp.data.response.sort((b, a) => ((a.date < b.date) ? -1 : ((a.date > b.date) ? 1 : 0)))
                setPostings(sortedPostings)
            })
            .catch((err) => {
                if (err)
                    console.log(err)
            })
    }, [])

    return (
        <MarketplaceLayout>
            <MarketplaceColumn>
                <BuyModal buyModalOpen={buyModalOpen} close={() => setBuyModalOpen(false)} selectedPosting={selectedPosting} />
                {/* <MarketplaceTitle>Marketplace</MarketplaceTitle> */}
                <MarketplaceListingContainer>
                    <MarketplaceListings>
                        <MarketplaceHeadingRow>
                            <MarketplaceListingHeading>Date</MarketplaceListingHeading>
                            <MarketplaceListingHeading>Amount of Energy</MarketplaceListingHeading>
                            <MarketplaceListingHeading>Rate</MarketplaceListingHeading>
                            <MarketplaceListingHeading>Price</MarketplaceListingHeading>
                            <MarketplaceListingHeading>Buy</MarketplaceListingHeading>
                        </MarketplaceHeadingRow>
                        {postings.map((item, id) => {
                            console.log(item.timestamp)
                            let dateNow = Date.parse(item.timestamp)
                            return (
                                <MarketplaceListingRow key={id}>
                                    <MarketplaceListingData> {Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'short' }).format(dateNow)}</MarketplaceListingData>
                                    <MarketplaceListingData>{item.amount_energy} kWh</MarketplaceListingData>
                                    <MarketplaceListingData>${item.rate}/kWh</MarketplaceListingData>
                                    <MarketplaceListingData>${item.price}</MarketplaceListingData>
                                    <MarketplaceListingData>
                                        <BuyButton onClick={() => {
                                            setBuyModalOpen(true)
                                            setSelectedPosting(item)
                                        }}><BsFillBagPlusFill /></BuyButton>
                                    </MarketplaceListingData>
                                </MarketplaceListingRow>
                            )
                        })}
                    </MarketplaceListings>
                </MarketplaceListingContainer>
            </MarketplaceColumn>
        </MarketplaceLayout>
    )
}

export default Marketplace
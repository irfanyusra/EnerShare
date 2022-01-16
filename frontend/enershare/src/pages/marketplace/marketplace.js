import React, { useState, useEffect } from "react"
import axios from "axios"

import { BsFillBagPlusFill } from "react-icons/bs"
import BuyModal from "../../components/buyModal/buyModal"
import { getUserId } from "../../helperFunctions/getUserId"
import Loader from "../../components/loader/loader"

import {
    MarketplaceLayout,
    MarketplaceColumn,
    MarketplaceListingContainer,
    MarketplaceListings,
    MarketplaceHeadingRow,
    MarketplaceListingRow,
    MarketplaceListingHeading,
    MarketplaceListingData,
    BuyButton,
    MarketplaceListingContainerContent,
    MarketplaceNoListingRow,
} from './marketplace.styled'

const Marketplace = () => {
    const userId = getUserId()
    const [buyModalOpen, setBuyModalOpen] = useState(false)
    const [postings, setPostings] = useState([])
    const [selectedPosting, setSelectedPosting] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:8080/api/allActivePostings/${userId}`)
            .then((resp) => {
                console.log('allActivePostings')
                console.log(resp)
                let sortedPostings = resp.data.response.sort((b, a) => ((a.timestamp < b.timestamp) ? -1 : ((a.timestamp > b.timestamp) ? 1 : 0)))
                setPostings(sortedPostings)
                setLoading(false);
            })
            .catch((err) => {
                if (err) {
                    console.log(err);
                }
                setLoading(false);
            })
    }, [userId])

    return (
        <MarketplaceLayout>
            <MarketplaceColumn>
                <BuyModal buyModalOpen={buyModalOpen} close={() => setBuyModalOpen(false)} selectedPosting={selectedPosting} />
                <MarketplaceListingContainer>
                    {loading ? (<Loader />) : (
                        <MarketplaceListings>
                            <MarketplaceHeadingRow>
                                <MarketplaceListingHeading>Date</MarketplaceListingHeading>
                                <MarketplaceListingHeading>Amount of Energy</MarketplaceListingHeading>
                                <MarketplaceListingHeading>Rate</MarketplaceListingHeading>
                                <MarketplaceListingHeading>Price</MarketplaceListingHeading>
                                <MarketplaceListingHeading>Buy</MarketplaceListingHeading>
                            </MarketplaceHeadingRow>
                            <MarketplaceListingContainerContent>
                                {postings.length === 0 && (
                                    <MarketplaceNoListingRow>There are no energy listings at the moment</MarketplaceNoListingRow>
                                )}
                                {postings.map((item, id) => {
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
                            </MarketplaceListingContainerContent>
                        </MarketplaceListings>
                    )}
                </MarketplaceListingContainer>
            </MarketplaceColumn>
        </MarketplaceLayout>
    )
}

export default Marketplace
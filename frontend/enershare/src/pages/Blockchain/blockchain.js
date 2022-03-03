import React, { useState, useEffect } from "react"
import axios from "axios"

import AddPeerModal from "../../components/addPeerModal/addPeerModal"
import AddClientModal from "../../components/addClientModal/addClientModal"
import RemoveClientModal from "../../components/removeClientModal/removeClientModal"

import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill } from "react-icons/bs"
import { getUserId } from "../../helperFunctions/getUserId"
import Loader from "../../components/loader/loader"
import Button from "../../components/inputs/buttons/button"

import {
    TitleText,
    BlockchainLayout,
    BlockchainColumn,
    BlockchainContainer,
    BlockchainTitleContainer,
    BlockchainPeers,
    BlockchainClients,
    BlockchainHeadingRowPeer,
    BlockchainHeadingRowClient,
    BlockchainRow,
    BlockchainHeading,
    BlockchainData,
    BlockchainContainerContent,
    BlockchainNoDataRow,
    ButtonContainer,
    RemoveButton,
} from './blockchain.styled'

const Blockchain = () => {
    const user_id = getUserId()
    const [addPeerModalOpen, setAddPeerModalOpen] = useState(false)
    const [removePeerModalOpen, setRemovePeerModalOpen] = useState(false)
    const [addClientModalOpen, setAddClientModalOpen] = useState(false)
    const [removeClientModalOpen, setRemoveClientModalOpen] = useState(false)
    const [peers, setPeers] = useState([])
    const [clients, setClients] = useState([])
    const [selectedPeer, setSelectedPeer] = useState({})
    const [selectedClient, setSelectedClient] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true);
        // Get the Peers in the blockchain
        axios.get(`http://localhost:8080/api/enrollClients/`)
            .then((resp) => {
                console.log('allActivePeers')
                console.log(resp)
                let sortedPostings = resp.data.response.sort((b, a) => (a.localeCompare(b)))
                setPeers(sortedPostings)
                setLoading(false);
            })
            .catch((err) => {
                if (err) {
                    console.log(err);
                }
                setLoading(false);
            })

        // Get the Clients in the blockchain
        axios.get(`http://localhost:8080/api/blockchainClients/`)
            .then((resp) => {
                console.log('Getting All Clients')
                console.log(resp)
                let sortedPostings = resp.data.response.sort((b, a) => ((a.client_name).localeCompare(b.client_name)))
                setClients(sortedPostings)
                setLoading(false);
            })
            .catch((err) => {
                if (err) {
                    console.log(err);
                }
                setLoading(false);
            })
    }, [user_id])

    async function ChangePeerStatus(item, isStatusUp) {
        try {
            setLoading(true);
            let peerName = item.username
            if (isStatusUp) {
                // Change Peer status to Down
                await axios.post("http://localhost:8080/api/downPeer/", { peerName });
            }
            else {
                // Change Peer status to Up
                await axios.post("http://localhost:8080/api/upPeer/", { peerName });
            }
            console.log('Peer Status Successfully Changed!')
            alert('Peer Status Successfully Changed!')
        } catch (err) {
            if (err && err.response) {
                console.log(err.response.data);
                alert(err.response.data);
            }
        }
        setLoading(false);
        window.reload()
    }

    return (
        <BlockchainLayout>
            {loading ? (<Loader />) : (
                <BlockchainColumn>
                    <AddPeerModal addPeerModalOpen={addPeerModalOpen} close={() => setAddPeerModalOpen(false)} selectedPosting={selectedPeer} />
                    <AddClientModal addClientModalOpen={addClientModalOpen} close={() => setAddClientModalOpen(false)} selectedPosting={selectedClient} />
                    <RemoveClientModal removeClientModalOpen={removeClientModalOpen} close={() => setRemovePeerModalOpen(false)} selectedPosting={selectedPeer} />
                    <BlockchainTitleContainer>
                        <TitleText>Peers</TitleText>
                        <ButtonContainer>
                            <Button text-align="right;" backgroundColor="#3AB972" color="white" text="Add Peer" onClick={() => {
                                setAddPeerModalOpen(true)
                            }} />
                        </ButtonContainer>
                    </BlockchainTitleContainer>
                    <BlockchainContainer>
                        <BlockchainPeers>
                            <BlockchainHeadingRowPeer>
                                <BlockchainHeading>Name</BlockchainHeading>
                                <BlockchainHeading>Port</BlockchainHeading>
                                <BlockchainHeading>Status</BlockchainHeading>
                                <BlockchainHeading>Created On</BlockchainHeading>
                                <BlockchainHeading>Change Peer Status</BlockchainHeading>
                            </BlockchainHeadingRowPeer>
                            <BlockchainContainerContent>
                                {peers.length === 0 && (
                                    <BlockchainNoDataRow>There are no Peers at the moment</BlockchainNoDataRow>
                                )}
                                {peers.map((item, id) => {
                                    <BlockchainRow key={id}>
                                        <BlockchainData>{item.username}</BlockchainData>
                                        <BlockchainData>{item.port}</BlockchainData>
                                        <BlockchainData>{item.status.indexOf("up" > 0) ? (
                                            <div color="green;">Up</div>
                                        ) : (
                                            <div color="red;">Down</div>
                                        )}</BlockchainData>
                                        <BlockchainData>{item.created_on}</BlockchainData>
                                        <BlockchainData>
                                            {item.status.indexOf("up" > 0) ? (
                                                <BsFillArrowDownCircleFill color="red;" onClick={() => {
                                                    ChangePeerStatus(item, true)
                                                }} />
                                            ) : (
                                                <BsFillArrowUpCircleFill color="green;" onClick={() => {
                                                    ChangePeerStatus(item, false)
                                                }} />
                                            )}
                                        </BlockchainData>
                                    </BlockchainRow>
                                })}
                            </BlockchainContainerContent>
                        </BlockchainPeers>
                    </BlockchainContainer>
                    &nbsp;
                    <BlockchainTitleContainer>
                        <TitleText>Clients</TitleText>
                        <ButtonContainer>
                            <Button text-align="right;" type="submit" backgroundColor="#3AB972" color="white" text="Add Client" onClick={() => {
                                setAddClientModalOpen(true)
                            }} />
                        </ButtonContainer>
                    </BlockchainTitleContainer>
                    <BlockchainContainer>
                        <BlockchainClients>
                            <BlockchainHeadingRowClient>
                                <BlockchainHeading>Name</BlockchainHeading>
                                <BlockchainHeading>Remove Client</BlockchainHeading>
                            </BlockchainHeadingRowClient>
                            <BlockchainContainerContent>
                                {clients.length === 0 && (
                                    <BlockchainNoDataRow>There are no Clients at the moment</BlockchainNoDataRow>
                                )}
                                {clients.map((item, id) => {
                                    <BlockchainRow key={id}>
                                        <BlockchainData>{item.client_name}</BlockchainData>
                                        <BlockchainData>
                                            {/* <RemoveButton onClick={() => {
                                                setRemoveClientModalOpen(true)
                                                setSelectedClient(item)
                                            }}></RemoveButton> */}
                                        </BlockchainData>
                                    </BlockchainRow>
                                })}
                            </BlockchainContainerContent>
                        </BlockchainClients>
                    </BlockchainContainer>
                    &nbsp;
                    <BlockchainTitleContainer>
                        <TitleText>Metrics</TitleText>
                    </BlockchainTitleContainer>
                    <BlockchainContainer>
                        <iframe width="100%" height="400" src="http://localhost:3001/" allowfullscreen>
                            <p>
                                <a href="/">
                                    Metrics
                                </a>
                            </p>
                        </iframe>
                    </BlockchainContainer>
                </BlockchainColumn>
            )}
        </BlockchainLayout >
    )
}

export default Blockchain
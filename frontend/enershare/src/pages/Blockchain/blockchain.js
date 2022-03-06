import React, { useState, useEffect } from "react"
import axios from "axios"

import AddPeerModal from "../../components/addPeerModal/addPeerModal"
import AddClientModal from "../../components/addClientModal/addClientModal"
import RemoveClientModal from "../../components/removeClientModal/removeClientModal"

import { IconContext } from "react-icons"
import { IoRemoveCircle } from "react-icons/io5"
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
    BlockchainOrderers,
    BlockchainHeadingRowPeer,
    BlockchainHeadingRowClient,
    BlockchainHeadingRowOrderer,
    BlockchainRow,
    BlockchainHeading,
    BlockchainData,
    BlockchainContainerContent,
    BlockchainNoDataRow,
    ButtonContainer,
    RemoveButton,
    BlockchainClientRow,
} from './blockchain.styled'

const Blockchain = () => {
    const user_id = getUserId()
    const [addPeerModalOpen, setAddPeerModalOpen] = useState(false)
    const [addClientModalOpen, setAddClientModalOpen] = useState(false)
    const [removeClientModalOpen, setRemoveClientModalOpen] = useState(false)
    const [peers, setPeers] = useState([])
    const [clients, setClients] = useState([])
    const [orderers, setOrderers] = useState([])
    const [selectedClient, setSelectedClient] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(async () => {
        try {
            let resp, sortedPostings
            setLoading(true);
            // Get the Peers in the blockchain
            resp = await axios.get(`http://localhost:8080/api/peers/`)
            console.log('Getting All Peers')
            console.log(resp)
            sortedPostings = resp.data.response.sort((b, a) => ((a.peer_name).localeCompare(b.peer_name)))
            setPeers(sortedPostings)

            // Get the Clients in the blockchain
            resp = await axios.get(`http://localhost:8080/api/blockchainClients/`)
            console.log('Getting All Clients')
            console.log(resp)
            sortedPostings = resp.data.response.sort((b, a) => ((a.client_name).localeCompare(b.client_name)))
            setClients(sortedPostings)

            // Get the Orderers in the blockchain
            resp = await axios.get(`http://localhost:8080/api/orderers/`)
            console.log('Getting All Orderers')
            console.log(resp)
            sortedPostings = resp.data.response.sort((b, a) => ((a.orderer_name).localeCompare(b.orderer_name)))
            setOrderers(sortedPostings)
            setLoading(false);
        } catch (err) {
            if (err) {
                console.log(err);
            }
            setLoading(false);
        }
    }, [user_id])

    async function ChangePeerStatus(item, isStatusUp) {
        try {
            setLoading(true);
            let peerName = item.peer_name
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
            }
        }
        setLoading(false);
        window.location.reload()
    }

    async function ChangeOrdererStatus(item, isStatusUp) {
        try {
            setLoading(true);
            let ordererName = item.orderer_name
            if (isStatusUp) {
                // Change Peer status to Down
                await axios.post("http://localhost:8080/api/downOrderer/", { ordererName });
            }
            else {
                // Change Peer status to Up
                await axios.post("http://localhost:8080/api/upOrderer/", { ordererName });
            }
            console.log('Orderer Status Successfully Changed!')
            alert('Orderer Status Successfully Changed!')
        } catch (err) {
            if (err && err.response) {
                console.log(err.response.data);
                alert(err.response.data);
            }
        }
        setLoading(false);
        window.location.reload()
    }

    return (
        <BlockchainLayout>
            {loading ? (<Loader />) : (
                <BlockchainColumn>
                    <AddPeerModal addPeerModalOpen={addPeerModalOpen} close={() => setAddPeerModalOpen(false)} />
                    <AddClientModal addClientModalOpen={addClientModalOpen} close={() => setAddClientModalOpen(false)} />
                    <RemoveClientModal removeClientModalOpen={removeClientModalOpen} close={() => setRemoveClientModalOpen(false)} selectedClient={selectedClient} />
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
                                <BlockchainHeading>Created</BlockchainHeading>
                                <BlockchainHeading>Change Peer Status</BlockchainHeading>
                            </BlockchainHeadingRowPeer>
                            <BlockchainContainerContent>
                                {peers.length === 0 && (
                                    <BlockchainNoDataRow>There are no Peers at the moment</BlockchainNoDataRow>
                                )}
                                {peers.map((item, id) => (
                                    < BlockchainRow key={id} >
                                        <BlockchainData>{item.peer_name}</BlockchainData>
                                        <BlockchainData>{item.port}</BlockchainData>
                                        <BlockchainData>{(item.port != "") ? (
                                            <div style={{ color: "green" }}>{item.status}</div>
                                        ) : (
                                            <div style={{ color: "red" }}>{item.status}</div>
                                        )}</BlockchainData>
                                        <BlockchainData>{item.created_on}</BlockchainData>
                                        <BlockchainData>
                                            {(item.port != "") ? (
                                                <IconContext.Provider value={{ color: 'red', size: '30px' }}>
                                                    <BsFillArrowDownCircleFill style={{ cursor: "pointer" }} onClick={() => {
                                                        ChangePeerStatus(item, true)
                                                    }} />
                                                </IconContext.Provider>
                                            ) : (
                                                <IconContext.Provider value={{ color: 'green', size: '30px' }}>
                                                    <BsFillArrowUpCircleFill style={{ cursor: "pointer" }} onClick={() => {
                                                        ChangePeerStatus(item, false)
                                                    }} />
                                                </IconContext.Provider>
                                            )}
                                        </BlockchainData>
                                    </BlockchainRow>
                                ))}
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
                                {clients.map((item, id) => (
                                    <BlockchainClientRow key={id}>
                                        <BlockchainData>{item.client_name}</BlockchainData>
                                        <BlockchainData>
                                            <IconContext.Provider value={{ color: 'red', size: '30px' }}>
                                                <IoRemoveCircle style={{ cursor: "pointer" }} onClick={() => {
                                                    setSelectedClient(item)
                                                    setRemoveClientModalOpen(true)
                                                }} />
                                            </IconContext.Provider>
                                        </BlockchainData>
                                    </BlockchainClientRow>
                                ))}
                            </BlockchainContainerContent>
                        </BlockchainClients>
                    </BlockchainContainer>
                    &nbsp;
                    <BlockchainTitleContainer>
                        <TitleText>Orderers</TitleText>
                    </BlockchainTitleContainer>
                    <BlockchainContainer>
                        <BlockchainOrderers>
                            <BlockchainHeadingRowOrderer>
                                <BlockchainHeading>Name</BlockchainHeading>
                                <BlockchainHeading>Port</BlockchainHeading>
                                <BlockchainHeading>Status</BlockchainHeading>
                                <BlockchainHeading>Created</BlockchainHeading>
                                <BlockchainHeading>Change Orderer Status</BlockchainHeading>
                            </BlockchainHeadingRowOrderer>
                            <BlockchainContainerContent>
                                {orderers.length === 0 && (
                                    <BlockchainNoDataRow>There are no Orderers at the moment</BlockchainNoDataRow>
                                )}
                                {orderers.map((item, id) => (
                                    < BlockchainRow key={id} >
                                        <BlockchainData>{item.orderer_name}</BlockchainData>
                                        <BlockchainData>{item.port}</BlockchainData>
                                        <BlockchainData>{(item.port != "") ? (
                                            <div style={{ color: "green" }}>{item.status}</div>
                                        ) : (
                                            <div style={{ color: "red" }}>{item.status}</div>
                                        )}</BlockchainData>
                                        <BlockchainData>{item.created_on}</BlockchainData>
                                        <BlockchainData>
                                            {(item.port != "") ? (
                                                <IconContext.Provider value={{ color: 'red', size: '30px' }}>
                                                    <BsFillArrowDownCircleFill style={{ cursor: "pointer" }} onClick={() => {
                                                        ChangeOrdererStatus(item, true)
                                                    }} />
                                                </IconContext.Provider>
                                            ) : (
                                                <IconContext.Provider value={{ color: 'green', size: '30px' }}>
                                                    <BsFillArrowUpCircleFill style={{ cursor: "pointer" }} onClick={() => {
                                                        ChangeOrdererStatus(item, false)
                                                    }} />
                                                </IconContext.Provider>
                                            )}
                                        </BlockchainData>
                                    </BlockchainRow>
                                ))}
                            </BlockchainContainerContent>
                        </BlockchainOrderers>
                    </BlockchainContainer>
                    &nbsp;
                    <BlockchainTitleContainer>
                        <TitleText>Metrics</TitleText>
                    </BlockchainTitleContainer>
                    <BlockchainContainer>
                        <iframe width="100%" height="400" src="http://127.0.0.1:3000/?orgId=1" allowFullScreen />
                    </BlockchainContainer>
                    <BlockchainContainer>
                        <p>
                            <a href="http://127.0.0.1:3000/?orgId=1" target="_blank">
                                Open Metrics in a New Tab
                            </a>
                        </p>
                    </BlockchainContainer>
                </BlockchainColumn>
            )
            }
        </BlockchainLayout >
    )
}

export default Blockchain
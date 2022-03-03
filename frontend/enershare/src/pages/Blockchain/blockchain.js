import React, { useState, useEffect } from "react"
import axios from "axios"

import AddPeerModal from "../../components/addPeerModal/addPeerModal"
import AddClientModal from "../../components/addClientModal/addClientModal"
import RemovePeerModal from "../../components/removePeerModal/removePeerModal"
import RemoveClientModal from "../../components/removeClientModal/removeClientModal"

import { CgUserRemove } from "react-icons/cg"
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
                // let sortedPostings = resp.data.response.sort((b, a) => ((a.timestamp < b.timestamp) ? -1 : ((a.timestamp > b.timestamp) ? 1 : 0)))
                // setPeers(resp.data.response)
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
                // let sortedPostings = resp.data.response.sort((b, a) => ((a.timestamp < b.timestamp) ? -1 : ((a.timestamp > b.timestamp) ? 1 : 0)))
                // setClients(resp.data.response)
                setLoading(false);
            })
            .catch((err) => {
                if (err) {
                    console.log(err);
                }
                setLoading(false);
            })
    }, [user_id])

    return (
        <BlockchainLayout>
            {loading ? (<Loader />) : (
                <BlockchainColumn>
                    <AddPeerModal addPeerModalOpen={addPeerModalOpen} close={() => setAddPeerModalOpen(false)} selectedPosting={selectedPeer} />
                    <AddClientModal addClientModalOpen={addClientModalOpen} close={() => setAddClientModalOpen(false)} selectedPosting={selectedClient} />
                    <RemovePeerModal removePeerModalOpen={removePeerModalOpen} close={() => setRemovePeerModalOpen(false)} selectedPosting={selectedPeer} />
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
                                <BlockchainHeading>Activated On</BlockchainHeading>
                                <BlockchainHeading>Remove Peer</BlockchainHeading>
                            </BlockchainHeadingRowPeer>
                            <BlockchainContainerContent>
                                {peers.length === 0 && (
                                    <BlockchainNoDataRow>There are no Peers at the moment</BlockchainNoDataRow>
                                )}
                                {peers.map((item, id) => {
                                    <BlockchainRow key={id}>
                                        <BlockchainData>{item.username}</BlockchainData>
                                        <BlockchainData>{item.status}</BlockchainData>
                                        <BlockchainData>{item.created_on}</BlockchainData>
                                        <BlockchainData>
                                            <RemoveButton onClick={() => {
                                                setRemovePeerModalOpen(true)
                                                setSelectedPeer(item)
                                            }}><CgUserRemove /></RemoveButton>
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
                                        <BlockchainData>{item.username}</BlockchainData>
                                        <BlockchainData>
                                            <RemoveButton onClick={() => {
                                                setRemoveClientModalOpen(true)
                                                setSelectedClient(item)
                                            }}><CgUserRemove /></RemoveButton>
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
                        <iframe width="100%;" height="400" src="http://localhost:3000/" allowfullscreen sandbox="" >
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
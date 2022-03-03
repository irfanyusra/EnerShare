import styled from 'styled-components'

export const BlockchainLayout = styled.div`
  height: 100%;
  width: 100%;
  background-color: white;
  display: flex;
  padding: 1.5rem;
`

export const BlockchainColumn = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
`

export const BlockchainTitleContainer = styled.div`
    width: 100%;
    display: block;
    flex-direction: column;
    position: relative;
`

export const BlockchainTitle = styled.div`
    display: flex;
    font-size: 1.5rem;
`

export const BlockchainContainer = styled.div`
    width: 100%;
    /* height: 100%; */
    display: flex;
    justify-content: center;
`

export const BlockchainContainerContent = styled.div`
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`

export const BlockchainPeers = styled.div`
    width: 100%;
    /* height: 100%; */
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    border: 1px solid black;
`

export const BlockchainClients = styled.div`
    width: 100%;
    /* height: 100%; */
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    border: 1px solid black;
`

export const BlockchainHeading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5em 0.25em 0.5em 0.25em;
`

export const BlockchainHeadingRowPeer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
    background-color: lightgrey;
    color: 	hsl(120, 19%, 35%);
    border-radius: 5px 5px 0 0;
    border-bottom: 1px solid black;
`

export const BlockchainHeadingRowClient = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 2fr 1fr;
    background-color: lightgrey;
    color: 	hsl(120, 19%, 35%);
    border-radius: 5px 5px 0 0;
    border-bottom: 1px solid black;
`

export const BlockchainNoDataRow = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5em 0.25em 0.5em 0.25em;
`
export const BlockchainRow = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
`

export const BlockchainData = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5em 0.25em 0.5em 0.25em;
`

export const RemoveButton = styled.div`
    font-size: 1.5rem;
    backgroundColor: #FF0000; 
    color: white;
`

export const TitleText = styled.div`
    height: 10vh;
    display: inline-block;
    align-items: center;
    font-size: 1.5rem;
    color: black;
    flex: 1;
    width: 50%;
`

export const ButtonContainer = styled.div`
    width: 50%;
    display: inline-block;
    flex-direction: column;
    position: relative;
    text-align: right;
`
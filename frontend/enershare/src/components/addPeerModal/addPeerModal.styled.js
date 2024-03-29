import styled from "styled-components";
import { Form } from 'formik'

export const PeerModalBackground = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
`

export const PeerModalContentBody = styled.div`
    background-color: #FFFFFF;
    padding: 3em 3em;
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
    width: 100%;
    display: flex;
    flex-direction: column;
`

export const PeerModalTitle = styled.b`
    font-family: 'Be Vietnam Pro', sans-serif;
    font-size: 30px;
    font-weight: 600;
    color: white;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const SummaryTable = styled.table`
    border: none;
    padding: 1em;
`

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

export const PeerModalContentHeader = styled.div`
    background-color: #557C55;
    padding: 3em;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    width: 100%;
    display: flex;
`

export const PeerModalContentContainer = styled.div`
    border-radius: 40px;
    background-color: #FFFFFF;
    width: 40%;
    display: flex;
    flex-direction: column;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
`

export const TextFieldContainer = styled.div`
    display: flex;
`

export const AddPeerForm = styled(Form)`
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`
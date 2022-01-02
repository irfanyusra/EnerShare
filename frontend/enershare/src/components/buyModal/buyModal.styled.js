import styled from "styled-components";

export const BuyModalBackground = styled.div`
    width: 100%;
    flex: 100;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    position: fixed;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const BuyModalContent = styled.div`
    background-color: white;
    padding: 5em;
    border-radius: 15px;
    width: 80%;
    display: flex;
    flex-direction: column;
    box-shadow: 0 5px 5px 0px;
`

export const CancelButton = styled.button`
    background-color: red;
`
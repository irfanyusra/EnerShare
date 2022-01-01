import styled from "styled-components";

export const Card = styled.div`
    background-color: ghostwhite;
    color: black;
    display: grid;
    border: 1px solid black;
    grid-template-columns: 1fr 2fr 1fr 1fr; /* date/time, reason, change, balance */
`

export const CardItem = styled.div`
    display: flex;
    justify-content: center;
`

export const DeleteButton = styled.button`
`
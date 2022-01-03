import styled from "styled-components";

export const Card = styled.div`
    color: black;
    display: grid;
    grid-template-columns: 3fr 2fr 1fr 1fr; /* date/time, reason, change, balance */
`

export const CardItem = styled.div`
    display: flex;
    justify-content: center;
`

export const DeleteButton = styled.button`
`
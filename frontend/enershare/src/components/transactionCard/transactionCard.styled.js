import styled from "styled-components";

export const Card = styled.div`
    color: black;
    display: grid;
    grid-template-columns: 3fr 2fr 1fr 1fr; /* date/time, reason, change, balance */
`

export const CardItem = styled.div`
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const DeleteButton = styled.button`
`
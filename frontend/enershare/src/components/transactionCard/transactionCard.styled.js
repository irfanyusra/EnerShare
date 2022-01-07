import styled from "styled-components";

export const Card = styled.div`
    color: black;
    display: grid;
    grid-template-columns: 3fr 2fr 1fr 1fr; /* date/time, reason, change, balance */
`

export const CardItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5em 0.25em 0.5em 0.25em;
`

export const DeleteButton = styled.button`
`
import styled from "styled-components";

export const Card = styled.div`
    color: black;
    display: grid;
    height: 2rem;
    /* border: 1px solid black; */
    grid-template-columns: 3fr 1fr 1fr 1fr; /* date/time, reason, change, balance */
`

export const CardItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const DeleteButton = styled.div`
    color: #DF2935;
    font-size: 1.25rem;
`
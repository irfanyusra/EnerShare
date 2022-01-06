import styled from "styled-components";

export const ButtonStyle = styled.button`
    padding: 0.7em 1.7em;
    margin: 0 0.3em 0.3em 0;
    border-radius: 5px;
    text-align: center;
    transition: all 0.2s;
    background-color: ${props => props.backgroundColor || "#557C55"};
    color: ${props => props.color || "black"};
    border: 1px solid #4CAF50;

    :hover{
        color: #000000;
        background-color: #FFFFFF;
        cursor: pointer;
    }
`;
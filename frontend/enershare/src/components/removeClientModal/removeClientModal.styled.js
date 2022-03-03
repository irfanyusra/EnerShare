import styled from "styled-components";

export const RemoveClientModalBackground = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const RemoveClientModalContentBody = styled.div`
    background-color: #FFFFFF;
    padding: 3em 3em;
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
    width: 100%;
    display: flex;
    flex-direction: column;
`

export const RemoveClientModalTitle = styled.b`
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

export const PurchaseSummaryTable = styled.table`
    border: none;
    padding: 1em;
`

export const PurchaseSummaryTableDataContainer = styled.td`
    border: solid 1px #C8C8C8;
    border-width: 0 0 2px;
    width: 60px;
    height: 60px;
    padding: 10px;
`
export const PurchaseSummaryTableDataLeft = styled.b`
    float: left;
    font-family: 'Be Vietnam Pro', sans-serif;;
`

export const PurchaseSummaryTableDataRight = styled.div`
    float: right;
    font-family: 'Be Vietnam Pro', sans-serif;;
`

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

export const RemoveClientModalContentHeader = styled.div`
    background-color: #557C55;
    padding: 3em;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    width: 100%;
    display: flex;
`

export const RemoveClientModalContentContainer = styled.div`
    background-color: #FFFFF;
    border-radius: 40px;
    width: 40%;
    display: flex;
    flex-direction: column;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
`
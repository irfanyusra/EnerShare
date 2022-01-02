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
    width: 50%;
    display: flex;
    flex-direction: column;
    box-shadow: 0 5px 5px 0px;
`

export const BuyModalTitle = styled.b`
    font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
    font-size: 30px;
    font-weight: 600;
`

export const PurchaseSummaryTable = styled.table`
    border: solid black;
`

export const PurchaseSummaryTableData = styled.td`
    border: solid;
    border-width: 1px;
    width: 85px;
    height: 60px;
    padding: 10px;
`

export const ButtonsContainer = styled.div`
    text-align: center;
`

export const PurchaseButton = styled.button`
    appearance: none;
    background-color: #2ea44f;
    border: 1px solid rgba(27, 31, 35, .15);
    border-radius: 60px;
    box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    padding: 6px 16px;
    position: relative;
    text-align: center;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: middle;
    white-space: nowrap;
    width: 30%;
`
export const CancelButton = styled.button`
    appearance: none;
    background-color: red;
    border: 1px solid rgba(27, 31, 35, .15);
    border-radius: 60px;
    box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    padding: 6px 16px;
    position: relative;
    text-align: center;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: middle;
    white-space: nowrap;
    width: 30%;
`
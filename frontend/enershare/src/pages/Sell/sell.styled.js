import styled from "styled-components";

export const SellPageLayout = styled.div`
  height: 100%;
  width: 100%;
  background-color: white;
  display: flex;
`
export const SellColumn = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 20px;
`

export const Title = styled.div`
    display: flex;
    padding: 2rem;
    font-size: 2rem;
`

export const SellButton = styled.button`
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
    font-size: 20px;
    font-weight: 600;
    line-height: 20px;
    padding: 6px 16px;
    position: relative;
    text-align: center;
    textContent: Sell;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: middle;
    white-space: nowrap;
    width: 20%;
`

export const TextFieldContainer = styled.div`
    display: flex;
    width: 20%;
`

export const EnergyTypeDroplist = styled.select`
    padding: 0.75em;
    margin: 0.5em;
    border-radius: 3px;
    width: 100%;
`

export const SellEnergyTypeContainer = styled.div`
  width: 100%;
`
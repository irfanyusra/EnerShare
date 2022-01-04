import styled from 'styled-components'

export const MarketplaceLayout = styled.div`
  height: 100%;
  width: 100%;
  background-color: white;
  display: flex;
  padding: 1.5rem;
`

export const MarketplaceColumn = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
`

export const MarketplaceTitle = styled.div`
    display: flex;
    font-size: 1.5rem;
`

export const MarketplaceListingContainer= styled.div`
    width: 100%;
    /* height: 100%; */
    display: flex;
    justify-content: center;
    /* padding: 5em; */
`

export const MarketplaceListings= styled.div`
    width: 100%;
    /* height: 100%; */
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    border: 1px solid black;
`

export const MarketplaceListingHeading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const MarketplaceHeadingRow = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
    background-color: lightgrey;
    border-radius: 5px 5px 0 0;
    border-bottom: 1px solid black;
    height: 2em;
`

export const MarketplaceListingRow = styled.div`
    width: 100%;
    display: grid;
    height: 2.5rem;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
`

export const MarketplaceListingData = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const BuyButton = styled.div`
    font-size: 1.5rem;
    color: #557C55;
`
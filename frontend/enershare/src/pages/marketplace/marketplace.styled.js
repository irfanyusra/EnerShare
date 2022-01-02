import styled from 'styled-components'

export const MarketplaceLayout = styled.div`
  height: 100%;
  width: 100%;
  background-color: white;
  display: flex;
`

export const MarketplaceColumn = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`

export const MarketplaceTitle = styled.div`
    display: flex;
    padding: 2rem;
    font-size: 2rem;
`

export const MarketplaceListingContainer= styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    padding: 5em;
`

export const MarketplaceListings= styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`

export const MarketplaceListingHeading = styled.div`
    display: flex;
    justify-content: center;
`

export const MarketplaceHeadingRow = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    background-color: coral ;
    `
export const MarketplaceListingRow = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
`

export const MarketplaceListingData = styled.div`
    display: flex;
    justify-content: center;
`

export const BuyButton = styled.button`
`
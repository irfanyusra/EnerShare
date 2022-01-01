import styled from 'styled-components'

export const DashboardLayout = styled.div`
  height: 100%;
  width: 100%;
  background-color: white;
  display: flex;
`

export const DashboardColumn = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`

export const WelcomeText = styled.div`
    display: flex;
    align-items: center;
    font-size: 2rem;
    color: black;
    flex: 1;
`

export const DashboardRowColumnSwitcher = styled.div`
    width: 100%;
    flex: 10;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    /* TODO: add media queries to handle the switch from flex-direction row to column */
`

export const DashboardRow = styled.div`
    flex: 10;

`

export const DashboardContainers = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    border: black;
    border-radius: 10px;
    background-color: #145DA0;
    margin: 2em;
    /* width: 45vw; */
    height: 90%;
    color: white;
    padding: 1em;
`

export const EnergyDataContainer = styled(DashboardContainers)`
`

export const RecentTransactionContainer = styled(DashboardContainers)`
`

export const MarketPlaceContainer = styled(DashboardContainers)`
`

export const DashboardContainerTitles = styled.h3`

`

export const ContainerLists = styled.div`
    display: flex;
    flex-direction: column;
`

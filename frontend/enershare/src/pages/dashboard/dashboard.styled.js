import styled from 'styled-components'

export const DashboardLayout = styled.div`
  height: 100%;
  width: 100%;
  background-color: #0C2D48;
  display: flex;
  flex-direction: column;
`

export const DashboardColumn = styled.div`
    display: flex;
    flex-direction: column;
    /* width: 100%; */
    height: 100%;
`

export const WelcomeText = styled.div`
    display: flex;
    align-items: center;
    font-size: 2rem;
    color: white;
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

export const DashboardContainers = styled.div`
    display: flex;
    flex-direction: column;
    border: black;
    border-radius: 10px;
    background-color: #145DA0;
    margin: 1em;
    width: 45vw;
    height: 90%;
    color: white;
    padding: 1em;
`

export const EnergyDataContainer = styled(DashboardContainers)`
`

export const RecentTransactionContainer = styled(DashboardContainers)`
`


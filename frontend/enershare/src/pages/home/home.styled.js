import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const HomePageLayout = styled.div`
  display: grid;
  grid-template:
    "   title   " 33vh
    "  summary  " 33vh
    "   entry   " 33vh;
  /* background: grey;   */
  height: 100%;
  width: 100%;
`

export const Title = styled.div`
  font-size: 2.5rem;
  grid-area: title;
  display: flex;
  justify-self: center;
  align-items: flex-end;
`

export const Summary = styled.div` 
  grid-area: summary;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`

export const H1 = styled.h1`
  font-size: 2rem;
  padding-top: 1.0em;
  padding-bottom: 0.5em;
  color: #9cacb4;
`

export const Entry = styled.div`
  grid-area: entry;
  font-size: 2em;
  display: flex;
  justify-content: center;
`

export const LoginButton = styled.button`
  background-color: orange;
  border: 1px solid orange;
  color: white;
  border-radius: 5px;
  width: 7em;
  height: 1.5em;
  text-align: center;
  margin: 0 3em;
`

export const SignUpButton = styled.button`
  background-color: #3AB972;
  border: none;
  border-radius: 5px;
  width: 7em;
  height: 1.5em;
  text-align: center;
  margin: 0 3em;
`

export const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 1rem;
  position: relative;
`;

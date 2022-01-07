import styled from "styled-components";
import { Form } from 'formik'

import enerShareLogo from "../../images/enerShareLogoBlack.png"

export const SellPageLayout = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const SellColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 30vw;
    height: 100%;
`

export const SellFormContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export const Title = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0.5;
    font-size: 2rem;
`

export const TextFieldContainer = styled.div`
    display: flex;
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

export const EnerShareLogo = styled.img.attrs({
    src: `${enerShareLogo}`
})`
  height: 5rem;
  width: auto;
`;

export const LogoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const SellForm = styled(Form)`
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
`
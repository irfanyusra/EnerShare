import styled from 'styled-components'
import { Form } from 'formik'

import enerShareLogo from "../../images/enerShareLogoBlack.png"

export const LoginPageLayout = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const LogoTitleContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    gap: 1rem;
`

export const Title = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0.5;
    font-size: 1.75rem;
`

export const TextFieldContainer = styled.div`
    display: flex;
`

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`

export const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 30vw;
    height: 100%;
`

export const LoginFormContainer = styled.div`
    display: flex;
    flex: 2;
    flex-direction: column;
`

export const LoginForm = styled(Form)`
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export const EnerShareLogo = styled.img.attrs({
    src: `${enerShareLogo}`
  })`
  width: auto;
  height: 4rem;
`;



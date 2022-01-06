import styled from 'styled-components'
import { Form } from 'formik'

import enerShareLogo from "../../images/enerShareLogoBlack.png"

export const SignupPageLayout = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const LogoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
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
    justify-content: center;
    width: 30vw;
    height: 100%;
`

export const SignupFormContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export const SignupForm = styled(Form)`
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export const EnerShareLogo = styled.img.attrs({
    src: `${enerShareLogo}`
  })`
  height: 3rem;
  width: auto;
`;
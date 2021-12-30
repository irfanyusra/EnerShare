import styled from 'styled-components'
import { Form } from 'formik'


export const LoginPageLayout = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Title = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    font-size: 2rem;
`

export const TextFieldContainer = styled.div`
    display: flex;
`

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
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
    flex: 3;
    flex-direction: column;
`

export const LoginForm = styled(Form)`
    height: 100%;
    display: flex;
    flex-direction: column;
`



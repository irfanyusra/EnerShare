import styled from "styled-components";


export const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: black;
  border-radius: 5px;
  width: 100%;
  border: 1px solid #CDD9ED;
  background: #fff;

  &:focus {
  outline: none;
  border-color: #557C55;
}

  &::placeholder {
    color: #99A3BA;
  }
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const StyledErrorMessage = styled.div`
  align-self: end;
  color: red;
  font-size: 0.8rem;
`


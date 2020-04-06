import styled from "styled-components";
import {Link} from "react-router-dom";

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FBF8E9;
`;


export const StyledForm = styled.form`
    width: 30rem;
    min-height: 20rem;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 1px 4px 0 rgba(0,0,0,.08);
    padding: 3rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

`;

export const StyledField = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width:100%;
    justify-content: space-between;
`;

export const Label = styled.label`
    color: #80929C;
    font-size: 15px;
`;


export const FormHeader = styled.h1`
    font-size: 25px;
    margin-bottom: 1rem;
    width:100%;
`;


export const Input = styled.input`
    
    width: 100%;
    padding: 1rem 0.5rem;
    margin-bottom: 1rem;
    border: none;
    border-bottom: ${(props) => props.error ? "1px solid #FF94AD" : "1px solid #DFEBF9"};
    font-size: 15px;
    
    &:focus {
      outline: none;
    }
`;


export const Error = styled.span`
  color: #ff4e5e;
  font-size: 13px;
`;

export const ServerError = styled.span`
  color: #ff4e5e;
  font-size: 13px;
  width: 100%;
  margin-bottom: 1rem;
`;


export const GotoSignupLink = styled(Link)`
  color: #a5a5a5;
  font-size: 13px;
`;

export const GotoLoginLink = styled(GotoSignupLink)`
`;

export const Button = styled.button.attrs((props) => ({...props}))`
  cursor: pointer;
  width:  8rem;
  height: 3rem;

  align-items: center !important;
  justify-content: center !important;
  display: flex;
 background-color: ${(props) => (props.disabled ? "#a8a8a8" : "#F7B500")};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  text-align: center;
  padding: 0 2rem;
  line-height: normal;

  &:focus {
    outline: none; 
  }
  
  &:hover {
    opacity:  ${(props) => props.disabled ? 1 : 0.7};
    background-color: ${(props) => (props.disabled ? "#a8a8a8" : "#F7B500")};
  }
`;


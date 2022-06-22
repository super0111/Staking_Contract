import styled from "styled-components";

export const Styles = styled.div`
  .customed-input {
    font-family: "SourceSansPro-Regular";
    font-size: 18px;
    font-weight: 400;
    width: calc(100% - 73px);
    outline: none;
    border: 1px solid #b5b5b5;
    border-radius: 6px;
    height: 63px;
    padding-left: 69px;
    margin-top: 17px;
    background-color: white !important;
    &::placeholder {
      color: rgba(105, 105, 105, 0.5);
    }
    &:focus {
      &::placeholder {
        color: var(--white);
      }
    }
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 100px white inset !important;
    }
    @media (max-width: 650px) {
      font-size: 14px;
      height: 36px;
    }
  }
`;

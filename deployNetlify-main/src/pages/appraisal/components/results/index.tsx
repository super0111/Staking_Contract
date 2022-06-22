import React, { useState } from "react";
import { Styles } from "./style";
import Button from "@mui/material/Button";
// import ReactCodeInput from "react-code-input";
import styled from "styled-components";
import ReactInputVerificationCode from "react-input-verification-code";

const StyledReactInputVerificationCode = styled.div`
  display: flex;
  justify-content: center;

  --ReactInputVerificationCode-itemWidth: 40px;
  --ReactInputVerificationCode-itemHeight: 48px;
  --ReactInputVerificationCode-itemSpacing: 8px;

  .ReactInputVerificationCode__item {
    font-size: 16px;
    font-weight: 500;
    color: rgb(0, 0, 0);

    background-color: #ffffff;
    border: 1px solid #bebebe;
    border-radius: 4px;
    box-shadow: none;
  }

  .ReactInputVerificationCode__item.is-active {
    box-shadow: none;
    border: 1px solid #36c6d9;
  }
`;

type Props = {
  handleNext: (idx: number) => void;
};

const Results: React.FC<Props> = ({ handleNext }) => {
  const [isRequiredCode, setRequiredCode] = useState<boolean>(false);
  const [valueInput, setValueInput] = useState<string>("");
  const [isInputed, setInputed] = useState<boolean>(false);

  const handleValueInput = (e: string) => {
    if (String(e).replace(/[A-Za-z]/g, "").length === 4) {
      setValueInput(String(e));
      setRequiredCode(false);
    } else {
      setRequiredCode(true);
    }
  };

  const checkValid = () => {
    if (valueInput === "" || valueInput.length !== 4) {
      setRequiredCode(true);
      setInputed(true);
    } else setRequiredCode(false);
  };

  return (
    <Styles>
      <div className="results-container">
        <div className="question first-animation">
          <div className="txt-block">
            <span>One final step to get your report! To </span>
            <strong>prevent misuse</strong>
            <span>, we will send you a </span>
            <strong>verification code by sms.</strong>
          </div>
        </div>
        <div className="code-block second-animation">
          <span>Enter the code received by sms</span>
          {/* <ReactCodeInput name="resetPassword" inputMode="numeric" fields={4} type="text" onChange={(e) => handleValueInput(e)} /> */}
          <StyledReactInputVerificationCode>
            <ReactInputVerificationCode
              value={valueInput}
              placeholder=""
              length={4}
              onChange={(e) => {
                handleValueInput(e);
              }}
              onCompleted={(e) => {
                setInputed(true);
              }}
            />
          </StyledReactInputVerificationCode>
        </div>
        {isRequiredCode && isInputed ? <div className="required">Please specify your verification code</div> : null}
        <Button className="color-button third-animation" onClick={() => checkValid()}>
          Back
        </Button>
      </div>
    </Styles>
  );
};

export default Results;

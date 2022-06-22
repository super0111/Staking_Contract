import React, { useState } from "react";
import { Styles } from "./style";
import InputName from "../../../../components/inputName";
import Button from "@mui/material/Button";

type Props = {
  handleNext: (idx: number) => void;
};

const Verification: React.FC<Props> = ({ handleNext }) => {
  const [code, setCode] = useState<string>("");
  const [isRequiredCode, setRequiredCode] = useState<boolean>(false);

  const handleCode = (label: string) => {
    if (label === "") setRequiredCode(true);
    else setRequiredCode(false);
    setCode(label);
  };

  const checkValid = () => {
    if (code === "") setRequiredCode(true);
    else {
      setRequiredCode(true);
      handleNext(5);
    }
  };

  return (
    <Styles>
      <div className="verification-container">
        <div className="question first-animation">
          <div className="txt-block">
            <span>One final step to get your report! To </span>
            <strong>prevent misuse</strong>
            <span>, we will send you a </span>
            <strong>verification code by sms.</strong>
          </div>
        </div>
        <div className="salary-block second-animation">
          <InputName placeholderName="+41" inputValue={code} inputHandler={handleCode} />
          {isRequiredCode ? <div className="required">Please specify your verification code</div> : null}
        </div>
        <Button className="color-button third-animation" onClick={() => checkValid()}>
          Request Verification
        </Button>
      </div>
    </Styles>
  );
};

export default Verification;

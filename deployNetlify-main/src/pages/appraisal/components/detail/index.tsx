import React, { useState } from "react";
import { Styles } from "./style";
import CustomedInput from "../../../../components/input";
import InputName from "../../../../components/inputName";
import Button from "@mui/material/Button";

type Props = {
  handleNext: (idx: number) => void;
};

const Detail: React.FC<Props> = ({ handleNext }) => {
  const [salary, setSalary] = useState<string>("");
  const [isRequiredSalary, setRequiredSalary] = useState<boolean>(false);

  const [salaryExp, setSalaryExp] = useState<string>("");
  const [isRequiredSalaryExp, setRequiredSalaryExp] = useState<boolean>(false);

  const [firstname, setFirstname] = useState<string>("");
  const [isRequiredFirstname, setRequiredFirstname] = useState<boolean>(false);

  const [lastname, setLastname] = useState<string>("");
  const [isRequiredLastname, setRequiredLastname] = useState<boolean>(false);

  const [isNexted, setNext] = useState<boolean>(false);

  const handleSalary = (label: string) => {
    if (label === "") setRequiredSalary(true);
    else setRequiredSalary(false);
    setSalary(label);
  };

  const handleSalaryExp = (label: string) => {
    if (label === "") setRequiredSalaryExp(true);
    else setRequiredSalaryExp(false);
    setSalaryExp(label);
  };

  const handleFirstname = (label: string) => {
    if (label === "") setRequiredFirstname(true);
    else setRequiredFirstname(false);
    setFirstname(label);
  };

  const handleLastname = (label: string) => {
    if (label === "") setRequiredLastname(true);
    else setRequiredLastname(false);
    setLastname(label);
  };

  const checkValid = () => {
    if (isNexted) {
      if (firstname !== "") setRequiredFirstname(false);
      else setRequiredFirstname(true);

      if (lastname !== "") setRequiredLastname(false);
      else setRequiredLastname(true);

      if (salary !== "" && salaryExp !== "" && firstname !== "" && lastname !== "") handleNext(4);
    } else {
      if (salary !== "") setRequiredSalary(false);
      else setRequiredSalary(true);

      if (salaryExp !== "") setRequiredSalaryExp(false);
      else setRequiredSalaryExp(true);

      if (salary !== "" && salaryExp !== "") setNext(true);
    }
  };

  return (
    <Styles>
      <div className="location-container">
        <div className="question first-animation">What is your current salary? </div>
        <div className="salary-block second-animation">
          <span>Gross Salary </span>
          <CustomedInput placeholderName="CHF" inputValue={salary} inputHandler={handleSalary} />
          {isRequiredSalary ? <div className="required">Please specify your gross salary</div> : null}
        </div>
        <div className="alarm third-animation">Has no influence on the analysis </div>
        <div className="question four-animation">What would be your salary expectations? </div>
        <div className="salary-block five-animation">
          <span>Gross Salary </span>
          <CustomedInput placeholderName="CHF" inputValue={salaryExp} inputHandler={handleSalaryExp} />
          {isRequiredSalaryExp ? <div className="required">Please specify your gross salary</div> : null}
        </div>
        <div className="alarm six-animation">Has no influence on the analysis.</div>
        {isNexted && (
          <div className="profile-block">
            <div className="email-title">Email</div>
            <div className="question">abcdef@gmail.com</div>
            <div className="salary-block">
              <span>First Name </span>
              <InputName placeholderName="abcdef" inputValue={firstname} inputHandler={handleFirstname} />
              {isRequiredFirstname ? <div className="required">Please specify your first name</div> : null}
            </div>
            <div className="salary-block">
              <span>Exp Name</span>
              <InputName placeholderName="ghijk" inputValue={lastname} inputHandler={handleLastname} />
              {isRequiredLastname ? <div className="required">Please specify your last name</div> : null}
            </div>
          </div>
        )}
        <Button className="color-button seven-animation" onClick={() => checkValid()}>
          {isNexted ? "Continue with email" : "Next"}
        </Button>
        {isNexted && (
          <div className="detail-footer">
            Your data will be treated confidentially with the greatest care according to the Swiss and European regulations. By continuing, you agree to our Privacy policy, our
            Terms and conditions and to receive updates on your home value.
          </div>
        )}
      </div>
    </Styles>
  );
};

export default Detail;

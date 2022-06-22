import React, { useState } from "react";
import { ReactComponent as RadioNormal } from "../../../../assets/svg/normal-radio.svg";
import { ReactComponent as RadioSelected } from "../../../../assets/svg/selected-radio.svg";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Styles } from "./style";

const percents = [{ pro: "100% " }, { pro: "80% " }, { pro: "60% " }, { pro: "40% " }];
const periods = [{ date: "Immediately" }, { date: "1 month" }, { date: "2 months" }, { date: "3 months" }];

type Props = {
  handleNext: (idx: number) => void;
};

const Search: React.FC<Props> = ({ handleNext }) => {
  const [selectedPro, setSelectedPro] = useState<number>(-1);
  const [selectedPeriod, setSelectedPeriod] = useState<number>(-1);
  const [isRequiredPro, setRequiredPro] = useState<boolean>(false);
  const [isRequiredPeriod, setRequiredPeriod] = useState<boolean>(false);

  const checkValid = () => {
    if (selectedPro > -1) {
      setRequiredPro(false);
    } else setRequiredPro(true);

    if (selectedPeriod > -1) {
      setRequiredPeriod(false);
    } else setRequiredPeriod(true);

    if (selectedPro > -1 && selectedPeriod > -1) handleNext(3);
  };

  return (
    <Styles>
      <div className="search-container">
        <div className="question first-animation">What type of contract would you consider? </div>
        <div className="second-animation">
          <div className="contract-title">Type of contract</div>
          <Grid container spacing={4}>
            <Grid item xs={4}>
              <div className="contract-item">
                <img src="/svg/permant.svg" alt="" />
                <span>Permanent</span>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="contract-item">
                <img src="/svg/interium.svg" alt="" />
                <span>Interim</span>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="contract-item">
                <img src="/svg/contract.svg" alt="" />
                <span>Contract</span>
              </div>
            </Grid>
          </Grid>
        </div>
        <div className="third-animation">
          <div className="activity-title">Activity rate</div>
          <div className="period-list">
            <Grid container>
              {percents.map((percent, idx) => {
                return (
                  <Grid item xs={12} key={idx}>
                    <Button className={selectedPro === idx ? "radio-btn clicked" : "radio-btn"} onClick={() => setSelectedPro(idx)}>
                      {selectedPro === idx ? <RadioSelected /> : <RadioNormal />}
                      <span>{percent.pro}</span>
                    </Button>
                  </Grid>
                );
              })}
            </Grid>
          </div>
          {isRequiredPro ? <div className="required">Please specify your activate rate</div> : null}
        </div>
        <div className="four-animation">
          <div className="question">When are you available to start?</div>
          <div className="period-list">
            <Grid container>
              {periods.map((period, idx) => {
                return (
                  <Grid item xs={12} key={idx}>
                    <Button className={selectedPeriod === idx ? "radio-btn clicked" : "radio-btn"} onClick={() => setSelectedPeriod(idx)}>
                      {selectedPeriod === idx ? <RadioSelected /> : <RadioNormal />}
                      <span>{period.date}</span>
                    </Button>
                  </Grid>
                );
              })}
            </Grid>
          </div>
          {isRequiredPeriod ? <div className="required">Please specify your starting time</div> : null}
        </div>
        <Button className="color-button five-animation" onClick={() => checkValid()}>
          Next
        </Button>
      </div>
    </Styles>
  );
};

export default Search;

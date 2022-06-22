import React, { useState } from "react";
import { ReactComponent as RadioNormal } from "../../../../assets/svg/normal-radio.svg";
import { ReactComponent as RadioSelected } from "../../../../assets/svg/selected-radio.svg";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Styles } from "./style";

const periods = [{ date: "Immediately" }, { date: "1 month" }, { date: "2 months" }, { date: "3 months" }, { date: "No" }];

type Props = {
  handleNext: (idx: number) => void;
};

const Project: React.FC<Props> = ({ handleNext }) => {
  const [selected, setSelected] = useState<number>(-1);
  const [isRequiredCode, setRequiredCode] = useState<boolean>(false);

  const checkValid = () => {
    if (selected > -1) {
      setRequiredCode(false);
      handleNext(2);
    } else setRequiredCode(true);
  };

  return (
    <Styles>
      <div className="project-container">
        <div className="question animation-0">Are you planing to move?</div>
        <div className="period-list">
          <Grid container>
            {periods.map((period, idx) => {
              return (
                <Grid item xs={12} key={idx} className={`animation-${idx + 1}`}>
                  <Button className={selected === idx ? "radio-btn clicked" : "radio-btn"} onClick={() => setSelected(idx)}>
                    {selected === idx ? <RadioSelected /> : <RadioNormal />}
                    <span>{period.date}</span>
                  </Button>
                </Grid>
              );
            })}
          </Grid>
        </div>
        {isRequiredCode ? <div className="required">Please specify your planing</div> : null}
        <Button className="color-button animation-6" onClick={() => checkValid()}>
          Next
        </Button>
      </div>
    </Styles>
  );
};

export default Project;

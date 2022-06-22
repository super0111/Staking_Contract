import React, { useState } from "react";
import CustomizedCheckBox from "../../../../components/checkbox";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Styles } from "./style";

const addressLs = [
  { location: "Vaud" },
  { location: "Jura" },
  { location: "Geneva" },
  { location: "Zurich" },
  { location: "Fribourg" },
  { location: "Bale" },
  { location: "Neuchatel" },
  { location: "Luzern" },
  { location: "Valais" },
  { location: "Ticino" },
  { location: "Bern" }
];

type Props = {
  handleNext: (idx: number) => void;
};

const Location: React.FC<Props> = ({ handleNext }) => {
  const [selected, setSelected] = useState<Array<string>>([]);
  const [isRequiredCode, setRequiredCode] = useState<boolean>(false);

  const handleSelected = (label: string) => {
    const tmp = selected;
    if (tmp.includes(label)) {
      for (let i = 0; i < tmp.length; i++) {
        if (tmp[i] === label) {
          tmp.splice(i, 1);
        }
      }
    } else {
      tmp.push(label);
    }
    if (tmp.length > 0) setRequiredCode(false);
    else setRequiredCode(true);
    setSelected(tmp);
  };

  const checkValid = () => {
    if (selected.length > 0) {
      setRequiredCode(false);
      handleNext(1);
    } else setRequiredCode(true);
  };

  return (
    <Styles>
      <div className="location-container">
        <div className="question first-animation">
          <strong>Let’s get started! </strong>
          <span>This should not take more than </span>
          <strong>2 minutes.</strong>
        </div>
        <div className="question second-animation">Where would you like to work in Switzerland?</div>
        <div className="third-animation">
          <div className="address-title">ADDRESS</div>
          <div className="address-list">
            <Grid container>
              {addressLs.map((add, idx) => {
                return (
                  <Grid item xs={5} style={{ paddingLeft: 70 }} key={idx}>
                    <CustomizedCheckBox label={add.location} selected={selected} handleSelected={handleSelected} />
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </div>
        {isRequiredCode ? <div className="required">Please specify your address</div> : null}
        <Button className="color-button four-animation" onClick={() => checkValid()}>
          Next
        </Button>
      </div>
    </Styles>
  );
};

export default Location;

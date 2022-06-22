import React, { useState } from "react";
// import LinearDeterminate from "../../components/progress";
import { ReactComponent as RightBlack } from "../../assets/svg/right-arrow-black.svg";
import { ReactComponent as RightGray } from "../../assets/svg/right-arrow-gray.svg";
import Detail from "./components/detail";
import Location from "./components/location";
import Project from "./components/project";
import Results from "./components/results";
import Search from "./components/search";
import Verification from "./components/verification";

import { Styles } from "./style";

const steps = [
  { id: 1, name: "Location" },
  { id: 2, name: "Project" },
  { id: 3, name: "Search" },
  { id: 4, name: "Your details" },
  { id: 5, name: "Verification" },
  { id: 6, name: "Results" }
];

export default function Appraisal() {
  const [cStep, setCStep] = React.useState<number>(0);
  return (
    <Styles>
      <div className="progress-container">
        {/* <LinearDeterminate progress={90} /> */}
        <div className="steper-title">The Career Machine</div>
        <div className="progress-steper">
          {steps.map((step, idx) => {
            const txtParagrap = cStep === idx ? <strong>{`${idx + 1}. ${step.name}`}</strong> : <span>{`${idx + 1}. ${step.name}`}</span>;
            if (idx === steps.length - 1) return <li key={idx}>{txtParagrap}</li>;
            else
              return (
                <li>
                  {txtParagrap}
                  {cStep === idx ? <RightBlack /> : <RightGray />}
                </li>
              );
          })}
        </div>
        {cStep === 0 && <Location handleNext={setCStep} />}
        {cStep === 1 && <Project handleNext={setCStep} />}
        {cStep === 2 && <Search handleNext={setCStep} />}
        {cStep === 3 && <Detail handleNext={setCStep} />}
        {cStep === 4 && <Verification handleNext={setCStep} />}
        {cStep === 5 && <Results handleNext={setCStep} />}
      </div>
    </Styles>
  );
}

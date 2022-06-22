import React from "react";
import { Styles } from "./inputStyle";

type Props = {
  inputValue: string;
  placeholderName: string;
  inputHandler: (lable: string) => void;
};

const InputName: React.FC<Props> = ({ inputValue, inputHandler, placeholderName }) => {
  return (
    <Styles>
      <input type="text" className="customed-input" onChange={(e) => inputHandler(e.target.value)} value={inputValue} placeholder={placeholderName} />
    </Styles>
  );
};

export default InputName;

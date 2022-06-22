import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

type Props = {
  label: string;
  selected: Array<string>;
  handleSelected: (lable: string) => void;
};

const CustomizedCheckBox: React.FC<Props> = ({ label, selected, handleSelected }) => {
  const [checked, setChecked] = React.useState<boolean>(selected.includes(label) ? true : false);
  const handleChange = () => {
    setChecked(!checked);
    handleSelected(label);
  };
  return (
    <FormControlLabel
      label={label}
      sx={{
        "& .MuiTypography-root": {
          textOverflow: "ellipsis",
          overflow: "hidden",
          textAlign: "left",
          fontFamily: "Rubik-Regular",
          fontSize: 14,
          fontWeight: 400
        }
      }}
      control={
        <Checkbox
          checked={checked}
          sx={{
            color: "rgba(0, 0, 0, 0.24)",
            "&.Mui-checked": {
              color: "#4F4F4F",
              fill: "white"
            }
          }}
          onChange={handleChange}
        />
      }
    />
  );
};

export default CustomizedCheckBox;

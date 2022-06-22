import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

type Props = {
  progress: number;
};

const LinearDeterminate: React.FC<Props> = ({ progress }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
};

export default LinearDeterminate;

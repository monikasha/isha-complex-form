import React from "react";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
// import Typography from '@mui/material/Typography';
// import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

// function ValueLabelComponent(props) {
//   const { children, value } = props;

//   return (
//     <Tooltip enterTouchDelay={0} placement="top" title={value}>
//       {children}
//     </Tooltip>
//   );
// }

const DistanceSlider = (props) => {
  const PrettoSlider = styled(Slider)({
    color: "red",
    height: 3,
    width: 350,
    opacity: 0.5,
    "& .MuiSlider-track": {
      border: "none",
    },
    "& .MuiSlider-thumb": {
      height: 24,
      width: 24,
      backgroundColor: "red",
      border: "2px solid currentColor",
      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
        boxShadow: "inherit",
      },
      "&::before": {
        display: "none",
      },
    },
    "& .MuiSlider-valueLabel": {
      lineHeight: 1.2,
      fontSize: 12,
      background: "unset",
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: "50% 50% 50% 0",
      backgroundColor: "red",
      transformOrigin: "bottom left",
      transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
      "&::before": { display: "none" },
      "&.MuiSlider-valueLabelOpen": {
        transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
      },
      "& > *": {
        transform: "rotate(45deg)",
      },
    },
  });
  return (
    // <Box sx={{ width: 320 }}>
      // <Box sx={{ m: 3 }} />
      <PrettoSlider value={props.value} valueLabelDisplay="auto" onChange={props.onChange} min={props.min}
      max={props.max}
      />
    // </Box>
  );
};

export default DistanceSlider;

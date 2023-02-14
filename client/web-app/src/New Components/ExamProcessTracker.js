import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

//   "Exam Scheduled",
const ExamProcessTracker = (props) => {
  const stepsSelector = (props) => {
    const stepsType1 = [
      "Enroll and Start, or Schedule Later",
      "Enrolled, Start Now",
      "Exam Completed",
    ];

    const stepsType2 = [
      "Enroll and Start, or Schedule Later",
      "Exam Scheduled",
      "Exam Completed",
    ];

    if (props.onWhichStep === 1 && props.currentStatus === "Scheduled") {
      return (
        <Stepper activeStep={props.onWhichStep}>
          {stepsType2.map((label) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      );
    } else {
      return (
        <Stepper activeStep={props.onWhichStep}>
          {stepsType1.map((label) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      );
    }
  };

  return <Box sx={{ width: "100%" }}>{stepsSelector(props)}</Box>;
};

export default ExamProcessTracker;

//const labelProps = {};
//   if (props.onWhichStep === ) {
//     labelProps.optional = (
//       <Typography variant="caption">Alert message</Typography>
//     );
//   }

// if (props.onWhichStep === 0)
//   return (
//     <Step key={label}>
//       <StepLabel>{label}</StepLabel>
//     </Step>
//   );
// else if (
//   props.onWhichStep === 1 &&
//   props.currentStatus === "Enrolled Not Scheduled"
// ) {
//   return (
//     <Step key={label}>
//       <StepLabel>{label}</StepLabel>
//     </Step>
//   );
// } else if (
//   props.onWhichStep === 1 &&
//   props.currentStatus === "Scheduled"
// ) {
//   // steps.splice(1, 0, "Exam Scheduled");
//   console.log(props.currentStatus);
//   return (
//     <Step key={label}>
//       <StepLabel>Exam Scheduled</StepLabel>
//     </Step>
//   );
// } else if (
//   props.onWhichStep === 4 &&
//   props.currentStatus === "Completed"
// ) {
//   return (
//     <Step key={label}>
//       <StepLabel>{label}</StepLabel>
//     </Step>
//   );
// }

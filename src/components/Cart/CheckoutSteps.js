import React from "react";
import { Stepper, StepLabel, Step } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import "./CheckoutSteps.css";

const CheckoutSteps = ({ activeStep }) => {
    
    const steps = ["Shipping Details", "Confirm Order", "Payment",];

    const stepStyles = {
        boxSizing: "border-box",
        backgroundColor: activeStep===1 ? "white" : "grey",
        paddingTop: "2vmax",
    };

    return (
        <div>
            <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
                {steps.map((item, index) => (
                    <Step
                        key={index}
                        active={activeStep === index ? true : false}
                        completed={activeStep >= index ? true : false}
                    >
                        <StepLabel
                            style={{ color: activeStep >= index ? "gold" : "black",}}
                            icon={<CheckCircleIcon />}
                        >
                            {item}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
};

export default CheckoutSteps;
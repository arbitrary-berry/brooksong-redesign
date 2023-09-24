import React from "react";
import Leather from "./Leather";
import Story from "./Story";
import Donation from "./Donation";
import FAQs from "./FAQs";
import { Accordion } from "@mui/material";
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import AddIcon from '@mui/icons-material/Add';


function About(){
    return(
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<AddIcon />}
            aria-controls="panel1a-content-leather"
            id="panel1a-header"
          >
            <Typography>Leather</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Leather></Leather>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
              expandIcon={<AddIcon />}
              aria-controls="panel1a-content-story"
              id="panel1a-header"
          >
            <Typography>Story</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Story></Story>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
              expandIcon={<AddIcon />}
              aria-controls="panel1a-content-donation"
              id="panel1a-header"
          >
            <Typography>Donation</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Donation></Donation>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
              expandIcon={<AddIcon />}
              aria-controls="panel1a-content-faqs"
              id="panel1a-header"
          >
            <Typography>FAQs</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <FAQs></FAQs>
            </Typography>
          </AccordionDetails>
        </Accordion>
        </div>
    )
}

export default About;

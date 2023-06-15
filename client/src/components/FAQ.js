import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQ = () => {
  return (
    <div className="faq-container">
      <div className="accordion-container">
        <h2 className="faq-heading">Frequently Asked Questions:</h2>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Can we create our own profile?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Yes, you can create your own profile and continue watching your unfinished anime anytime you like.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">What is Create Room?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Create Room is like a group chat where you can watch anime with your group while enjoying an engaging discussion with them.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Can I watch anime alone?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Yes, you can watch anime alone. If you enjoy watching anime alone, that is 100% possible.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
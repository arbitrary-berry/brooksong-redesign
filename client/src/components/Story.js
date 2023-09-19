import React from "react";
import ImageList from '@mui/material/ImageList';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ImageListItem } from "@mui/material";


function Story() {

  return (
    <div>
      <img 
        src="/images/Mia_Snap_wallets_in_a_pile.jpg" 
        alt="Mia Snap Wallets in a pile" 
        style={{ width: '100%', height: 'auto' }}
      />
        <div>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <ImageList variant="masonry">
                  <ImageListItem>
                    <img 
                      src="/images/Alyssa_fullbody_unique_market.jpeg" 
                      alt="Alyssa fullbody" 
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </ImageListItem>
                </ImageList>
              </Grid>
            </Grid>
          <Grid item md={6}>
              <Typography variant="h3">THE STORY</Typography>
              <Typography variant="body1">
              Brooksong is my middle name. My father thought of it before I was
              born as he imagined birds singing in trees next to a babbling
              brook in the mountains. The water droplet in the logo hints at
              that scene and also represents Portland, Oregon and the Pacific
              Northwest, where I’m creating these little pieces of sunshine.
              </Typography>
              <Typography variant="body1">
              I am a self-taught creative with a theatrical production
              background as a stage manager. Turning my preference for tactile
              creative expression into a business has been an idea of mine for
              10 years.
              </Typography>
              <Typography variant="body1">
              As inspiration can strike at any time, I saw a sad bag being used
              and knew I could help. My sister-in-law, Megan, was carrying a
              tote with the strap barely hanging on by a few threads, her
              birthday was coming up and an idea struck. I’m gonna make that
              awesome lady a bag! And the Megan bag was born.
              </Typography>
              <Typography variant="body1">
              Crafting and working with my hands has always been very grounding
              and a positive outlet in combating my depression and anxiety.
              </Typography>

          </Grid>
        </div>
      <Typography variant="h4">10% OF PROFITS TO DESTIGMATIZING MENTAL ILLNESS</Typography>
      <Typography variant="body1">
        I want this business to support me and help others. Since mental
        illness is something I deal with myself, I want to work on reducing the
        stigma for everyone. So 10% of profits from each sale go to the
        National Suicide Prevention Lifeline. If you or someone you know is
        suffering, reach out and ask for help. We can’t do it alone.
      </Typography>
    </div>
  );
}

export default Story;
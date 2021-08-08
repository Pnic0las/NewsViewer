import React, { Fragment } from "react";
import Card_News from "../components/Card_News"
import Hero from "../components/Hero";
import Grid from '@material-ui/core/Grid';

const Home = ({ Newsdata }) => (
  <Fragment>
    <Hero />
    <Grid container justify="center" spacing={4}>

      <>
        {
          Newsdata.map(function (item, index) {
            return (
              <Grid key={index} item>

                <Card_News Newsdata={item} />
              </Grid>
            )
          })
        }
      </>

    </Grid>
  </Fragment>
);

export default Home;

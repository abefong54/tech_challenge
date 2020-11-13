import React from 'react';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

const LandingPageContainer = styled.section`
  font-size: 1.5em;
  display: block;
  margin-left: auto;
  margin-right: auto;
  height:200%;
  width: 40%;
  text-align: center;
  background: black;
  color: black;
`;

const Welcome = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: white;
`;

const CallToAction = styled.h5`
  font-size: .80em;
  text-align: center;
  color: red;
`;

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "red" : "white"};
  color: ${props => props.primary ? "white" : "red"};
  text-decoration:none;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;


export default function Album() {
  return (
      <div>
        <LandingPageContainer>
          <Welcome>
              Music Lab @ iHeartMedia
          </Welcome>
          <CallToAction>
             You can explore musical metrics here
          </CallToAction>
          <Button as="a" href="/table">explore </Button>
        </LandingPageContainer>
      </div>
  );
}
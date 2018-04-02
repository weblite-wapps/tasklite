// modules
import React from 'react'
import Typography from 'material-ui/Typography'
// sccsClasses
import scssClasses from './About.scss'


export default () => (
  <React.Fragment>
    <div className={scssClasses.container}>
      <img alt="tasklite about" src="assets/about.jpg" align="middle" />
      <Typography variant="subheading" align="center" gutterBottom>
        Version 1.0.0
      </Typography>
      <Typography variant="subheading" align="center" gutterBottom>
        All right reserved
      </Typography>
    </div>
  </React.Fragment>
)

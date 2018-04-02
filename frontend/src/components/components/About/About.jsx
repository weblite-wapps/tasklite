// modules
import React from 'react'
import Typography from 'material-ui/Typography'
// sccsClasses
import scssClasses from './About.scss'


export default () => (
  <div className={scssClasses.container}>
    <img
      alt="tasklite about"
      src="assets/typo.png"
      align="middle"
      className={scssClasses.image}
    />
    <Typography variant="display1" align="center" gutterBottom>
      Version 1.0.0
    </Typography>
    <Typography variant="display1" align="center" gutterBottom>
      All right reserved
    </Typography>
  </div>
)

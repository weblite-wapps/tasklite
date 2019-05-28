// modules
import React from 'react'
import Typography from '@material-ui/core/Typography'
// styles
import './About.scss'

export default () => (
  <React.Fragment>
    <div className="c--about_container">
      <img
        className="c--about_img"
        alt="tasklite about"
        src="about.jpg"
        align="middle"
      />
      <Typography variant="subtitle1" align="center" gutterBottom>
        Version 1.0.0
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        All right reserved
      </Typography>
    </div>
  </React.Fragment>
)

export default () => ({
  passive: {
    backgroundColor: '#cfcfcf',
    marginLeft: '10px',
    marginRight: '10px',
    width: '50px',
    height: '50px',
    cursor: 'pointer',
    outline: 'none',
    '&:hover': {
      backgroundColor: '#919191',
      transition: 'background-color 0.5s ease',
    },
    transition: 'background-color 1s ease',
  },
  active: {
    backgroundColor: '#4CAF50',
    marginLeft: '10px',
    marginRight: '10px',
    width: '50px',
    height: '50px',
    cursor: 'pointer',
    outline: 'none',
    transition: 'background-color 1s ease',
  },
  default: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    margin: '10px 20px 10px 20px',
    height: '2px',
  },
  error: {
    backgroundColor: '#e25141',
    margin: '10px 20px 10px 20px',
    height: '2px',
  },
  text: {
    color: '#919191',
    margin: '0px 0px 10px 20px',
    fontSize: '12px',
  },
  username: {
    whiteSpace: 'nowrap',
    width: '70px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
})

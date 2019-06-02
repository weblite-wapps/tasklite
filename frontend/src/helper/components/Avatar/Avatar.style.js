export default () => ({
  passive: {
    marginLeft: '10px',
    marginRight: '10px',
    width: '50px',
    height: '50px',
    cursor: 'pointer',
    outline: 'none',
    boxShadow: '0 0 0 1px #ffffff, 0 0 0 5px #ffffff',
    transition: 'box-shadow 1s ease',
    '&:hover': {
      boxShadow: '0 0 0 1px #ffffff, 0 0 0 5px #519ae7',
      transition: 'box-shadow 1s ease',
    },
  },
  active: {
    marginLeft: '10px',
    marginRight: '10px',
    width: '50px',
    height: '50px',
    cursor: 'pointer',
    outline: 'none',
    boxShadow: '0 0 0 1px #ffffff, 0 0 0 5px #519ae7',
    transition: 'box-shadow 1s ease',
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
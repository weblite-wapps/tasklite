import {
  createMuiTheme
} from '@material-ui/core/styles'

export default createMuiTheme({
  typography: {
    // TODO: should remove in next version
    useNextVariants: true,
  },
  overrides: {
    MuiTypography: {
      h4: {
        color: '#000000',
        fontWeight: '500',
      },
      body1: {
        fontWeight: '100',
        color: '#cfcfcf',
      },
      h5: {
        color: '#919191',
        textTransform: 'uppercase',
        margin: '5px',
        textAlign: 'center',
        fontSize: '27px',
        width: '165px',
      },
      h6: {
        fontSize: '18px',
        textTransform: 'uppercase',
        fontWeight: '900',
      },
      button: {
        color: '#cfcfcf',
        fontSize: '12px',
        fontWeight: '500',
        marginBottom: '3px',
      },
      caption: {
        color: 'black',
      },
    },
    MuiIconButton: {
      root: {
        height: '30px',
        width: '30px',
        padding: '0',
        color: '#000000',
      },
    },
    MuiDialog: {
      root: {
        display: 'flex',
        flexDirection: 'column', 
        top: '50px',
      },
    },
    MuiToolbar: {
      root: {
        backgroundColor: '#62666C',
        justifyContent: 'space-between',
      },
    },
    MuiTab: {
      root: {
        height: '50px',
      },
    },
    MuiTabIndicator: {
      root: {
        height: '5px',
      },
    },
    MuiCircularProgress: {
      colorPrimary: {
        color: 'white',
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: '#000000',
        margin: '5px 30px 5px 30px',
      },
      middle: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        margin: '10px 0px 10px 0px',
      },
      inset: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        margin: '10px 60px 10px 0px',
        marginLeft: '0px',
      },
      absolute: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        margin: '10px 30px 10px 0px',
        marginLeft: '0px',
      },
    },
    MuiList: {
      root: {
        margin: '5px 0px 0px 0px',
      },
    },
    MuiListItem: {
      default: {
        paddingTop: '0px',
        paddingBottom: '0px',
      },
      dense: {
        paddingLeft: '30px',
      },
    },
    MuiListItemSecondaryAction: {
      root: {
        paddingRight: '20px',
      },
    },
    MuiSvgIcon: {
      root: {
        width: '15px',
        height: '15px',
      },
    },
    MuiBadge: {
      badge: {
        backgroundColor: '#519ae7',
        color: 'white',
        top: '15px',
        right: '10px',
        bottom: '10px',
        fontSize: '0.5rem',
        width: '20px',
        height: '20px',
      },
    },
    MuiLinearProgress: {
      barColorPrimary: {
        backgroundColor: '#505050',
      },
      colorPrimary: {
        backgroundColor: '#919191',
      },
    },
    MuiAvatar: {
      root: {
        width: '50px',
        height: '50px',
      },
    },
  },
})
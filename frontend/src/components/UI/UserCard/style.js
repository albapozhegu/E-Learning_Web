import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    padding: '1.8rem 1.2rem',
    boxShadow: 'var(--box-shadow-2)',
    borderRadius: 'var(--sm-border-radius)',
    cursor: 'pointer',
    backgroundColor: 'var(--bg-color-accent)',
    transition: 'all 0.25s',

    minHeight: '8rem',
    height: '100%',

    '&:hover, &:active': {
      backgroundColor: 'var(--hover-color)',
    },

    [theme.breakpoints.up('sm')]: {
      padding: '2.4rem 1.8rem',
    },

    [theme.breakpoints.up('md')]: {
      minHeight: '18rem',
    },
  },

  avatar: {
    width: '8rem',
    height: '8rem',
    marginRight: '1.7rem',
    border: '1px solid var(--primary-color)',
    borderRadius: "50%"
  },

  name: {
    color: 'var(--primary-color)',
    fontWeight: 600,
    fontSize: '2.2rem',
    letterSpacing: '0.5px',
  },

  role: {
    display: 'none',
    marginTop: '0.6rem',
    color: 'var(--label-color)',
    fontSize: '1.6rem',
    fontWeight: 500,
    letterSpacing: '0.5px',
    textTransform: 'capitalize',

    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  status: {
    marginTop: '0.6rem',
    fontSize: '1.4rem',
    fontWeight: 400
  }
}));

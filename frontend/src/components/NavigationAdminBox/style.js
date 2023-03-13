import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    padding: "2rem",
    border: "3px solid #eee",
    borderRadius: 'var(--sm-border-radius)',
    cursor: 'pointer',
    backgroundColor: 'var(--bg-color-accent)',
    transition: 'all 0.25s',
    '&:hover, &:active': {
      backgroundColor: 'var(--hover-color)',
    },
  },

  icon: {
    width: '4.2rem',
    height: '4.2rem',
    marginRight: '1.4rem',
  },

  title: {
    color: 'var(--primary-color)',
    fontWeight: 600,
    fontSize: '2rem',
    letterSpacing: '0.5px',
    textTransform:'none'
  },

  subTitle: {
    display: 'none',
    marginTop: '0.6rem',
    color: 'var(--label-color)',
    fontSize: '1.4rem',
    fontWeight: 500,
    letterSpacing: '0.5px',

    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

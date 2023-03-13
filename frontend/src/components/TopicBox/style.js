import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    minHeight: '130px',
    height: '100%',
    backgroundColor: 'var(--bg-color-accent)',
    borderRadius: '8px',
    cursor: 'pointer',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    transition: 'all 0.35s',
    '&:hover, &:active': {
      backgroundColor: 'var(--hover-color)',
    },
  },

  icon: {
    width: '5rem',
    height: '5rem',
    marginBottom: '12px',
  },

  title: {
    color: 'var(--primary-color)',
    fontWeight: 600,
    fontSize: '2rem',
    letterSpacing: '0.5px',
  },

}));

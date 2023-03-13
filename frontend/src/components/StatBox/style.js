import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    padding: '1.2rem 1.2rem',
    boxShadow: 'var(--box-shadow-2)',
    borderRadius: 'var(--sm-border-radius)',
    cursor: 'pointer',
    backgroundColor: 'var(--bg-color-accent)',
    transition: 'all 0.25s',
    minHeight: '10rem',
    height: '100%',
  },

  icon: {
    width: '4.4rem',
    height: '4.4rem',
    marginRight: '1.4rem',
  },

  title: {
    color: 'var(--primary-color)',
    fontWeight: 500,
    fontSize: '1.4rem',
    letterSpacing: '0.5px',
  },
  count: {
    color: 'var(--primary-color)',
    fontWeight: 500,
    fontSize: '4rem',
    letterSpacing: '0.5px',
  }
}));

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    padding: '2.8rem 3.6rem',
    boxShadow: 'var(--box-shadow)',
    borderRadius: 'var(--border-radius)',
    backgroundColor: 'var(--bg-color-sec)',
  },

  title: {
    color: 'var(--title-color)',
    textTransform: 'capitalize',
    fontSize: '2.8rem',
    marginBottom: '1.2rem',
  },

  grid: {
    marginTop: '2.4rem',
    marginBottom: '2.4rem',
  },

  tooltipIcon: {
    fontSize: '1.6rem',
    color: 'var(--label-color)',
  },

  btn: {
    marginLeft: '1rem',
    textTransform: 'none',
    minWidth: '14rem',
  },

  btnReset: {
    borderColor: 'var(--accent-color) !important',
    color: 'var(--accent-color) !important',

    '&:hover, &:active': {
      filter: 'brightness(0.85)',
    },
  },

  word: {
    fontSize: '1.8rem',
    fontWeight: 500,
    color: 'var(--primary-color)',
  },
  root2: {
    marginTop: '3.2rem',

    '& ::-webkit-scrollbar': {
      width: '2px',
    },

    '& ::-webkit-scrollbar-track': {
      background: 'none',
    },

    '& ::-webkit-scrollbar-thumb': {
      borderRadius: '25px',
    },
  },

  contentWrap: {
    marginTop: '2.4rem',
  },

  listWrap: {
    padding: '1.2rem 0.4rem',
    backgroundColor: 'var(--bg-color-accent)',
    borderRadius: 'var(--border-radius)',
    border: 'solid 1px var(--border-color)',
  },

  list: {
    padding: '0 2.4rem',
    height: 'calc(100vh - 24rem)',
    overflow: 'auto',
  },

  listItem: {
    margin: '0.6rem 0',
  },

  skeleton: {
    height: '100%',

    '& > *': {
      margin: '1.2rem 0',
      height: 'calc(10% - 1.2rem)',
    },
  },
  root3: {
    padding: '1.2rem 0',
    borderBottom: 'solid 1px var(--border-color)',
    cursor: 'pointer',
    transition: 'all 0.35s',

    '&:hover, &:active': {
      borderBottom: 'solid 1px var(--accent-color)',
    },
  },
}));

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  groupCollapse: {
    boxShadow: 'var(--box-shadow-2)',
    backgroundColor: 'var(--bg-color-accent)',
    borderRadius: 'var(--border-radius)',
    border: 'none',
    margin: '2.4rem 0',
  },

  arrowIcon: {
    color: 'var(--grey)',
  },

  gcTitle: {
    color: 'var(--secondary-color)',
    fontWeight: 500,
    fontSize: '2rem',
  },

  gcDetails: {
    display: 'flex-center',
  },

  word: {
    display: 'inline-block',
    fontSize: '2.4rem',
    color: 'var(--accent-color)',
    margin: '0.8rem 1rem 0.8rem 0',
  },
  relative: {
    display: 'inline-block',
    fontSize: '2.2rem',
    fontWeight: 500,
    color: 'red',
    margin: '0.8rem 0rem 0rem 0',
    
  },

  gcDesc: {
    fontSize: '1.7rem',
    color: 'var(--text-color)',
    marginLeft: '1.2rem0'
  },

  flexboxcontainer: {
    flexDirection: "row",
    flexFlow: 'auto',
  },

  example: {
    '& b': {
      fontSize: '1.6rem',
      textDecoration: 'underline',
    },
    color: 'var(--text-color)',
    fontSize: '1.6rem',
  },
  picture: {
    width: '50rem',
    height: '30rem',
    marginLeft: '15rem',
  },

  mouthShapeImg: {
    width: '12rem',
    height: '12rem',
    marginLeft: '1rem',
  },
  root: {
    padding: '1.2rem 0',
    borderBottom: 'solid 1px var(--border-color)',
    cursor: 'pointer',
    transition: 'all 0.35s',

    '&:hover, &:active': {
      borderBottom: 'solid 1px var(--accent-color)',
    },
  },
  mobilelist : {
    height: "115px",
 
  },
floatleft: {
  float: "left",
  margin: "0 10px 10px 0px",
  padding: "2px",
},
title: {
  display: 'inline-block',
  fontSize: '2.0rem',
  fontWeight: 400,
  color: 'blue',
  margin: '0.8rem 0rem 0rem 0',
  '&:hover, &:focus': {
    color: "red",
    fontSize:'2.3rem',
  },
},
tldetail: {
  fontSize: '1.5rem',
  fontWeight:400,
  color: 'black', 
},
textlimit: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  width: "500px",
},

}));

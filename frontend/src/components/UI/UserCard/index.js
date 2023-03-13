import React from 'react'
import { Link } from 'react-router-dom'
import useStyle from './style';

export default function UserCard({to, avatar, name, role, status}) {
  const classes = useStyle();
  return (
    <Link to={to} className={`${classes.root} flex-center--ver w-100`}>
      <img className={classes.avatar} src={avatar} alt="Avatar" />
      <div>
        <h2 className={classes.name}>{name}</h2>
        <h4 className={classes.role}>{role}</h4>
        <p className={classes.status}>Status: {status === 0 ? 'Work' : 'Locked'}</p>
      </div>
    </Link>
  );
}


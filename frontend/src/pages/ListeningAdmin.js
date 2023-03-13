import React from 'react'
import useTitle from 'hooks/useTitle';
import ListeningAdminData from 'components/ListeningAdmin/data';

export default function ListeningAdminPage() {
  useTitle('Listening Admin');
  return (
    <div className="container">
      <ListeningAdminData/>
    </div>
  )
}


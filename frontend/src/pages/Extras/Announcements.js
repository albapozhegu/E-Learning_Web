import AnnouncementAdmin from '../../components/Extras/AnnouncementAdmin'
import AddAnnouncement from '../../components/Extras/AnnouncementAdmin/AddAnnouncement'
import AdminAnnouncementPage from '../../components/Extras/AnnouncementAdmin/AdminAnnouncementPage'
import React from 'react'

export default function Announcements() {
  return (
    <div>
      <AdminAnnouncementPage/>
        <AddAnnouncement/>
        <AnnouncementAdmin/>
    </div>
  )
}

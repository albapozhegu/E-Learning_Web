import React from 'react'
import { dictionaryRoot } from '../components/UI/style'
import { makeStyles } from '@material-ui/styles';
import useTitle from './../hooks/useTitle';
import GrammarAdminData from '../components/GrammarAdmin/data'

const useStyle = makeStyles((theme) => ({
  ...dictionaryRoot(theme)
}))

export default function GrammarAdminPage() {
  useTitle('Grammar Admin')
  const classes = useStyle();
  return (
    <div className="container">
      <GrammarAdminData/>
    </div>
  )
}


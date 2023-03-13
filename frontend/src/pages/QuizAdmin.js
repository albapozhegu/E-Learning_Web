import React from 'react'
import { dictionaryRoot } from '../components/UI/style'
import { makeStyles } from '@material-ui/styles';
import useTitle from './../hooks/useTitle';
import QuizAdminData from 'components/QuizAdmin/data';

const useStyle = makeStyles((theme) => ({
  ...dictionaryRoot(theme)
}))

export default function QuizAdminPage() {
  useTitle('Listening Admin')
  const classes = useStyle();
  return (
    <div className="container">
      <QuizAdminData />
    </div>
  )
}


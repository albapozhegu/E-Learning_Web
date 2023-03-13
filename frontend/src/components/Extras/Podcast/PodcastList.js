import React,{useState,useEffect} from 'react'
import { makeStyles } from "@material-ui/styles";
import { Grid ,Card,CardContent,Box} from "@material-ui/core";
import { dictionaryRoot } from "../../UI/style";
import { ROUTES } from "constants/index";
import AddIcon from "@material-ui/icons/Add";
import { useHistory,Link as RouterLink } from "react-router-dom";
import announcementsApi from 'apis/Extras/announcementApi'
//-----------------------------------------------------------------
const useStyle = makeStyles((theme) => ({
    ...dictionaryRoot(theme),
  }));
  
export default function PodcastList() {
    const classes = useStyle();
    const [data, setData] = useState([]);
    const history = useHistory();
useEffect(()=>{
    (async function () {
        const res = await announcementsApi.getAnnouncements()
        setData(res.data);
      })();
      return () => {};
},[]);

  return (
    <div className={`${classes.root} english-container`}>
      <div className="flex-center-between">
        <h1 className="english-title">Announcements</h1>
        <AddIcon
          className="english-setting-icon mr-5"
          onClick={() => history.push('/admin/announcements/add')}
        />
      </div>
      <div className="english-break"></div>
      <Grid container spacing={3}>
        {[1,2].map((ann, index) => (
          <Grid item xs={12} md={6} key={index}>
            
              <div>
                <AnnouncementCard id='' title={ann.title} content={ann.content}/>
              </div>
            
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
const AnnouncementCard=({id})=>(<>
<Card>
    <CardContent>
        <Box component={RouterLink} to={`/admin/announcements/${id}`}>
            card
        </Box>
    </CardContent>
</Card>

</>)


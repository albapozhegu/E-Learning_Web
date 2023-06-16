import React,{useState,useEffect} from 'react'
import { makeStyles } from "@material-ui/styles";
import { Grid ,Card,CardContent,Box} from "@material-ui/core";
import { dictionaryRoot } from "../../UI/style";
import { ROUTES } from "constants/index";
import AddIcon from "@material-ui/icons/Add";
import { useHistory,Link as RouterLink } from "react-router-dom";
import bookApi from 'apis/Extras/booksApi'
//-----------------------------------------------------------------
const useStyle = makeStyles((theme) => ({
    ...dictionaryRoot(theme),
  }));
  
export default function BookListPage() {
    const classes = useStyle();
    const [data, setData] = useState([]);
    const history = useHistory();
useEffect(()=>{
    (async function () {
        const res = await bookApi.getbook()
        console.log(res.data)
        setData(res.data.books);
      })();
      return () => {};
},[]);

  return (
    <div className={`${classes.root} english-container`}>
      <div className="flex-center-between">
        <h1 className="english-title">Books</h1>
        <AddIcon
          className="english-setting-icon mr-5"
          onClick={() => history.push('/admin/book/add')}
        />
      </div>
      <div className="english-break"></div>
      <Grid container spacing={3}>
        {data.map((ann, index) => (
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


import React, { useState,useEffect } from 'react';
import { Box, Grid, Typography, Button } from '@material-ui/core';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { makeStyles } from "@material-ui/core/styles";
import useTitle from "hooks/useTitle";
import InputCustom from "components/UI/InputCustom";
import * as yup from "yup";
import SaveIcon from "@material-ui/icons/Save";
import { useDispatch } from "react-redux";
import { setMessage } from "redux/actions/messageAction";
import { convertImageToBase64 } from "helper";
import {useHistory,useParams} from 'react-router-dom'
import LoopIcon from "@material-ui/icons/Loop";
import bookApi from 'apis/Extras/booksApi';

//-------------------------------------------------------------------------------------------------------------------
const useStyle = makeStyles(() => ({
  wrap: {
    minHeight: "calc(100vh - 7.2rem)",
    width: 'auto'
  },

  root: {
    backgroundColor: "var(--bg-color-sec)",
    padding: "1.5rem 2.5rem",
    borderRadius: "var(--border-radius)",
    textAlign: "center",
    boxShadow: "var(--box-shadow)",
    width: '80%'
  },

  avtWrap: {
    width: "15rem",
    height: "15rem",
    position: "relative",
  },
  avt: {

  },
  avti: {
    borderRadius: "50%",
    border: "2px solid var(--primary-color)",
  },

  cameraIconWrap: {
    position: "absolute",
    right: 0,
    bottom: 0,

    width: "4.2rem",
    height: "4.2rem",
    padding: "1.2rem",

    backgroundColor: "var(--primary-color)",
    borderRadius: "50%",
    cursor: "pointer",
    border: "solid 5px var(--bg-color-sec)",

    "&:hover, &:active": {
      opacity: 0.85,
    },
  },

  cameraIcon: {
    color: "var(--text-color)",
    fontSize: "2rem",
  },

  fileInput: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    opacity: 0,
    cursor: "pointer",
  },

  name: {
    fontSize: "2.4rem",
    lineHeight: 1.5,
    letterSpacing: "0.75px",
  },

  role: {
    fontSize: "1.5rem",
    fontWeight: 400,
    color: "var(--label-color)",
    letterSpacing: "0.75px",
    textTransform: "capitalize",
  },

  info: {
    margin: "2.4rem 0",

    "& p": {
      lineHeight: 2,
      fontSize: "1.6rem",
      letterSpacing: "0.75px",
      color: "var(--text-color)",
    },
  },

  coin: {
    color: "var(--label-color)",
    fontWeight: "bold",
    fontSize: "2rem",
  },
  icon: {
    fontSize: "1.8rem",
    color: "var(--grey)",
    cursor: "pointer",
  },

  visiblePw: {
    color: "var(--primary-color)",
  },
  visibleConfirmPw: {
    color: "var(--primary-color)",
  },
  editBtn: {
    padding: "5px 10px",
  },
  textError: {
    marginTop: "4px",
    color: "var(--error-color)",
    fontSize: "1.2rem",
    textAlign: "left",
  },
}));
const schema = yup.object().shape({
  title: yup.string().required('Book title is required'),
  description: yup.string().required('Description is required'),
  price: yup.number().required('Price is required'),
  authour: yup.string().required('Authour name is required').min(3),


});
export default function EditBook() {
  useTitle("Add Book");

  const {id} = useParams();

  const defaultImg = `${process.env.REACT_APP_DEFAULT_BOOK_COVER}`


  const [image, setImage] = useState(defaultImg);

  const [cover, setCover]=useState(null);
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();

  const history=useHistory()

  const classes = useStyle();

 const [book, setBook] = useState(null);

    useEffect(() => {

        (
            async function () {
                const c = await bookApi.getbookbyid(id);
                if (c.status === 200) {
                  const _book = c.data.book;
                  if(_book.cover!==null){
                    setImage(_book.cover)
                  }
                   
                    setBook(_book)
                }
            }


        )();
    }, [])
     console.log(book)
  const handleBookUpdate = async(vals) => {
    console.log(vals)
    const { 
      title,
      price,
      description,
      authour } = vals;

    const fd = new FormData();
    fd.append('title', title)
    fd.append('price', price)
    fd.append('description', description)
    fd.append('authour', authour)
    
   

      try {
        const req = await bookApi.updatebook(id,fd)
        if(req.status===200){
          console.log(req.data)
          dispatch(setMessage(req.data.message||"Operation successful", "success"));
          history.push('/admin/books')
        }
      } catch (error) {
        const r = error&&error?.response
        console.log(r)
         dispatch(setMessage(r.data.message||"Something went wrong", "error"));
      }
  }

  const {
    register,
    handleChange,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });




  const handleChangePicture = (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      if (!file) {
        dispatch(setMessage("No files were uploaded", "error"));
      }
      if (file.size / 1024 ** 2 > 2) {
        dispatch(setMessage("Size too large", "error"));
      }
      convertImageToBase64(file).then((res) => {
        setImage(res);
      });
      setCover(file)
    } catch (err) {
      throw err;
    }
  };

const updateCover=async()=>{
  try{
    if(cover===null){
        dispatch(setMessage("Click blue button to upload a new cover image", "error"));
      //alert('Click blue button to upload a new cover')
    }else{
       const fd = new FormData();
    fd.append('cover', cover)
    const upt = await bookApi.updatecover(id,fd)
      if(upt.status===200){
         dispatch(setMessage(upt.data.message||"Operation successful", "success"));
      }
    }
     }catch(error){
 const r = error&&error?.response
        
         dispatch(setMessage(r.data.message||"Something went wrong", "error"));
      
  }
}
  
  return (
    <>
      <div className={`${classes.wrap} container flex-center`}>
        <div className={classes.root}>
         {book!==null&& <form autoComplete="off" onSubmit={handleSubmit(handleBookUpdate)}>


            <Grid container direction='column' spacing={3}>
              <Grid item>
                <Typography>Edit Book</Typography>
              </Grid>
              <Grid item container alignContent="center">
                <div className={classes.avtWrap}>
                  <img
                    src={image ? image : defaultImg}
                    alt=""
                    className={`${classes.avt} w-100 h-100`}
                  />
                  <div className={`${classes.cameraIconWrap} flex-center`}>
                    <input
                      type="file"
                      className={classes.fileInput}
                      onChange={handleChangePicture}
                      accept="image/*"
                    />
                  </div>
                </div>
               

              </Grid> 
              <Grid>
                   <Button onClick={updateCover} variant='outlined'>Update image</Button>
              </Grid>
              <br/>
<div className='english-break'></div>
<br/>
              <Grid item>
                <InputCustom
                  label="Title"
                  size="small"
                  inputProps={{
                     defaultValue:`${book!==null&&book.title||''}`,
                    name: "title",
                    ...register("title"),

                  }}
                  placeholder="Enter Book Title"
                  error={Boolean(errors.title)}
                  onChange={handleChange}
                 
                  fullWidth

                />
                {errors.title && (
                  <p className="text-error">{errors.title?.message}</p>
                )}
              </Grid>
              <Grid item container spacing={2}>
                <Grid item xs={6}>
                  <InputCustom
                    label="Authour"
                    size="small"
                    inputProps={{
                       defaultValue:`${book!==null&&book.authour||''}`,
                      name: "authour",
                      ...register("authour"),
                    }}
                    placeholder="Enter Authour Name"
                    error={Boolean(errors.authour)}
                    onChange={handleChange}
                    fullWidth
                  />
                  {errors.authour && (
                    <p className="text-error">{errors.authour?.message}</p>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <InputCustom
                    label="Price"
                    size="small"
                    type='number'
                    inputProps={{
                       defaultValue:`${book!==null&&book.price||''}`,
                      name: "price",
                      ...register("price"),
                    }}
                    placeholder="Enter Price"
                    error={Boolean(errors.price)}
                    onChange={handleChange}
                    fullWidth
                  />
                  {errors.price && (
                    <p className="text-error">{errors.price?.message}</p>
                  )}
                </Grid>
              </Grid>
              <Grid item>
                <InputCustom
                  label="description"
                  size="small"
                  inputProps={{
                     defaultValue:`${book!==null&&book.description||''}`,
                    name: "description",
                    ...register("description"),
                  }}
                  placeholder="Enter Description"
                  error={Boolean(errors.description)}
                  onChange={handleChange}
                  multiline
                  minRows={5}
                  fullWidth
                />
                {errors.description && (
                  <p className="text-error">{errors.description?.message}</p>
                )}
              </Grid>
              <Grid item container direction='row-reverse'>
                <Grid item xs={4}>
                  <Button
                    type="submit"

                    className={`${classes.editBtn} _btn _btn-primary w-100`}
                    disabled={submitting}
                    endIcon={
                      submitting ? <LoopIcon className="ani-spin" /> : <SaveIcon />
                    }
                    variant="contained"
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>}
        </div>
      </div>
    </>
  )
}



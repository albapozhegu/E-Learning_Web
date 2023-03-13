import React, { useState } from 'react';
import { Box, Grid, Typography, Button } from '@material-ui/core';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { makeStyles } from "@material-ui/core/styles";
import useTitle from "hooks/useTitle";
import InputCustom from "components/UI/InputCustom";
import * as yup from "yup";
import SaveIcon from "@material-ui/icons/Save";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import { convertImageToBase64 } from "helper/index";

import LoopIcon from "@material-ui/icons/Loop";

//-------------------------------------------------------------------------------------------------------------------
const useStyle = makeStyles(() => ({
  wrap: {
    minHeight: "calc(100vh - 7.2rem)",
    width: 500
  },

  root: {
    backgroundColor: "var(--bg-color-sec)",
    padding: "1.5rem 2.5rem",
    borderRadius: "var(--border-radius)",
    textAlign: "center",
    boxShadow: "var(--box-shadow)",
    width: 450
  },

  avtWrap: {
    width: "15rem",
    height: "15rem",
    position: "relative",
  },

  avt: {
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
  title: yup.string().required('Title is required'),
  content: yup.string().required('Content is required')
});
export default function AddBook() {
  useTitle("Add Book");
  const defaultImg =
    "https://res.cloudinary.com/phongvn2611/image/upload/v1634179173/english/avatar/avatar-default_tx5lsb.png";
  const [submitting, setSubmitting] = useState(false);
  const [avatar, setAvatar] = useState(defaultImg);
  const classes = useStyle();


  const handleAddBook = () => {

  }

  const handleChange = () => {

  }
  const handleChangeAvatar = (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      if (!file) {
      //  dispatch(setMessage("No files were uploaded", "errors"));
      }
      if (file.size / 1024 ** 2 > 2) {
       // dispatch(setMessage("Size too large", "errors"));
      }
      convertImageToBase64(file).then((res) => {
        setAvatar(res);
      });
    } catch (err) {
      throw err;
    }
  };
  const {
    createAnnouncement,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <>
      <div className={`${classes.wrap} container flex-center`}>
        <div className={classes.root}>
          <form autoComplete="off" onSubmit={handleSubmit(handleAddBook)}>

            <Grid container direction='column' spacing={3}>
              <Grid item>
                <Typography>Add Book</Typography>
              </Grid>
              <Grid item>
                <InputCustom
                  label="Title"
                  size="small"
                  placeholder="Enter Title"
                  error={Boolean(errors.title)}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <InputCustom
                  label="Authour"
                  size="small"
                  placeholder="Enter Authour"
                  error={Boolean(errors.content)}
                  onChange={handleChange}

                  fullWidth
                />
              </Grid>
              <Grid item>
                <Typography>Upload Attachment</Typography>
                <div className="flex-center w-100 h-100">
                  <div className={classes.avtWrap}>
                    <img
                      src={avatar ? avatar : defaultImg}
                      alt=""
                      className={`${classes.avt} w-100 h-100`}
                    />
                    <div className={`${classes.cameraIconWrap} flex-center`}>
                      <CameraIcon className={classes.cameraIcon} />
                      <input
                        type="file"
                        className={classes.fileInput}
                        accept="image/*"
                        onChange={handleChangeAvatar}
                      />
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item>
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
          </form>
        </div>
      </div>
    </>
  )
}



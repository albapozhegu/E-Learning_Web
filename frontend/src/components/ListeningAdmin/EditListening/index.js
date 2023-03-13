import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import LoopIcon from "@material-ui/icons/Loop";
import ResetIcon from "@material-ui/icons/RotateLeft";
import SaveIcon from "@material-ui/icons/Save";
import listeningApi from "apis/listeningApi";
import InputCustom from "components/UI/InputCustom";
import SelectCustom from "components/UI/SelectCustom";
import { LISTEN_TOPIC } from "constants/listeningTopics";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { setMessage } from "redux/actions/messageAction";
import * as yup from "yup";
import InformationTooltip from "./../CreateListen/InformationTooltip";
import useStyle from "./style";
import { useParams } from "react-router-dom";
import { convertImageToBase64 } from "helper/index";
import useTitle from "hooks/useTitle";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import RichTextEditor from 'components/UI/RichTextEditor';

const schema = yup.object().shape({
  Name: yup.string().trim().required("Input value"),
  Description: yup.string().required("Input value"),
  Topic: yup
    .string()
    .required("Select one")
    .oneOf(LISTEN_TOPIC.map((i) => i.value)),
  LinkVideo: yup.string(),
  Script: yup.string(),
});

const analysisLinkVideo = (linkVideo = "") => {
  if (typeof linkVideo !== "string" || linkVideo === "") {
    return null;
  }
  if (linkVideo.includes("embed")) {
    return linkVideo;
  }

  let checkVid = linkVideo.includes("https://www.youtube.com");
  if (!checkVid) {
    checkVid = linkVideo.includes("youtu.be/");
    if (checkVid) {
      return linkVideo;
    }
    return null;
  }
  return linkVideo;
};
const getTypeCurrent = (type = "", options = []) => {
  for (let i = 0; i < options.length; i++) {
    if (options[i].value === type) {
      return i;
    }
  }
  return 0;
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Grid>{children}</Grid>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function EditListening() {
  useTitle("Edit Listening");
  const classes = useStyle();
  const [value, setValue] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const defaultImg =
    "https://res.cloudinary.com/phongvn2611/image/upload/v1638368033/english/word/default-image_fbmbtn.png";

  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();

  const [listenValue, setListenValue] = useState(null);
  const [image, setImage] = useState(defaultImg);
  const [video, setVideo] = useState(null);
  const [linkVideo, setLinkVideo] = useState("");
  const [script, setScript] = useState("");
  const getScript = (spt) => {
    setScript(spt);
  };

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
    } catch (err) {
      throw err;
    }
  };

  const handleChangeVideo = (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      // console.log(file)
      if (!file) {
        dispatch(setMessage("No files were uploaded", "error"));
      }
      if (file.size / 1024 ** 2 > 2) {
        dispatch(setMessage("Size too large", "error"));
      }
      convertImageToBase64(file).then((res) => {
        setVideo(res);
        console.log(res);
      });
    } catch (err) {
      throw err;
    }
  };

  const { id } = useParams();

  useEffect(() => {
    (async function () {
      const apiRes = await listeningApi.getListenById(id);
      setListenValue(apiRes.data.listen);
      if (apiRes.data.listen.Video.includes("youtube")) {
        setLinkVideo(apiRes.data.listen.Video);
      }
     setScript(apiRes.data.listen.Script)
      setImage(apiRes.data.listen.Image);
    })();
    return () => {};
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setListenValue({ ...listenValue, [name]: value });
    if (name === "LinkVideo") {
      setLinkVideo(value);
    }
  };

  const handleChangeValue = (event, newValue) => {
    setValue(newValue);
  };

  const onSubmit = async () => {
    try {
      setSubmitting(true);
      const { Name, Topic, Description, Video } = listenValue;

      if (video && linkVideo &&linkVideo.trim()!=""){
        dispatch(setMessage("Choose one of two options to add a video", "warning"));
        setSubmitting(false);
        return;
      }
      
      let dataSend = [];
      let videoUrl = null;
      if (video == null) {
        console.log(video);
        console.log(linkVideo);
        if (linkVideo == null || linkVideo.trim() === "") {
          videoUrl = Video;
        } else {
          videoUrl = analysisLinkVideo(linkVideo);
          if (videoUrl == null) {
            dispatch(setMessage("Link video is invalid.", "warning"));
            setSubmitting(false);
            return;
          }
        }
        console.log(videoUrl);
        dataSend = {
          Name,
          Topic,
          Description,
          Script: script,
          Image: image,
          Video: videoUrl,
        };
      } else {
        dataSend = {
          Name,
          Topic,
          Description,
          Script: script,
          Image: image,
          Video: video,
        };
      }
      console.log(dataSend);
      const apiRes = await listeningApi.putListen(listenValue._id, dataSend);
      console.log(apiRes.data);
      if (apiRes.status === 200) {
        dispatch(setMessage("Update listening successfully", "success"));
        setSubmitting(false);
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Error, can not create listening.";
      dispatch(setMessage(message, "error"));
      setSubmitting(false);
    }
  };

  function handleClickGoBack() {
    history.push("/admin/listening");
  }

  return (
    <div>
      <h1 className={classes.title}>Edit listening</h1>
      <div className="english-break"></div>

      {listenValue && (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Grid container alignContent="center">
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
          <Grid className={classes.grid} container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <InputCustom
                className="w-100"
                label="Name"
                value={listenValue.Name}
                error={Boolean(errors.Name)}
                inputProps={{
                  name: "Name",
                  ...register("Name"),
                }}
                onChange={handleChange}
              />
              {errors.Name && (
                <p className="text-error">{errors.Name?.message}</p>
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <InputCustom
                className="w-100"
                label="Description"
                value={listenValue.Description}
                error={Boolean(errors.Description)}
                inputProps={{
                  name: "Description",
                  ...register("Description"),
                }}
                onChange={handleChange}
              />
              {errors.Description && (
                <p className="text-error">{errors.Description?.message}</p>
              )}
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <SelectCustom
                className="w-100"
                label="Topic (*)"
                options={LISTEN_TOPIC}
                error={Boolean(errors.LISTEN_TOPIC)}
                index={getTypeCurrent(listenValue.Topic, LISTEN_TOPIC)}
                inputProps={{
                  name: "Topic",
                  ...register("Topic"),
                }}
                onChange={handleChange}
              />
              {errors.Topic && (
                <p className="text-error">{errors.Topic?.message}</p>
              )}
            </Grid>

            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChangeValue}
                  aria-label="basic tabs example"
                  indicatorColor="primary"
                >
                  <Tab label="Upload" {...a11yProps(0)} />
                  <Tab label="Link" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                {/* Video */}
                <Grid item xs={6}>
                  <Grid container alignContent="center">
                    <div className={classes.avtWrap}>
                      <div className={`${classes.cameraIconWrap} flex-center`}>
                        <input
                          type="file"
                          value={listenValue.Video.fileInput}
                          className={classes.fileInput}
                          onChange={handleChangeVideo}
                          accept="video/*"
                        />
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </TabPanel>

              <TabPanel value={value} index={1}>
                <Grid item xs={6}>
                  <InputCustom
                    className="w-100"
                    label="Link Video"
                    multiline
                    value={linkVideo}
                    endAdornment={
                      <InformationTooltip title="Input link youtube" />
                    }
                    inputProps={{
                      name: "LinkVideo",
                      ...register("LinkVideo"),
                    }}
                    onChange={handleChange}
                  />

                  {errors.Video && (
                    <p className="text-error">{errors.Video?.message}</p>
                  )}
                </Grid>
              </TabPanel>
            </Box>
          </Grid>

          {/* Script */}
          <div className="row">
          <div className="col-md-6" style={{ margin: "auto", marginTop: "50px" }}>
            <div style={{ textAlign: "center" }}>
              <h3>Rich Text Editor</h3>
            </div>
            <RichTextEditor initialValue={script} getValue={getScript} />
           
          </div>
        </div> 

          <div className="english-break"></div>
          {/* button group */}
          <div className="d-flex flex-end jus-content-end pt-5 w-100">
            <Button
              className={`${classes.btn} ${classes.btnReset}`}
              color="secondary"
              endIcon={<ResetIcon />}
              variant="outlined"
              // disabled={}
              onClick={() => handleClickGoBack()}
            >
              Back
            </Button>
            <Button
              type="submit"
              className={`${classes.btn} _btn _btn-primary`}
              disabled={submitting}
              endIcon={
                submitting ? <LoopIcon className="ani-spin" /> : <SaveIcon />
              }
              variant="contained"
              onClick={() => onSubmit()}
            >
              Edit
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

EditListening.propTypes = {
  onSubmitForm: PropTypes.func,
  submitting: PropTypes.bool,
};

EditListening.defaultProps = {
  onSubmitForm: function () {},
  submitting: false,
};

export default EditListening;

import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import LoopIcon from '@material-ui/icons/Loop';
import ResetIcon from '@material-ui/icons/RotateLeft';
import SaveIcon from '@material-ui/icons/Save';
import InputCustom from 'components/UI/InputCustom';
import SelectCustom from 'components/UI/SelectCustom';
import { LISTEN_TOPIC } from './../../../constants/listeningTopics';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InformationTooltip from './InformationTooltip';
import useStyle from './style';
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMessage } from "redux/actions/messageAction";
import RichTextEditor from 'components/UI/RichTextEditor';

const schema = yup.object().shape({
  Name: yup
    .string()
    .trim()
    .required('Input value'),
  Description: yup
    .string()
    .required('Input value'),
  Topic: yup
    .string()
    .required('Select one')
    .oneOf(LISTEN_TOPIC.map((i) => i.value)),
  LinkVideo: yup
    .string(),
  Script: yup
    .string(),
});

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

function CreateListening({ onSubmitForm, submitting }) {
  const classes = useStyle();
  const [resetFlag, setResetFlag] = useState(0);
  const [value, setValue] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const history = useHistory();
  const defaultImg =
  "https://res.cloudinary.com/phongvn2611/image/upload/v1638368033/english/word/default-image_fbmbtn.png";
  const [image, setImage] = useState(defaultImg);
  const [video, setVideo] = useState(null);
  const [script, setScript] = useState("");
  const getScript = (spt) => {
    setScript(spt);
  };

  const convertImageToBase64 = (image) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    return new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
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
      convertImageToBase64(file).then(res => {
        setImage(res);
      });
      
    } catch (err) {
      throw err;
    }
  };

  const handleChangeVideo = (e) => {
   // console.log(e)
    e.preventDefault();
    try {
      const file = e.target.files[0];
      if (!file) {
        dispatch(setMessage("No files were uploaded", "error"));
      }
      if (file.size / 1024 ** 2 > 2) {
        dispatch(setMessage("Size too large", "error"));
      }
     convertImageToBase64(file).then(res => {
        setVideo(res);
      });
      
    } catch (err) {
      throw err;
    }
  };

  const onSubmit = (data) => {
    onSubmitForm({ ...data, VidUpload: video, Image: image, Script: script });
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <div >
      <h1 className={classes.title}>More listening songs</h1>
      <div className="english-break"></div>

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
          {/* new name */}
          <Grid item xs={12} md={6} lg={4}>
            <InputCustom
              className="w-100"
              label="Name (*)"
              error={Boolean(errors.Name)}
              inputProps={{
                autoFocus: true,
                name: 'Name',
                ...register('Name'),
              }}
            />
            {errors.Name && (
              <p className="text-error">{errors.Name?.message}</p>
            )}
          </Grid>

          {/* Description */}
          <Grid item xs={12} md={6} lg={4}>
            <InputCustom
              className="w-100"
              label="Description (*)"
              error={Boolean(errors.Description)}
              inputProps={{
                name: 'Description',
                ...register('Description'),
              }}
            />
            {errors.Description && (
              <p className="text-error">{errors.Description?.message}</p>
            )}
          </Grid>

          {/* topic */}
          <Grid item xs={12} md={6} lg={4}>
            <SelectCustom
              className="w-100"
              label="Topic (*)"
              options={LISTEN_TOPIC}
              error={Boolean(errors.Topic)}
              resetFlag={resetFlag}
              index={0}
              inputProps={{
                name: 'Topic',
                ...register('Topic'),
              }}
            />
            {errors.type && (
              <p className="text-error">{errors.Topic?.message}</p>
            )}
          </Grid>
          <Box sx={{ width: "50%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
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
          <Grid item xs={6} >
            <InputCustom
              className="w-100"
              label="Link Video"
              multiline
              endAdornment={
                <InformationTooltip title="Input link youtube" />
              }
              inputProps={{
                name: 'LinkVideo',
                ...register('LinkVideo'),
              }}
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
            <RichTextEditor initialValue="" getValue={getScript} />
           
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
            disabled={submitting}
            onClick={() => history.push("/admin/listening")}
           >
            Return
          </Button>
          <Button
            type="submit"
            className={`${classes.btn} _btn _btn-primary`}
            disabled={submitting}
            endIcon={
              submitting ? <LoopIcon className="ani-spin" /> : <SaveIcon />
            }
            variant="contained">
            Create
          </Button>
        </div>
      </form>
    </div>
  );
}

CreateListening.propTypes = {
  onSubmitForm: PropTypes.func,
  submitting: PropTypes.bool,
};

CreateListening.defaultProps = {
  onSubmitForm: function () {},
  submitting: false,
};

export default CreateListening;

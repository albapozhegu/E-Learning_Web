import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import LoopIcon from "@material-ui/icons/Loop";
import ResetIcon from "@material-ui/icons/RotateLeft";
import SaveIcon from "@material-ui/icons/Save";
import InputCustom from "components/UI/InputCustom";
import SelectCustom from "components/UI/SelectCustom";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InformationTooltip from "./InformationTooltip";
import useStyle from "./style";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMessage } from "redux/actions/messageAction";
import { convertImageToBase64 } from "helper";
import { GRAMMAR_LEVEL } from "constants/grammarLevels";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogActions } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import InfiniteScroll from "components/UI/InfiniteScroll";
import DeleteIcon from "@material-ui/icons/Delete";
import RichTextEditor from 'components/UI/RichTextEditor';

const schema = yup.object().shape({
  Title: yup.string().trim().required("Input value"),
  Content: yup.string().required("Input value"),
  Level: yup
    .string()
    .required("Select one")
    .oneOf(GRAMMAR_LEVEL.map((i) => i.value)),
  LinkVideo: yup.string(),
  Script: yup.string(),
  Items: yup.array(),
  Point: yup.string().required("Input value"),
  Examples: yup.string().required("Input value"),
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

function CreateGrammar({ onSubmitForm, submitting }) {
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
  //grammar item
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [more, setMore] = useState(true); // toggle infinite scrolling
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editItems, setEditItems] = useState(false);
  const [indexEdit, setIndexEdit] = useState(-1);
  const [grammarItems, setgrammarItems] = useState([]);
  const [page, setPage] = useState(1);
  const totalPage = useRef(0);

  const [point, setPoint] = useState({
    Point: "",
    Examples: "",
  });
  const handleChangeDialog = (event) => {
    const { name, value } = event.target;
    setPoint({ ...point, [name]: value });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setPoint({ Point: "", Examples: "" });
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleDialogSubmit = () => {
    if (point.Point.trim() !== "") {
      if (editItems) {
        grammarItems[indexEdit] = point;
        setEditItems(false);
        setIndexEdit(-1);
      } else {
        grammarItems.push(point);
      }
    }
    setOpenDialog(false);
    setPoint({ Point: "", Examples: "" });
  };

  const onLoadData = () => {
    if (page < totalPage.current) {
      setPage(page + 1);
    } else {
      setMore(false);
    }
  };

  const onClickItem = (index) => {
    setPoint(grammarItems[index]);
    setEditItems(true);
    setIndexEdit(index);
    setOpenDialog(true);
  };
  const deleleGrammarItems = (index) => {
    let arr = [];
    for (let i = 0; i < grammarItems.length; i++) {
      if (i !== index) arr.push(grammarItems[i]);
    }
    setgrammarItems(arr);
  };
  //grammar item

  const dispatch = useDispatch();
  const history = useHistory();
  const defaultImg =
    "https://res.cloudinary.com/phongvn2611/image/upload/v1638368033/english/word/default-image_fbmbtn.png";
  const [image, setImage] = useState(defaultImg);
  const [video, setVideo] = useState(null);
  const [audio, setAudio] = useState(null);
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

  const handleChangeAudio = (e) => {
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
        setAudio(res);
      });
    } catch (err) {
      throw err;
    }
  };

  const handleChangeVideo = (e) => {
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
        setVideo(res);
      });
    } catch (err) {
      throw err;
    }
  };

  const onSubmit = (data) => {
    onSubmitForm({
      ...data,
      VidUpload: video,
      Image: image,
      Audio: audio,
      Script: script,
      Items: grammarItems,
    });
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <h1 className={classes.title}>More grammar</h1>
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
          {/* Title */}
          <Grid item xs={12} md={6} lg={4}>
            <InputCustom
              className="w-100"
              label="Title (*)"
              error={Boolean(errors.Title)}
              inputProps={{
                autoFocus: true,
                name: "Title",
                ...register("Title"),
              }}
            />
            {errors.Title && (
              <p className="text-error">{errors.Title?.message}</p>
            )}
          </Grid>

          {/* Content */}
          <Grid item xs={12} md={6} lg={4}>
            <InputCustom
              className="w-100"
              label="Content (*)"
              error={Boolean(errors.Content)}
              inputProps={{
                name: "Content",
                ...register("Content"),
              }}
            />
            {errors.Content && (
              <p className="text-error">{errors.Content?.message}</p>
            )}
          </Grid>

          {/* Level */}
          <Grid item xs={12} md={6} lg={4}>
            <SelectCustom
              className="w-100"
              label="Level (*)"
              options={GRAMMAR_LEVEL}
              error={Boolean(errors.Level)}
              resetFlag={resetFlag}
              index={0}
              inputProps={{
                name: "Level",
                ...register("Level"),
              }}
            />
            {errors.type && (
              <p className="text-error">{errors.Level?.message}</p>
            )}
          </Grid>
          {/* Audio */}

          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                indicatorColor="primary"
              >
                <Tab label="Upload" {...a11yProps(0)} />
                <Tab label="Link" {...a11yProps(1)} />
                <Tab label="Audio" {...a11yProps(2)} />
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
              <Grid item xs={6}>
                <InputCustom
                  className="w-100"
                  label="Link Video"
                  multiline
                  endAdornment={
                    <InformationTooltip title="Input link youtube" />
                  }
                  inputProps={{
                    name: "LinkVideo",
                    ...register("LinkVideo"),
                  }}
                />

                {errors.Video && (
                  <p className="text-error">{errors.Video?.message}</p>
                )}
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={2}>
              {/* Audio */}
              <Grid item xs={6}>
                <Grid container alignContent="center">
                  <div className={classes.avtWrap}>
                    <div className={`${classes.cameraIconWrap} flex-center`}>
                      <input
                        type="file"
                        className={classes.fileInput}
                        onChange={handleChangeAudio}
                        accept="audio/*"
                      />
                    </div>
                  </div>
                </Grid>
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


        {/* Grammar Item */}
        <div className={`${classes.root2} english-container`}>
          <div className="flex-center-between">
            <h1 className="english-title">Add Content for grammar</h1>
            <div>
              <AddIcon
                className="english-setting-icon mr-5"
                onClick={() => handleOpenDialog()}
              />
              {/* Dialog */}
              <Dialog onClose={handleCloseDialog} open={openDialog}>
                <DialogTitle onClose={handleCloseDialog}>Add point</DialogTitle>
                <DialogContent dividers>
                  <form noValidate>
                    {/* Point */}
                    <Grid item xs={12}>
                      <InputCustom
                        className="w-100"
                        label="Point"
                        value={point.Point}
                        endAdornment={
                          <InformationTooltip title="Input value" />
                        }
                        error={Boolean(errors.Point)}
                        inputProps={{
                          name: "Point",
                          ...register("Point"),
                        }}
                        onChange={handleChangeDialog}
                      />
                      {errors.Point && (
                        <p className="text-error">{errors.Point?.message}</p>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <InputCustom
                        className="w-100"
                        label="Examples"
                        multiline
                        value={point.Examples}
                        endAdornment={
                          <InformationTooltip title="Input value" />
                        }
                        error={Boolean(errors.Examples)}
                        inputProps={{
                          name: "Examples",
                          ...register("Examples"),
                        }}
                        onChange={handleChangeDialog}
                      />
                      {errors.Examples && (
                        <p className="text-error">{errors.Examples?.message}</p>
                      )}
                    </Grid>
                  </form>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDialog} color="primary">
                    Cancel
                  </Button>
                  <Button
                    onClick={handleDialogSubmit}
                    color="primary"
                    autoFocus
                  >
                    Save
                  </Button>
                </DialogActions>
              </Dialog>
              {/* Dialog */}
            </div>
          </div>
          <div className="english-break"></div>

          {/* list content */}
          <div className={classes.contentWrap}>
            <div className={`${classes.listWrap} w-100`}>
              <ul
                id="dictionaryId"
                className={`${classes.list} flex-col w-100`}
              >
                <>
                  {isFirstLoad && (
                    <>
                      {grammarItems && grammarItems.length > 0 && (
                        <>
                          {/* render list */}
                          {grammarItems.map((item, index) => (
                            <li className={classes.listItem} key={index}>
                              <div
                                className={`${classes.root3} flex-center-between`}
                              >
                                <div
                                  className="w-100 flex-center--ver"
                                  onClick={() => onClickItem(index)}
                                >
                                  <div className="ml-8 flex-grow-1">
                                    <h3 className={classes.word}>
                                      {item.Point}
                                    </h3>
                                  </div>
                                </div>
                                <div className="flex-center--ver">
                                  <div className="mr-5"></div>
                                  <DeleteIcon
                                    className="english-setting-icon"
                                    onClick={() => deleleGrammarItems(index)}
                                  />
                                </div>
                              </div>
                            </li>
                          ))}

                          {/* infinite scrolling */}
                          {!loading && more && (
                            <InfiniteScroll
                              onTouchAnchor={onLoadData}
                              threshold={1}
                            >
                              <div className="w-100 t-center">
                                <LoopIcon className="ani-spin" />
                              </div>
                            </InfiniteScroll>
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
              </ul>
            </div>
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
            onClick={() => history.push("/admin/grammar")}
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
            variant="contained"
          >
            Create
          </Button>
        </div>
      </form>
    </div>
  );
}

CreateGrammar.propTypes = {
  onSubmitForm: PropTypes.func,
  submitting: PropTypes.bool,
};

CreateGrammar.defaultProps = {
  onSubmitForm: function () {},
  submitting: false,
};

export default CreateGrammar;

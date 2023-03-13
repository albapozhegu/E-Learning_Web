import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { cloudinaryImgOptimize } from "helper";
import { DEFAULTS } from "../../constants/index";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid } from "@material-ui/core";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Speaker from "components/UI/Speaker";
import PropTypes from "prop-types";
import useStyle from "./style";
import { getIPA } from "../../redux/actions/ipaAction";
import RelativeIPA from "./RelativeIPA";
import { useHistory } from "react-router-dom";

function IPAGroupCollapse() {
  const classes = useStyle();
  const id = useParams().id;
  const ipa = useSelector((state) => state.ipaReducer.ipa);

  const dispatch = useDispatch();
  useEffect(() => dispatch(getIPA(id)), [dispatch]);

  const history = useHistory();

  function handleClickGoBack() {
    history.push(`/ipa`);
  }

  let imgSrc = null;
  if (ipa) {
    imgSrc = cloudinaryImgOptimize(
      ipa.Image ? ipa.Image : DEFAULTS.IMAGE_SRC,
      200,
      200,
      true,
      true
    );
  }

  return (
    <Container>
      {ipa && (
        <>
          <>
            <Typography variant="h6" align="center">
              Pronunciation
            </Typography>
            <Typography variant="h6">{ipa.Title}</Typography>
          </>
          {ipa.Video ? (
            <p align="center">
              <iframe src={ipa.Video} width="500" height="300"></iframe>
            </p>
          ) : (
            <img
              className={classes.picture}
              src={imgSrc}
              alt=""
              align="center"
            />
          )}
          <Typography>{ipa.Description}</Typography>

          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item className="flex-center-between" xs={12} lg={6}>
                <div>
                  <div className="flex-center--ver">
                    <b className={classes.word}>
                      {" "}
                      Phonetic: / {ipa.Phonetic} /
                    </b>
                    {ipa.Audio && <Speaker type={false} audioSrc={ipa.Audio} />}
                  </div>

                  <div className={classes.example}>
                    <b>Example:</b>
                    {ipa.Examples &&
                      ipa.Examples.map((example, exKey) => (
                        <div className="flex-center--ver my-4" key={exKey}>
                          <span className="mr-4">
                            {example.Word}
                            <span className="phonetic px-3">
                              {example.Phonetic}
                            </span>
                          </span>
                          <Speaker type={true} text={example.Word} />
                        </div>
                      ))}
                  </div>
                </div>
              </Grid>
            </Grid>
          </AccordionDetails>

          <RelativeIPA type={ipa.Type} phonetic={ipa.Phonetic} />

          <Typography></Typography>
          <Button color="primary" onClick={() => handleClickGoBack()}>
            {" "}
            GO BACK
          </Button>
        </>
      )}
    </Container>
  );
}

IPAGroupCollapse.propTypes = {
  phoneticList: PropTypes.array,
  title: PropTypes.string,
  isNoVoice: PropTypes.bool,
};

IPAGroupCollapse.defaultProps = {
  phoneticList: [],
  title: "",
  isNoVoice: false,
};

export default IPAGroupCollapse;

import useTitle from "hooks/useTitle";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import React, { useState, useEffect } from "react";
import listeningApi from "../apis/listeningApi";
import { useHistory, useParams } from "react-router";
import { cloudinaryImgOptimize } from "helper";
import { DEFAULTS } from "constants/index";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyle = makeStyles(() => ({
  mobilelist: {
    height: "115px",
  },
  floatleft: {
    float: "left",
    margin: "0 10px 10px 0px",
    padding: "2px",
  },
  title: {
    display: "inline-block",
    fontSize: "2.0rem",
    fontWeight: 400,
    color: "blue",
    margin: "0.8rem 0rem 0rem 0",
    "&:hover, &:focus": {
      color: "#CCC",
    },
  },
  tldetail: {
    fontSize: "1.5rem",
    fontWeight: 400,
    color: "black",
  },
  textlimit: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    width: "500px",
  },
}));

function ListeningByTopicPage() {
  useTitle("Listening");
  const [list, setList] = useState([]);
  const classes = useStyle();
  const history = useHistory();

  const topic = useParams().topic;

  useEffect(() => {
    (async function () {
      try {
        const apiRes = await listeningApi.getListenByTopic(topic, "Newest");
        if (apiRes.status === 200) {
          console.log(apiRes.data);
          setList(apiRes.data.listens);
        }
      } catch (error) {}
    })();

    return () => {};
  }, []);

  const getImage = (image) => {
    const imgSrc = cloudinaryImgOptimize(
      image ? image : DEFAULTS.IMAGE_SRC,
      200,
      200,
      true,
      true
    );
    return imgSrc;
  };

  const viewDetail = (id) => {
    history.push(`/listening/details/${id}`);
  };

  return (
    <>
      <Typography variant="h4" align="center">
        {topic}
      </Typography>
      <div
        className="container"
        style={{ position: "relative", left: "250px" }}
      >
        {list &&
          list.map((item) => (
            <div className={classes.mobilelist}>
              <div>
                <Link to={`/listening/details/${item._id}`}>
                  <div className={classes.floatleft}>
                    <img
                      height="80px"
                      width="80px"
                      src={getImage(item.Image)}
                      alt=""
                    />
                  </div>
                  <p className={classes.title}>
                    <strong> {item.Name}</strong>
                  </p>
                  <br></br>
                </Link>
                <div className={classes.textlimit}>
                  <span className={classes.tldetail}>{item.Description}</span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default ListeningByTopicPage;

import React, { useState, useEffect } from "react";
import ipaApi from "apis/ipaApi";
import { cloudinaryImgOptimize } from "helper";
import { DEFAULTS } from "constants/index";
import { makeStyles } from "@material-ui/core";
import { useHistory, useParams } from "react-router";
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

function Consonants() {
  const [list, setList] = useState([]);
  const classes = useStyle();
  const history = useHistory();

  useEffect(() => {
    (async function () {
      try {
        const apiRes = await ipaApi.getIPAByType("Consonants");
        if (apiRes.status === 200) {
          setList(apiRes.data.ipas);
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
    history.push(`/ipa/details/${id}`);
  };

  return (
    <>
      <h2 className="english-title">3. Consonants</h2>
      <h3 className="english-sub-title" />
      <div className="container" style={{ position: "relative", left: "50px" }}>
        {list &&
          list.map((item) => (
            <div className={classes.mobilelist}>
              <div>
                <Link to={`/ipa/details/${item._id}`}>
                  <div className={classes.floatleft}>
                    <img
                      height="80px"
                      width="80px"
                      src={getImage(item.Image)}
                    />
                  </div>
                  <p className={classes.title}>
                    <strong> {item.Title}</strong>
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

export default Consonants;

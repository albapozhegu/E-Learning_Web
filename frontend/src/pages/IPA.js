import Consonants from "components/IPA/Consonants";
import Diphthongs from "components/IPA/Diphthongs";
import Vowels from "components/IPA/Vowels";
import useTitle from "hooks/useTitle";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { dictionaryRoot } from "../components/UI/style";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles((theme) => ({
  ...dictionaryRoot(theme),
}));

function IPAPage() {
  useTitle("IPA");
  const classes = useStyle();
  return (
    <div className={`${classes.root} english-container`}>
      <Typography variant="h4" align="center" style={{ color: "#CA3600" }}>
        Pronunciation
      </Typography>
      <Typography variant="h6" align="center">
        Introduction to The Sounds of English
      </Typography>

      <p align="center">
        <iframe
          src="https://www.youtube.com/embed/fdRmGvmeY1U?enablejsapi=1"
          width="500"
          height="300"
        ></iframe>
      </p>
      <Typography align="center">
        This is the introductory video to our The sounds of English series
      </Typography>

      <Vowels />
      <Diphthongs />
      <Consonants />
    </div>
  );
}

export default IPAPage;

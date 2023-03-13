import Grid from "@material-ui/core/Grid";
import { ROUTES } from "../constants";
import useTitle from "../hooks/useTitle";
import React from "react";
import "./style/home.scss";
import Banner from "components/Banner";
import Contact from "components/Contacts";
import {
  FaMicrosoft,
  FaCoffee,
  FaLanguage,
  FaLaptopHouse,
  FaLayerGroup,
  FaGrin,
} from "react-icons/fa";

function HomePage() {
  useTitle("Study");
  //const classes= useStyle();
  return (
    <div>
      <Banner />
      <section className="section section-height-2 border-0 mt-5 mb-0 pt-5">
        <div className="row text-capitalize pt-3" align="center">
          <div className="col-md-10 mx-md-auto">
            <h1 className="mb-2 mt-2 text-2">
              <p style={{ fontSize: "3.2rem", fontWeight: 800, color: "gray" }}>
                {" "}
                you can learn English for free!
              </p>
            </h1>
            <div className="row">
              <p style={{ fontSize: "2.2rem", fontWeight: 800, color: "blue" }}>
                Skill Group
              </p>
            </div>
          </div>
        </div>

        <div className="container mb-5 pb-4">
          <Grid container spacing={1}>
            <Grid item xs={3} md={1} lg={3} key={0}>
              <div className="featured-boxes featured-boxes-flat">
                <div className="row">
                  <div className="col-lg-3 col-sm-6">
                    <div
                      className="featured-box featured-box-primary featured-box-effect-2"
                      style={{ height: "264.8px" }}
                    >
                      <div className="box-content box-content-border-bottom">
                        <a href={ROUTES.LISTENING_TOPICS}>
                          <i className="icon-featured">
                            <FaMicrosoft style={{ color: "black" }} />
                          </i>
                          <h1
                            className="font-weight-normal"
                            style={{
                              fontSize: "2.6em",
                              lineHeight: "44px",
                              margin: "0 0 32px 0",
                              color: "#3366FF",
                              fontWeight: "200",
                              letterSpacing: "-.05em",
                              margin: "0",
                              webkitFontSmoothing: "antialiased",
                            }}
                          >
                            Listening
                          </h1>
                        </a>
                        <p
                          className="mb-2 mt-2 text-2"
                          style={{
                            color: "#777",
                            lineHeight: "26px",
                            margin: "0 0 20px",
                          }}
                        >
                          Listening videos and answer the questions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>

            <Grid item xs={3} md={1} lg={3} key={0}>
              <div className="featured-boxes featured-boxes-flat">
                <div className="row">
                  <div className="col-lg-3 col-sm-6">
                    <div
                      className="featured-box featured-box-primary featured-box-effect-2"
                      style={{ height: "264.8px" }}
                    >
                      <div className="box-content box-content-border-bottom">
                        <a href={ROUTES.GRAMMAR_LEVELS}>
                          <i className="icon-featured">
                            <FaCoffee style={{ color: "black" }} />
                          </i>
                          <h1
                            className="font-weight-normal"
                            style={{
                              fontSize: "2.6em",
                              lineHeight: "44px",
                              margin: "0 0 32px 0",
                              color: "#3366FF",
                              fontWeight: "200",
                              letterSpacing: "-.05em",
                              margin: "0",
                              webkitFontSmoothing: "antialiased",
                            }}
                          >
                            Grammar
                          </h1>
                        </a>
                        <p
                          className="mb-2 mt-2 text-2"
                          style={{
                            color: "#777",
                            lineHeight: "26px",
                            margin: "0 0 20px",
                          }}
                        >
                          Our guide to English grammar.
                        </p>
                        <br></br>
                        <br></br>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>

            <Grid item xs={3} md={1} lg={3} key={0}>
              <div className="featured-boxes featured-boxes-flat">
                <div className="row">
                  <div className="col-lg-3 col-sm-6">
                    <div
                      className="featured-box featured-box-primary featured-box-effect-2"
                      style={{ height: "264.8px" }}
                    >
                      <div className="box-content box-content-border-bottom">
                        <a href={ROUTES.WORD_TOPIC}>
                          <i className="icon-featured">
                            <FaLaptopHouse style={{ color: "black" }} />
                          </i>
                          <h1
                            className="font-weight-normal"
                            style={{
                              fontSize: "2.6em",
                              lineHeight: "44px",
                              margin: "0 0 32px 0",
                              color: "#3366FF",
                              fontWeight: "200",
                              letterSpacing: "-.05em",
                              margin: "0",
                              webkitFontSmoothing: "antialiased",
                            }}
                          >
                            Vocabulary
                          </h1>
                        </a>
                        <p
                          className="mb-2 mt-2 text-2"
                          style={{
                            color: "#777",
                            lineHeight: "26px",
                            margin: "0 0 20px",
                          }}
                        >
                          Learn English vocabulary by topic.
                        </p>
                        <br></br>
                        <br></br>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>

            <Grid item xs={3} md={1} lg={3} key={0}>
              <div className="featured-boxes featured-boxes-flat">
                <div className="row">
                  <div className="col-lg-3 col-sm-6">
                    <div
                      className="featured-box featured-box-primary featured-box-effect-2"
                      style={{ height: "264.8px" }}
                    >
                      <div className="box-content box-content-border-bottom">
                        <a href={ROUTES.IPA_LIST}>
                          <i className="icon-featured">
                            <FaLayerGroup style={{ color: "black" }} />
                          </i>
                          <h1
                            className="font-weight-normal"
                            style={{
                              fontSize: "2.6em",
                              lineHeight: "44px",
                              margin: "0 0 32px 0",
                              color: "#3366FF",
                              fontWeight: "200",
                              letterSpacing: "-.05em",
                              margin: "0",
                              webkitFontSmoothing: "antialiased",
                            }}
                          >
                            Pronunciation
                          </h1>
                        </a>
                        <p
                          className="mb-2 mt-2 text-2"
                          style={{
                            color: "#777",
                            lineHeight: "26px",
                            margin: "0 0 20px",
                          }}
                        >
                          Tricky English pronunciation. With listening practice.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>

          <div className="row text-capitalize pt-3" align="center">
            <div className="col-md-10 mx-md-auto">
              <div className="row">
                <p
                  style={{ fontSize: "2.2rem", fontWeight: 800, color: "blue" }}
                >
                  Tool Group
                </p>
              </div>
            </div>
          </div>

          <Grid container spacing={1}>
            <Grid item xs={3} md={1} lg={3} key={0}>
              <div className="featured-boxes featured-boxes-flat">
                <div className="row">
                  <div className="col-lg-3 col-sm-6">
                    <div
                      className="featured-box featured-box-primary featured-box-effect-2"
                      style={{ height: "264.8px" }}
                    >
                      <div className="box-content box-content-border-bottom">
                        <a href={ROUTES.TEST}>
                          <i className="icon-featured">
                            <FaLanguage style={{ color: "black" }} />
                          </i>
                          <h1
                            className="font-weight-normal"
                            style={{
                              fontSize: "2.6em",
                              lineHeight: "44px",
                              margin: "0 0 32px 0",
                              color: "#3366FF",
                              fontWeight: "200",
                              letterSpacing: "-.05em",
                              margin: "0",
                              webkitFontSmoothing: "antialiased",
                            }}
                          >
                            Test
                          </h1>
                        </a>
                        <p
                          className="mb-2 mt-2 text-2"
                          style={{
                            color: "#777",
                            lineHeight: "26px",
                            margin: "0 0 20px",
                          }}
                        >
                          Practice test to review yourself.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>

            <Grid item xs={3} md={1} lg={3} key={1}>
              <div className="featured-boxes featured-boxes-flat">
                <div className="row">
                  <div className="col-lg-3 col-sm-6">
                    <div
                      className="featured-box featured-box-primary featured-box-effect-2"
                      style={{ height: "264.8px" }}
                    >
                      <div className="box-content box-content-border-bottom">
                        <a href={ROUTES.GAMES_HOME}>
                          <i className="icon-featured">
                            <FaGrin style={{ color: "black" }} />
                          </i>
                          <h1
                            className="font-weight-normal"
                            style={{
                              fontSize: "2.6em",
                              lineHeight: "44px",
                              margin: "0 0 32px 0",
                              color: "#3366FF",
                              fontWeight: "200",
                              letterSpacing: "-.05em",
                              margin: "0",
                              webkitFontSmoothing: "antialiased",
                            }}
                          >
                            Play Games
                          </h1>
                        </a>
                        <p
                          className="mb-2 mt-2 text-2"
                          style={{
                            color: "#777",
                            lineHeight: "26px",
                            margin: "0 0 20px",
                          }}
                        >
                          Play games to review your vocabulary.
                        </p>
                        <br></br>
                        <br></br>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </section>
      <Contact />
    </div>
  );
}

export default HomePage;

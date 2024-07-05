import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Row, Col } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import TrackVisibility from "react-on-screen";
import "animate.css";
import navIcon3 from "./assets/img/nav-icon3.svg";
import navIcon4 from "./assets/img/nav-icon4.svg";
import navIcon6 from "./assets/img/nav-icon6.svg";

const ethAdd = "GBRshPopOnSOLPopOnSOLxxPopOnSOLPopOnSOLGBRsh";
const shortenedEthAdd = "GBRshP...LGBRsh";
const ticker = "$POP";
const twitter = "https://twitter.com/";
const telegram = "https://t.me/starricto";
const dexscreener = "https://dexscreener.com/";
const buylink = "https://raydium.io/swap/";
const footercontent = "2024 PopOnSolana. © All right reserved.";

function importAll(r) {
  let images = [];
  r.keys().map((item, index) => {
    images.push(r(item));
  });

  console.log(images);
  return images;
}

const listOfImages = importAll(
  require.context("./assets/popjpegs", false, /\.(png|jpe?g|svg)$/)
);

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isMobile = useMediaQuery({ query: "(max-width: 520px)" });

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <Container id="main-container">
      <Header />
      <SocialsHeader mobileMode={isMobile} />
      <MainBanner />
      <TopDivider />
      <Carousel />
      <BottomDivider />
      <BuyGuide />
      <Footer />
      <TickerTape />
    </Container>
  );
}

function Header() {
  return (
    <Row>
      <Col xs={12}>
        <header className="header">
          <h1>{ticker}</h1>
          <h3>Pawsitively Fabulous and Fluffy!</h3>
        </header>
      </Col>
    </Row>
  );
}

function MainBanner() {
  return (
    <section className="mainbanner" id="home">
      <Container>
        <Row className="align-items-center">
          <Col
            xs={{ span: 12, order: 2 }}
            md={6}
            xl={7}
            className="mainBannerCols"
          >
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <h1 style={{ margin: "20px", textAlign: "center" }}>
                    The Fur-tastic Star <br />
                    on Solana!
                  </h1>
                </div>
              )}
            </TrackVisibility>
          </Col>
          <Col
            xs={{ span: 12, order: 1 }}
            md={6}
            xl={5}
            id="logo-col"
            className="mainBannerCols"
          >
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__zoomIn" : ""
                  }
                >
                  <img id="logo" src="popjpegs/poplogo.png" alt="Header Img" />
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

function SocialsHeader(props) {
  const { mobileMode } = props;
  return (
    <Row className="socialsHeader">
      <Col xs={12}>
        <h4> {mobileMode ? shortenedEthAdd : ethAdd} </h4>
        <div className="social-icon">
          <a href={twitter}>
            <img src={navIcon3} alt="" />
          </a>
          <a href={telegram}>
            <img src={navIcon4} alt="" />
          </a>
          <a href={dexscreener}>
            <img src={navIcon6} alt="" />
          </a>
        </div>
      </Col>
    </Row>
  );
}

function TopDivider() {
  return <div class="skew-cc"></div>;
}

function BottomDivider() {
  return <div class="skew-c"></div>;
}

function Carousel() {
  return (
    <section id="carousel-section">
      <Container>
        <Row>
          <Col xs={12}>
            <div className="carousel-container">
              <h1>
                <span>FABULOUS MEME-ABILITY!</span>
              </h1>
              <div className="carousel-track">
                {listOfImages.map((img) => (
                  <img
                    style={{ width: "250px", padding: "20px" }}
                    src={img}
                    alt="info"
                  />
                ))}
                {listOfImages.map((img) => (
                  <img
                    style={{ width: "250px", padding: "20px" }}
                    src={img}
                    alt="info"
                  />
                ))}
              </div>
              <h1>
                <span>FABULOUS MEME-ABILITY!</span>
              </h1>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

function BuyGuide() {
  return (
    <Row>
      <Col xs={12}>
        <header className="buy-guide">
          <h1>HOW TO BUY?</h1>
          <ul id="buy-list">
            <li>
              <span>1</span>
              <div class="guideItem">
                <h3>Create a wallet</h3>
                <p>
                  Download Phantom or your wallet of choice from the app store
                  or google play store for free. Desktop users, download the
                  google chrome extension by going to phantom app
                </p>
              </div>
            </li>
            <li>
              <span>2</span>
              <div class="guideItem">
                <h3>Buy SOL</h3>
                <p>
                  Have SOL in your wallet to switch to {ticker} If you dont have
                  any SOL, you can buy SOL from an exchange or cross chain swap
                  and send it to your wallet.
                </p>
              </div>
            </li>
            <li>
              <span>3</span>
              <div class="guideItem">
                <h3>Go to a DEX</h3>
                <p>
                  Connect to Raydium. Go raydium.io in google chrome or on the
                  browser inside your Phantom app. Connect your wallet. Paste
                  the {ticker} token address into Raydium and confirm the swap.
                  When Phantom prompts you for a wallet signature, sign.
                </p>
              </div>
            </li>
            <li>
              <span>4</span>
              <div class="guideItem">
                <h3>SWAP</h3>
                <p>Switch SOL for {ticker}</p>
              </div>
            </li>
            <li>
              <div>
                <a href={buylink} id="buy-btn" class="btn">
                  Get $POP!
                </a>
              </div>
            </li>
          </ul>
        </header>
      </Col>
    </Row>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div style={{ margin: "20px", textAlign: "center" }}>{footercontent}</div>
    </footer>
  );
}

function TickerTape() {
  return (
    <div class="ticker-wrap">
      <div class="ticker">
        <div class="ticker__item">#PopOnSOL</div>
        <div class="ticker__item">#PopOnSOL</div>
        <div class="ticker__item">#PopOnSOL</div>
        <div class="ticker__item">#PopOnSOL</div>
        <div class="ticker__item">#PopOnSOL</div>
        <div class="ticker__item">#PopOnSOL</div>
        <div class="ticker__item">#PopOnSOL</div>
        <div class="ticker__item">#PopOnSOL</div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

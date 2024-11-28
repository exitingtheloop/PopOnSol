import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import { CSSDoodle } from "css-doodle/component";

const ethAdd = "SNOWSNOWSNOWSNOWSNOWSNOW";
const shortenedEthAdd = "SNOW...SNOW";
const ticker = "$SNOW";
const twitter = "https://x.com/PopOnSolana";
const telegram = "https://t.me/popsolmemes";
const dexscreener = "https://pump.fun/";
const buylink = "https://raydium.io/swap/";
const footercontent = "2024 SNOWOnSolana. © All rights reserved.";

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

  useEffect(() => {
    // Some random colors
    const colors = ["#00c8ff", "#78e2ff", "#778ffc", "#9bacfa", "#c2cdfc"];

    const numBalls = isMobile ? 15 : 25;
    const balls = [];

    for (let i = 0; i < numBalls; i++) {
      let ball = document.createElement("div");
      ball.classList.add("ball");
      ball.style.background = colors[Math.floor(Math.random() * colors.length)];
      ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
      ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
      ball.style.transform = `scale(${Math.random() * (1.75 - 0.1) + 0.1})`;
      ball.style.width = `${Math.random() * (3 - 0.1) + 0.1}em`;
      ball.style.height = ball.style.width;

      balls.push(ball);
      document.body.append(ball);
    }

    // Keyframes
    balls.forEach((el, i, ra) => {
      let to = {
        x: Math.random() * (i % 2 === 0 ? -11 : 11),
        y: Math.random() * 12,
      };

      let anim = el.animate(
        [
          { transform: "translate(0, 0)" },
          { transform: `translate(${to.x}rem, ${to.y}rem)` },
        ],
        {
          duration: (Math.random() * (150 - 50) + 50) * 60, // random duration
          direction: "alternate",
          fill: "both",
          iterations: Infinity,
          easing: "linear",
        }
      );
    });
  });

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <Container id="main-container">
      <ToastContainer autoClose={5000} />
      <Header />
      <SocialsHeader mobileMode={isMobile} />
      <MainBanner />
      <About />
      <Carousel />
      <CreateMemes />
      <DressupMemes />
      <BuyGuide />
      <Footer />
      <TickerTape />
    </Container>
  );
}

function DressupMemes() {
  const [selectedHead, setSelectedHead] = useState("");
  const [selectedEyes, setSelectedEyes] = useState("");
  const [selectedHand, setSelectedHand] = useState("");
  const [selectedBackground, setSelectedBackground] = useState("");
  const [finalImage, setFinalImage] = useState(null);
  const [headImageVisible, setHeadImageVisible] = useState(false);
  const [eyesImageVisible, setEyesImageVisible] = useState(false);
  const [handImageVisible, setHandImageVisible] = useState(false);
  const [backgroundImageVisible, setBackgroundImageVisible] = useState(false);

  useEffect(() => {
    const generateImage = async () => {
      await new Promise((resolve) => setTimeout(resolve, 200));
      await generateFinalImage();
    };
    generateImage();
  }, [selectedHead, selectedEyes, selectedHand, selectedBackground]);

  useEffect(() => {
    const generateImage = async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      await generateFinalImage();
    };
    generateImage();
  }, []);

  const handleHeadChange = (e) => {
    setSelectedHead(e.target.value);
    if (e.target.value !== "none") {
      setHeadImageVisible(true);
    } else {
      setHeadImageVisible(false);
    }
  };

  const handleEyesChange = (e) => {
    setSelectedEyes(e.target.value);
    if (e.target.value !== "none") {
      setEyesImageVisible(true);
    } else {
      setEyesImageVisible(false);
    }
  };

  const handleHandChange = (e) => {
    setSelectedHand(e.target.value);
    if (e.target.value !== "none") {
      setHandImageVisible(true);
    } else {
      setHandImageVisible(false);
    }
  };

  const handleBackgroundChange = (e) => {
    setSelectedBackground(e.target.value);
    if (e.target.value !== "none") {
      setBackgroundImageVisible(true);
    } else {
      setBackgroundImageVisible(false);
    }
  };

  const generateFinalImage = async () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 870; // adjust to your base image size
    canvas.height = 1095;

    if (selectedBackground) {
      const backgroundImage = document.querySelector(`.background-overlay`);
      ctx.drawImage(backgroundImage, 0, 0);
    }

    const baseImage = document.querySelector(".base-image");
    ctx.drawImage(baseImage, 0, 0);

    if (selectedHead) {
      const headImage = document.querySelector(`.head-overlay`);
      ctx.drawImage(headImage, 0, 0);
    }

    if (selectedEyes) {
      const eyesImage = document.querySelector(`.eyes-overlay`);
      ctx.drawImage(eyesImage, 0, 0);
    }

    if (selectedHand) {
      const handImage = document.querySelector(`.hand-overlay`);
      ctx.drawImage(handImage, 0, 0);
    }

    const dataURL = canvas.toDataURL();
    setFinalImage(dataURL);
    return Promise.resolve();
  };

  const downloadFinalImage = async () => {
    try {
      await generateFinalImage();
      const link = document.createElement("a");
      link.href = finalImage;
      link.download = "pop-meme.jpg";
      link.click();
    } catch (error) {
      console.error("Error downloading final image:", error);
    }
  };

  return (
    <section id="dressup-section">
      <video autoPlay loop muted>
        <source src="popjpegs/bluebubbles.mp4" type="video/mp4" />
      </video>
      <Container>
        <Row>
          <Col xs={12}>
            <h1>DRESS-UP SNOW!</h1>
            <div class="overlay-parts">
              <select
                id="head-select"
                value={selectedHead}
                onChange={handleHeadChange}
              >
                <option value="none">Head</option>
                <option value="queen-crown">Crown</option>
                <option value="santahat">SantaHat</option>
                <option value="dbz">SaiyanHair</option>
                <option value="fancyhat">FancyHat</option>
                <option value="maga">MAGACap</option>
                <option value="barbie">BarbieHat</option>
                <option value="mcdo">DownBadHat</option>
                <option value="got">GOTCrown</option>
                <option value="binance">BinanceHat</option>
              </select>

              <select
                id="eyes-select"
                value={selectedEyes}
                onChange={handleEyesChange}
              >
                <option value="none">Eyes</option>
                <option value="pixelshades">PixelShades</option>
                <option value="superpop">SuperEyes</option>
                <option value="aviators">Aviators</option>
                <option value="solshades">SolShades</option>
                <option value="thor">ThorEyes</option>
              </select>
            </div>
          </Col>
          <Col xs={12}>
            <div class="overlay-parts">
              <select
                id="hand-select"
                value={selectedHand}
                onChange={handleHandChange}
              >
                <option value="none">Hand</option>
                <option value="giftbox">GiftBox</option>
                <option value="queen-staff">QueenStaff</option>
                <option value="pistols">gunz</option>
                <option value="ak47">BigGun</option>
                <option value="flowers">Sunflowers</option>
                <option value="cash">BagOCash</option>
                <option value="bowl">WaterBowl</option>
                <option value="dragonegg">DragonEgg</option>
              </select>

              <select
                id="background-select"
                value={selectedBackground}
                onChange={handleBackgroundChange}
              >
                <option value="none">Background</option>
                <option value="sanfo">Sanfo</option>
                <option value="desert">Desert</option>
                <option value="hawaii">Hawaii</option>
                <option value="mcdo">DownBadBG</option>
                <option value="solsummer">WeGoinUpBG</option>
                <option value="btcmatrix">MatrixBG</option>
                <option value="calmjapan">JapanAmbience</option>
                <option value="litmountain">CoolMountain</option>
                <option value="maga">MAGABG</option>
                <option value="dragons">JustDragons</option>
              </select>
            </div>
          </Col>
          <Col xs={12}>
            <div class="meme-container">
              <img
                src={
                  selectedBackground
                    ? `popjpegs/background/${selectedBackground}.png`
                    : ""
                }
                alt="Background"
                class="background-overlay"
                style={{ display: backgroundImageVisible ? "block" : "none" }}
              />
              <img
                src="popjpegs/MEMEBASETRANSP.png"
                alt=""
                class="base-image"
              />
              <img
                src={selectedHand ? `popjpegs/hand/${selectedHand}.png` : ""}
                alt="Hand"
                class="hand-overlay"
                style={{ display: handImageVisible ? "block" : "none" }}
              />
              <img
                src={selectedHead ? `popjpegs/head/${selectedHead}.png` : ""}
                alt="Head"
                class="head-overlay"
                style={{ display: headImageVisible ? "block" : "none" }}
              />
              <img
                src={selectedEyes ? `popjpegs/eyes/${selectedEyes}.png` : ""}
                alt="Eyes"
                class="eyes-overlay"
                style={{ display: eyesImageVisible ? "block" : "none" }}
              />
            </div>
          </Col>
          <Col xs={12}>
            <div id="meme-note">
              <p>
                Image generation takes a moment. If your downloaded image
                doesn't match your creation. Simply retry downloading!
              </p>
            </div>
            <button
              onClick={() => {
                downloadFinalImage();
                toast.dismiss();
                toast("Downloading your SNOW masterpiece! 🐶");
              }}
              id="download-meme"
              className="btn"
            >
              DOWNLOAD!
            </button>
          </Col>
        </Row>
      </Container>
    </section>
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

function DoodleThis() {}

function CssDoodle() {
  const data = `<css-doodle>:doodle {
    @grid: 10x10;
    @size: 100vmax;
    grid-gap: 5px;position: fixed; top: 0; left: 0;
    z-index: -1; 
    }
    
    background-color: hsla(@r(360), 85%, @r(85%, 90%), @r(.6,.9));
    transform: scale(@rand(.1, 1.75));
    border-radius: @rand(0, 100%);
    @shape: clover 5;
      
    animation: test infinite @r(50s, 150s) linear;
    
    @keyframes test {
      0% {
        transform: translate3d(@r(0, 0, 0));
      }
      50% {
        transform: translate3d(@r(-500%, 1000%), @r(-500%, 1000%), 0);
      }
      100% {
        transform: translate3d(0, 0, 0);
      }</css-doodle>`;

  return <div dangerouslySetInnerHTML={{ __html: data }} />;
}

function ContractClip(props) {
  const { mobileMode } = props;
  return (
    <section className="contractClip">
      <p> {mobileMode ? shortenedEthAdd : ethAdd} </p>
    </section>
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
                    The Fur-tastic snowball <br />
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
                  <img id="logo" src="popjpegs/snowlogo.png" alt="Header Img" />
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

function About() {
  return (
    <section id="about-section">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} className="mainBannerCols">
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  id="about-wrapper"
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <h1 style={{ margin: "20px", textAlign: "center" }}>
                    Who is SNOW?
                  </h1>
                  <p>
                    Hello there! I'm Snow! I'm a fabulous, pampered Maltese who
                    lives life like a true princess. Surrounded by my devoted
                    admirers who woof me to the moon and back, my royal
                    lifestyle is nothing short of majestic. The base meme image
                    was snapped with my full awareness that I'm' about to
                    indulge the Solana meme space, my cheeky grin at the time
                    says it all! Snow isn't like any other meme, I'm a
                    celebration of sass, style, and a whole lot of fluff!
                  </p>
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
        <section
          className="contractClip"
          onClick={() => {
            navigator.clipboard.writeText(ethAdd);
            toast.dismiss();
            toast("Addy Copied! 🐶");
          }}
        >
          <span> {mobileMode ? shortenedEthAdd : ethAdd} </span>
          <svg
            width="25px"
            height="25px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.5 14H19C20.1046 14 21 13.1046 21 12V5C21 3.89543 20.1046 3 19 3H12C10.8954 3 10 3.89543 10 5V6.5M5 10H12C13.1046 10 14 10.8954 14 12V19C14 20.1046 13.1046 21 12 21H5C3.89543 21 3 20.1046 3 19V12C3 10.8954 3.89543 10 5 10Z"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </section>
        <div className="social-icon">
          <a href={dexscreener}>
            <img src={navIcon6} alt="" />
          </a>
        </div>
      </Col>
    </Row>
  );
}

function TopDivider() {
  return <div className="skew-cc"></div>;
}

function BottomDivider() {
  return <div className="skew-c"></div>;
}

function Carousel() {
  return (
    <section id="carousel-section">
      <video autoPlay loop muted>
        <source src="popjpegs/bluepinkbubbles.mp4" type="video/mp4" />
      </video>
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
                <span>POSIBILITIES ARE ENDLESS!</span>
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
              <div className="guideItem">
                <h3>Create a wallet</h3>
                <p>
                  Download Phantom or your wallet of choice from the app store
                  or google play store for free. Desktop users, download the
                  google chrome extension by going to phantom app
                </p>
                <a
                  href="https://phantom.app/"
                  className="itemBtn"
                  style={{
                    boxShadow: "-5px 6px 0 0 #3b325b",
                    backgroundColor: "#ab9ff2",
                  }}
                >
                  PHANTOM
                  <svg
                    className="css-1a1mo8u e18osog01"
                    width="35"
                    height="30"
                    viewBox="65 30 30 120"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M89.1138 112.613C83.1715 121.719 73.2139 133.243 59.9641 133.243C53.7005 133.243 47.6777 130.665 47.6775 119.464C47.677 90.9369 86.6235 46.777 122.76 46.7764C143.317 46.776 151.509 61.0389 151.509 77.2361C151.509 98.0264 138.018 121.799 124.608 121.799C120.352 121.799 118.264 119.462 118.264 115.756C118.264 114.789 118.424 113.741 118.746 112.613C114.168 120.429 105.335 127.683 97.0638 127.683C91.0411 127.683 87.9898 123.895 87.9897 118.576C87.9897 116.642 88.3912 114.628 89.1138 112.613ZM115.936 68.7103C112.665 68.7161 110.435 71.4952 110.442 75.4598C110.449 79.4244 112.689 82.275 115.96 82.2693C119.152 82.2636 121.381 79.4052 121.374 75.4405C121.367 71.4759 119.128 68.7047 115.936 68.7103ZM133.287 68.6914C130.016 68.6972 127.786 71.4763 127.793 75.4409C127.8 79.4055 130.039 82.2561 133.311 82.2504C136.503 82.2448 138.732 79.3863 138.725 75.4216C138.718 71.457 136.479 68.6858 133.287 68.6914Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </a>
              </div>
            </li>
            <li>
              <span>2</span>
              <div className="guideItem">
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
              <div className="guideItem">
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
              <div className="guideItem">
                <h3>SWAP</h3>
                <p>Switch SOL for {ticker}</p>
              </div>
            </li>
            <li>
              <div>
                <a href={buylink} id="buy-btn" className="btn">
                  Get $SNOW!
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

function CreateMemes() {
  return (
    <section id="create-section">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} className="mainBannerCols">
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <h1 style={{ margin: "20px", textAlign: "center" }}>
                    Create Yours!
                  </h1>
                </div>
              )}
            </TrackVisibility>
          </Col>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={5}
            className="mainBannerCols d-block d-lg-none"
          >
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <img
                    id="meme-showcase"
                    src="popjpegs/DRESSUPPOP.gif"
                    alt="Header Img"
                  />
                </div>
              )}
            </TrackVisibility>
          </Col>
          <Col xs={5} className="mainBannerCols d-none d-lg-block">
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <img
                    id="base-display"
                    src="popjpegs/MEMEBASE.png"
                    alt="Header Img"
                  />
                </div>
              )}
            </TrackVisibility>
          </Col>
          <Col xs={2} className="mainBannerCols d-none d-lg-block">
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <img
                    id="create-arrow"
                    src="popjpegs/arrow.png"
                    alt="Header Img"
                  />
                </div>
              )}
            </TrackVisibility>
          </Col>
          <Col xs={5} className="mainBannerCols d-none d-lg-block">
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <img
                    id="meme-showcase"
                    src="popjpegs/DRESSUPPOP.gif"
                    alt="Header Img"
                  />
                </div>
              )}
            </TrackVisibility>
          </Col>
          <Col xs={12} className="mainBannerCols">
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                ></div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

function CreateYours() {
  return (
    <section id="about-section">
      <Container>
        <Row className="align-items-center">
          <Col xs={{ span: 12, order: 1 }} md={6} className="mainBannerCols">
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <h1 style={{ margin: "20px", textAlign: "center" }}>
                    Who is SNOW?
                  </h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              )}
            </TrackVisibility>
          </Col>
          <Col
            xs={{ span: 12, order: 2 }}
            md={6}
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
                  <img
                    id="about-display"
                    src="popjpegs/dressuppop.gif"
                    alt="Header Img"
                  />
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

function Tokenomics() {
  return (
    <section id="tokenomics-section">
      <Row>
        <Col xs={12}></Col>
        <h1>The Boring Stuff: SNOW-onomics!</h1>
      </Row>
    </section>
  );
}

function TickerTape() {
  return (
    <div className="ticker-wrap">
      <div className="ticker">
        <div className="ticker__item">SNOW</div>
        <div className="ticker__item">SNOW</div>
        <div className="ticker__item">SNOW</div>
        <div className="ticker__item">SNOW</div>
        <div className="ticker__item">SNOW</div>
        <div className="ticker__item">SNOW</div>
        <div className="ticker__item">SNOW</div>
        <div className="ticker__item">SNOW</div>
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

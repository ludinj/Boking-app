import "./hotel.scss";
//COMPONENTS
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import Reserve from "../../components/reserve/Reserve";
//HOOKS
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
//CONTEXT
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
//ICONS
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import CloseIcon from "@mui/icons-material/Close";

const Hotel = () => {
  const location = useLocation();

  const id = location.pathname.split("/")[2];
  const [openSlider, setOpenSlider] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const { data } = useFetch(`/hotels/find/${id}`);
  const { dates, options } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const MILISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].startDate, dates[0].endDate);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpenSlider(true);
  };
  const handleMove = (side) => {
    let newSliderNumber;
    if (side === "l") {
      newSliderNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSliderNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSliderNumber);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {!data ? (
        "Loading"
      ) : (
        <div className="hotelContainer">
          {openSlider && (
            <div className="slider">
              <CloseIcon
                className="sliderClose"
                onClick={() => setOpenSlider(false)}
              />
              <ArrowCircleLeftIcon
                className="sliderArrow"
                onClick={() => handleMove("l")}
              />

              <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber].src}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <ArrowCircleRightIcon
                className="sliderArrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <h1 className="hotelTitle">{data.name}</h1>
            <button onClick={handleClick} className="bookNow">
              Reserve or Book Now!
            </button>
            <div className="hotelAddress">
              <LocationOnIcon style={{ fontSize: "16px" }} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location –{data.distance}m from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <div className="hotelImgs">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    src={photo}
                    alt=""
                    className="hotelImg"
                    onClick={() => handleOpen(i)}
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsText">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>${days * data.cheapestPrice * options.room}</b> ({days}
                  nights)
                </h2>
                <button>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;

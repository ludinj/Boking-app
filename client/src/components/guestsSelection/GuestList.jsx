import React from "react";
import useFetch from "../../hooks/useFetch";
import "./guestList.scss";
const GuestList = () => {
  const { data, loading, error } = useFetch("/hotels?featured=true&limit=4");

  return (
    <div className="guestList">
      {loading ? (
        "Loading.."
      ) : (
        <>
          {data?.map((item) => (
            <div className="glItem" key={item._id}>
              <img src={item.photos[0]} alt="" className="glImg" />
              <span className="glName">{item.name}</span>
              <span className="glCity">{item.city}</span>
              <span className="glPrice">
                Starting from ${item.cheapestPrice}
              </span>
              {item.rating && (
                <div className="glRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default GuestList;

import React, { Fragment, useState } from "react";
import FontAwesomeIcon from "../components/font-awesome-icon";

export const displayStars = (itemRating) => {
  itemRating = Math.round(itemRating * 2) / 2; // rounds ratings such as 2.2 to 2.0
  switch (itemRating) {
    case 0.5:
      return (
        <Fragment>
          <FontAwesomeIcon className="fa-star-half-alt orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
        </Fragment>
      );

    case 1:
      return (
        <Fragment>
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
        </Fragment>
      );
    case 1.5:
      return (
        <Fragment>
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon className="fa-star-half-alt orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
        </Fragment>
      );
    case 2.0:
      return (
        <Fragment>
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
        </Fragment>
      );

    case 2.5:
      return (
        <Fragment>
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon className="fa-star-half-alt orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
        </Fragment>
      );

    case 3.0:
      return (
        <Fragment>
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
        </Fragment>
      );

    case 3.5:
      return (
        <Fragment>
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon className="fa-star-half-alt orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
        </Fragment>
      );

    case 4.0:
      return (
        <Fragment>
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
        </Fragment>
      );
    case 4.5:
      return (
        <Fragment>
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon className="fa-star-half-alt orange" />
        </Fragment>
      );
    case 5.0:
      return (
        <Fragment>
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon className="fa-star orange" />
          <FontAwesomeIcon className="fa-star orange" />
        </Fragment>
      );
    default:
      return (
        <Fragment>
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
          <FontAwesomeIcon baseClassName="far" className="fa-star orange" />
        </Fragment>
      );
  }
};

export let rating = 0;

export const ClickableDisplayStars = (large) => {
  const [firstStarClicked, setFirstStarClicked] = useState(false);
  const [secondStarClicked, setSecondStarClicked] = useState(false);
  const [thirdStarClicked, setThirdStarClicked] = useState(false);
  const [fourthStarClicked, setFourthStarClicked] = useState(false);
  const [fifthStarClicked, setFifthStarClicked] = useState(false);

  const toggleStar = (numStars) => {
    // reset all stars so that toggle of previous star state are all at the same value
    setFirstStarClicked(false);
    setSecondStarClicked(false);
    setThirdStarClicked(false);
    setFourthStarClicked(false);
    setFifthStarClicked(false);
    switch (numStars) {
      case 1:
        setFirstStarClicked((prevStarState) => !prevStarState);
        rating = 1;
        break;
      case 2:
        setFirstStarClicked((prevStarState) => !prevStarState);
        setSecondStarClicked((prevStarState) => !prevStarState);
        rating = 2;
        break;
      case 3:
        setFirstStarClicked((prevStarState) => !prevStarState);
        setSecondStarClicked((prevStarState) => !prevStarState);
        setThirdStarClicked((prevStarState) => !prevStarState);
        rating = 3;
        break;
      case 4:
        setFirstStarClicked((prevStarState) => !prevStarState);
        setSecondStarClicked((prevStarState) => !prevStarState);
        setThirdStarClicked((prevStarState) => !prevStarState);
        setFourthStarClicked((prevStarState) => !prevStarState);
        rating = 4;
        break;
      case 5:
        setFirstStarClicked((prevStarState) => !prevStarState);
        setSecondStarClicked((prevStarState) => !prevStarState);
        setThirdStarClicked((prevStarState) => !prevStarState);
        setFourthStarClicked((prevStarState) => !prevStarState);
        setFifthStarClicked((prevStarState) => !prevStarState);
        rating = 5;
        break;
      default:
        break;
    }
  };

  return (
    <Fragment>
      <FontAwesomeIcon
        baseClassName={(!firstStarClicked && "far") || ""}
        className="fa-star orange clickable"
        fontSize={large && "3rem"}
        onClick={() => toggleStar(1)}
      />
      <FontAwesomeIcon
        baseClassName={(!secondStarClicked && "far") || ""}
        className="fa-star orange clickable"
        fontSize={large && "3rem"}
        onClick={() => toggleStar(2)}
      />
      <FontAwesomeIcon
        baseClassName={(!thirdStarClicked && "far") || ""}
        className="fa-star orange clickable"
        fontSize={large && "3rem"}
        onClick={() => toggleStar(3)}
      />
      <FontAwesomeIcon
        baseClassName={(!fourthStarClicked && "far") || ""}
        className="fa-star orange clickable"
        fontSize={large && "3rem"}
        onClick={() => toggleStar(4)}
      />
      <FontAwesomeIcon
        baseClassName={(!fifthStarClicked && "far") || ""}
        className="fa-star orange clickable"
        fontSize={large && "3rem"}
        onClick={() => toggleStar(5)}
      />
    </Fragment>
  );
};

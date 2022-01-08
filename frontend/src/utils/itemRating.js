import React, { Fragment } from "react";
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

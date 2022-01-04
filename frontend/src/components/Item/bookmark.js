import React, {useState} from 'react';
import MuiBox from '../MaterialUI/mui-box';
import CustomButton from '../custom-button';
import FontAwesomeIcon from '../font-awesome-icon';

const Bookmark = () => {
    const [bookMarkClicked, setBookMarkClicked] = useState(false);
    const bookmarkHandler = (e) => {
      setBookMarkClicked(!bookMarkClicked);
    };
    return (
        <MuiBox className="small-box right-align">
        <CustomButton
          variant="text"
          className="black no-btn-padding"
          onClick={bookmarkHandler}
        >
          {!bookMarkClicked && (
            <FontAwesomeIcon
              baseClassName="far"
              className="fa-bookmark"
              fontSize="3rem"
            />
          )}

          {bookMarkClicked && (
            <FontAwesomeIcon className="fa-bookmark" fontSize="3rem" />
          )}
          <span className="align-top">
            <FontAwesomeIcon className="fa-plus" />
          </span>
        </CustomButton>
      </MuiBox>
    );
}

export default Bookmark;

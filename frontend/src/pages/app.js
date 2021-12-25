import "../styles/app.css";
import Container from "@mui/material/Container";
import FontAwesomeIcon from "../components/font-awesom-icon";
import CustomButton from "../components/custom-button";

const App = () => {
  const enterShopHandler = () => {};

  return (
    <div id="landingPage" className="fullscreen">
      <Container direction="horizontal" className="container">
        <div className="row">
          <h1 className="heading">
            <FontAwesomeIcon
              baseClassName="fas"
              className="fa-heartbeat icon"
              fontSize="10rem"
            ></FontAwesomeIcon>
            Health 4U
          </h1>
        </div>
        <div className="row">
          <CustomButton
            variant="outlined"
            className="red-inverse btn"
            onClick={enterShopHandler}
          >
            Shop Now
          </CustomButton>
        </div>
      </Container>
    </div>
  );
};

export default App;

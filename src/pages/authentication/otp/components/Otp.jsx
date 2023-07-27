import "../styles/otp.css";
import '../styles/submitButton.css'

const CultifyModal = ({text, isDisplayed}) => { 

  return (
      (isDisplayed &&
      <div className="otpContainer">
      <h6 className="text-center mb-3">
        Verity your<span> OTP</span>
      </h6>
      <p className="mb-3">
        {text}
      </p>
    </div>)
  );
};

export default CultifyModal;

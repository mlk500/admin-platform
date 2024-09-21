import React, { useState } from "react";
import "./AlertMessage.scss";

const AlertMessageHeb = {
  close: "סגור",
};

interface AlertMessageProps {
  message: string;
}

const AlertMessage: React.FC<AlertMessageProps> = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div className="setAlertMessage-message-overlay">
      <div className="setAlertMessage-message">
        <p>{message}</p>
        <button onClick={handleClose}>{AlertMessageHeb.close}</button>
      </div>
    </div>
  );
};

export default AlertMessage;

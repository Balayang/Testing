/* eslint-disable react/prop-types */
import React from 'react';

export const ErrorMessageElement = ({ messageText }) => {
  return (
    <div className="messageContainer">
      <h1 className="message">{messageText}</h1>
    </div>
  );
};

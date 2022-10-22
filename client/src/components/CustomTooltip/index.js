import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

function CustomTooltip({ message, children }) {
  const showTooltip = <Tooltip id="close-tooltip">{message}</Tooltip>;
  return (
    <OverlayTrigger delayShow={1000} placement="bottom" overlay={showTooltip}>
      {children}
    </OverlayTrigger>
  );
}
export default CustomTooltip;

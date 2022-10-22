import React, { useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';

function CustomProgressBar({ newNow, newMin, percent, title }) {

  useEffect(() => {
    $(`div.${title} > div`).animate({ width: percent }, 2000)
  });

  const colors = (percentage) => (percentage < 50 ? 'danger' : percentage < 95 ? 'warning' : 'success');

  return (
    <ProgressBar
      variant={colors(percent)}
      className={title}
      now={newNow}
      min={newMin}
      max={100}
      striped
      animated
      style={{ width: 100 }}
    />
  );
}

export default CustomProgressBar;

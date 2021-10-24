import React from 'react';

function Overall({ score }) {
  return (
    <div className="questionMain">
      <div className="overall">
        <div> Right answers :{score}</div>
        <img src={score > 3 ? './img/victory.gif' : './img/cry.gif'} alt="" />
        <img src="./img/dan.mp4" alt="" />
      </div>
    </div>
  );
}

export default Overall;

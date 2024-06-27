// src/pages/testPage/testPage.jsx
import React from 'react';
import Carousel from '../../components/carousel/carousel';
import ChoiceBarADM from '../../components/choiceBarADM/choiceBarADM';
import '../../styles/global.css';

const TestPage = () => {
  return (
<div className="service-page-container">
      <div className="main-content"> 
      <ChoiceBarADM />
      </div>
      </div>
  );
};

export default TestPage;

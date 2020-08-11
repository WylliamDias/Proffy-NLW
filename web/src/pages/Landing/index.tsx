import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';

import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHearIcon from '../../assets/images/icons/purple-heart.svg';
import api from '../../services/api';

import './styles.css';

function Landing() {
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    
    (async function getTotalConnections() {
      try {
        const response = await api.get('connections');
        console.log(response);
        setTotalConnections(response.data.total);

      } catch (error) {
        console.log(error);
      }
    })();

  }, []);

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logoImg} alt="Proffy" />
          <h2>Sua plataforma de estudos online.</h2>
        </div>
        <img 
          className="hero-image" 
          src={landingImg} 
          alt="Plataforma de estudos" 
        />

      <div className="buttons-container">
        <Link to="study" className="study">
          <img src={studyIcon} alt="Estudar" />
          Estudar
        </Link>

        <Link to="give-classes" className="give-classes">
          <img src={giveClassesIcon} alt="Dar aulas" />
          Dar aulas
        </Link>
      </div>

      <span className="total-connections">
        Total de { totalConnections } conexões já realizadas
        <img src={purpleHearIcon} alt="Coração roxo" />
      </span>
    </div>
  </div>
);
}

export default Landing;

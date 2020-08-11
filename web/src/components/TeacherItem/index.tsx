import React from 'react';

import whatsAppIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';
import api from '../../services/api';

interface TeacherItemProps {
  teacher: {
    id: number;
    name: string;
    avatar: string;
    bio: string;
    cost: number;
    subject: string;
    whatsapp: string;
  };
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  
  async function newConnection() {
    try {
      await api.post('connections', {
        user_id: teacher.id
      });
    } catch {
      alert('Erro na chamada ao professor');
    }
  }

  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt={teacher.name} />
        <div>
          <strong>{ teacher.name }</strong>
          <span></span>
        </div>
      </header>

      <p>{ teacher.bio }</p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ { teacher.cost }</strong>
        </p>
        <a target="_blank" rel="noopener noreferrer" onClick={newConnection} href={`https://wa.me/${teacher.whatsapp}`}>
          <img src={whatsAppIcon} alt="WhatsApp" />
          Entrar em contato
        </a>
      </footer>
    </article>

  )
}

export default TeacherItem;

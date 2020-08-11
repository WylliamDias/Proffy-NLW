import React, {useState, FormEvent} from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import api from '../../services/api';

import './styles.css';

function TeacherList() {
  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  async function searchTeachers(event: FormEvent) {
    event.preventDefault();
    
    try {
      const response = await api.get('classes', {
        params: {
          subject,
          week_day,
          time
        }
      });

      setTeachers(response.data);
    } catch (error) {
      alert('Erro na busca');
    }

  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={searchTeachers}>

          <Select 
            name="subject" 
            label="Matéria"
            value={subject}
            onChange={event => setSubject(event.target.value)}
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Ciências', label: 'Ciências' },
              { value: 'Educação Física', label: 'Educação Física' },
              { value: 'Matemática', label: 'Matemática' },
              { value: 'Geografia', label: 'Geografia' },
              { value: 'Português', label: 'Português' },
              { value: 'História', label: 'História' },
            ]}
          />
          <Select 
            name="week_day" 
            label="Dia da semana" 
            value={week_day}
            onChange={event => setWeekDay(event.target.value)}
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta-feira' },
              { value: '6', label: 'Sabado' },
            ]}
          />
          <Input 
            type="time" 
            name="time" 
            label="Hora" 
            value={time}
            onChange={event => setTime(event.target.value)}
          />

        <button type="submit">
          Buscar
        </button>
      </form>
    </PageHeader>

    <main>
      {teachers.map((teacher, index) => {
        return <TeacherItem key={index} teacher={teacher}/>
      })}
    </main>
  </div>    
  );
}

export default TeacherList;
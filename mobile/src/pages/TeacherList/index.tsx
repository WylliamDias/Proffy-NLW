import React, {useState } from 'react';
import {View, ScrollView, TextInput, Text} from 'react-native';
import {BorderlessButton, RectButton} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import { Feather } from '@expo/vector-icons';
import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItem, {Teacher} from '../../components/TeacherItem';

import styles from './styles';

function TeacherList() {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekday] = useState('');
  const [time, setTime] = useState('');
  
  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible);
  }

  async function getFavoriteTeachers() {
    try {
      const response = await AsyncStorage.getItem('favorites');

      const favoritedTeachers = JSON.parse(response as string);
      const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
        return teacher.id;
      });

      console.log(favoritedTeachersIds);
      setFavorites(favoritedTeachersIds);

    } catch (error) {
      throw new Error('Error ao listar os professores favoritos');
    }
  }

  async function handleFilterSubmit() {
    getFavoriteTeachers();

    try {
      const response = await api.get('classes', {
        params: {
          subject,
          week_day,
          time
        }
      });

      setTeachers(response.data);
      setIsFiltersVisible(false);


    } catch (error) {
      throw new Error('Erro na conexão');
    }
  }

  return (
    <View style={styles.container}>
      <PageHeader 
        title="Proffys disponíveis" 
        headerRight={(
          <BorderlessButton>
            <Feather 
              name="filter" 
              size={20} 
              color="#FFF" 
              onPress={handleToggleFiltersVisible}
            />
          </BorderlessButton>
        )}>
        { isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matérias</Text>
            <TextInput 
              style={styles.input}
              value={subject}
              onChangeText={text => setSubject(text)}
              placeholder="Qual a matéria"
              placeholderTextColor="#c1bccc"
            />

          <View style={styles.inputGroup}>

            <View style={styles.inputBlock}>
              <Text style={styles.label}>Dia da semana</Text>
              <TextInput 
                style={styles.input} 
                value={week_day}
                onChangeText={text => setWeekday(text)}
                placeholder="Qual o dia?"
                placeholderTextColor="#c1bccc"
              />
            </View>

            <View style={styles.inputBlock}>
              <Text style={styles.label}>Horário</Text>
              <TextInput 
                style={styles.input} 
                value={time}
                onChangeText={text => setTime(text)}
                placeholder="Qual horário?"
                placeholderTextColor="#c1bccc"
              />
            </View>

          </View>
          <RectButton style={styles.submitButton} onPress={handleFilterSubmit}>
            <Text style={styles.submitButtonText}>Filtrar</Text>
          </RectButton>
        </View>
      )}
      </PageHeader>
      <ScrollView 
      contentContainerStyle={{
        paddingHorizontal: 16,
          paddingVertical: 16
      }}
      style={styles.teacherList}>
      {teachers.map((teacher: Teacher) => (
        <TeacherItem 
          key={teacher.id} 
          teacher={teacher} 
          favorited={favorites.includes(teacher.id)}
        />
      ))}
      </ScrollView>
    </View>
);
}

export default TeacherList;

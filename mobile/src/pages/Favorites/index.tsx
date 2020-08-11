import React, { useState } from 'react';
import {View, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, {Teacher} from '../../components/TeacherItem';
// import TeacherItem from '../../components/TeacherItem';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  
  useFocusEffect(() => {
    (async function getFavoriteTeachers() {
      try {
        const response = await AsyncStorage.getItem('favorites');

        const favoritedTeachers = JSON.parse(response as string);

        setFavorites(favoritedTeachers);

      } catch (error) {
        throw new Error('Error ao listar os professores favoritos');
      }
    })();
  });

  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffys favoritos" />
      <ScrollView 
        contentContainerStyle={{
          paddingHorizontal: 16,
            paddingVertical: 16
        }}
        style={styles.teacherList}>
        { favorites.map((teacher: Teacher) => (
          <TeacherItem key={teacher.id} teacher={teacher} favorited={true}/>
        )) }
        {/* <TeacherItem /> */}
      </ScrollView>
    </View>
  );
}

export default Favorites;

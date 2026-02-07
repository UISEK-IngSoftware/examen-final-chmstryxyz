/**
 * @file Home.tsx
 * @description Main view for listing Futurama characters using Ionic and Axios.
 */

import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
  IonNote,
  useIonViewWillEnter
} from '@ionic/react';
import { useState } from 'react';
import axios from 'axios';
import { Character, ApiResponse } from '../models/Character';
import './Home.css';

const Home: React.FC = () => {
  // --- States ---
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // --- API Logic ---
  const fetchCharacters = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get<ApiResponse>('https://futuramaapi.com/api/characters', {
        params: {
          orderBy: 'id',
          orderByDirection: 'asc',
          page: 1,
          size: 50
        }
      });
      
      setCharacters(response.data.items);
    } catch (err) {
      setError('Error al conectar con la API de Futurama.');
    } finally {
      setLoading(false);
    }
  };

  // --- Lifecycle ---
  useIonViewWillEnter(() => {
    fetchCharacters();
  });

  // --- View Helpers ---
  const renderEmptyState = () => (
    <div className="ion-text-center ion-padding">
      <IonText>No se encontraron personajes registrados.</IonText>
    </div>
  );

  const renderErrorState = () => (
    <div className="ion-text-center ion-padding">
      <IonText color="danger">{error}</IonText>
    </div>
  );

  // --- Main Render ---
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Futurama App</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <IonLoading isOpen={loading} message={'Cargando datos...'} />

        {error ? renderErrorState() : null}

        {!loading && !error && characters.length === 0 ? renderEmptyState() : null}

        <IonList>
          {characters.map((character) => (
            <IonItem key={character.id} lines="full">
              <IonAvatar slot="start">
                <img 
                  alt="" 
                  src={character.image || 'https://via.placeholder.com/150'} 
                />
              </IonAvatar>
              <IonLabel>
                <h2 style={{ fontWeight: 'bold' }}>{character.name}</h2>
                <p>
                  <IonNote color="medium">Género:</IonNote> {character.gender}
                </p>
                <p>
                  <IonNote color="medium">Estado:</IonNote> {character.status}
                </p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonIcon, IonButtons, IonBackButton } from '@ionic/react';
import { addCircle } from 'ionicons/icons';

import './Tab1.css';
import axios from 'axios';
import { RouteComponentProps } from 'react-router';


interface SingleGunPageProps extends RouteComponentProps<{
  id: string;
}> {}

const URL = 'https://paintballinventory.pupillogroup.com/api/guns/';


const fetchGun = (id: string) => {

  return axios({
    url: URL + id,
    method: 'get',
  }).then(response => {

    console.log(response);
    return response.data;
  })
};

const SingleGun: React.FC <SingleGunPageProps> = ({match}) => {

  const [gun, setGun] = React.useState({
    "gun_id": 0,
    "name": "",
    "image": "",
    "featured": true,
    "date": ""
  });

  React.useEffect(() => {

    fetchGun(match.params.id).then(data => setGun(data));

  }, [match.params.id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonTitle>{gun.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">

        <IonGrid>
          <IonRow>

            <IonCol><IonCard>
              <img src={gun.image} alt="Image Proccessing Not Working" />
              <IonCardHeader>
                <IonCardSubtitle>{gun.date}</IonCardSubtitle>
                <IonCardTitle>{gun.name}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
            <p>Link to Manual</p>
            <IonButton href={'guns/'} color="primary" slot="end">Back to All Guns</IonButton>
              </IonCardContent>
            </IonCard>
            </IonCol>

          </IonRow>
        </IonGrid>
      </IonContent>

    </IonPage>
  );
};


export default SingleGun;
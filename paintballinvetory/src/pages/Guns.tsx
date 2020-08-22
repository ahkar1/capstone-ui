/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonButton, IonLabel, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/react';
import './Tab1.css';
import axios from 'axios';

const API_KEY = 'YOUR_API_KEY';
const URL = 'http://localhost:5000/api/guns';


const fetchGuns = () => {

  return axios({
    url: URL,
    method: 'get'
  }).then(response => {

    console.log(response);
    return response.data;
  })
};

const Guns: React.FC = () => {

    const [guns, setGuns] = React.useState([]);

  React.useEffect(() => {

    fetchGuns().then(data => setGuns(data));

  }, []);


let itemsToRender;
if (guns) {
  itemsToRender = guns.map(a=> {
    return <IonCol><IonCard>
            <img src={a['image']} />
          <IonCardHeader>
            <IonCardSubtitle>{a['date']}</IonCardSubtitle>
            <IonCardTitle>{a['name']}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
          <IonButton href={'guns/'+ a['gun_id']} color="primary" slot="end">View Details</IonButton>
          <IonButton href={'guns/'+ a['gun_id']} color="primary" slot="end">Add Activity</IonButton>
          </IonCardContent>
        </IonCard>
        </IonCol>
        ;
  });
}
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>All Guns</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        
         <IonGrid>
         <IonRow>
        
        {itemsToRender}
        
      </IonRow>
      </IonGrid>
      </IonContent>

    </IonPage>
  );
};


export default Guns;
import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonButton, IonLabel } from '@ionic/react';
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

const Tab1: React.FC = () => {
  const [guns, setGuns] = React.useState([]);

  React.useEffect(() => {

    fetchGuns().then(data => setGuns(data));

  }, []);


let itemsToRender;
if (guns) {
  itemsToRender = guns.map(a=> {
    console.log("If Loop");
    return <IonItem><IonLabel>Name is {a['name']}</IonLabel><IonButton href="guns/" color="primary" slot="end">{a['image']}</IonButton></IonItem>;
  });
}
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        The world is your oyster.
        <p>
          If you get lost, the{' '}
          <a
            target="_blank"
            rel="noopener"
            href="https://ionicframework.com/docs/"
          >
            docs
          </a>{' '}
          will be your guide.
        </p>
        {itemsToRender}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;

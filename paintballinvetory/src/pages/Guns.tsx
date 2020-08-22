/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonButton, IonLabel, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonIcon, IonModal, IonList, IonInput, IonToggle, IonItemDivider, IonFabButton, IonFab } from '@ionic/react';
import './Tab1.css';
import axios from 'axios';
import { Plugins, CameraResultType } from '@capacitor/core';
import { addCircle, camera} from 'ionicons/icons';

const URL = 'http://paintballinventory-env.eba-yah5svs5.us-east-2.elasticbeanstalk.com/api/guns';
const { Camera } = Plugins;

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
    const [photo, setPhoto] = React.useState<string>();
    const [showModal, setShowModal] = React.useState(false);
    const [text, setText] = React.useState<string>();

  React.useEffect(() => {

    fetchGuns().then(data => setGuns(data));

  }, []);

  const takePicture = async () => {
      console.log("Take Picture");
    const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: false,
    resultType: CameraResultType.Uri
    });
    var imageUrl = image.webPath;
    // Can be set to the src of an image now
    setPhoto(imageUrl);
    }

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
         <IonRow>
        <IonCol>
        
        <IonCardHeader>
            <IonCardTitle>Add Gun</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
          <IonButton onClick={() => setShowModal(true)} color="primary" slot="end"><IonIcon slot="start" icon={addCircle} />Add</IonButton>
           </IonCardContent>
        </IonCol>
        
        
      </IonRow>
      </IonGrid>
      <IonModal isOpen={showModal} cssClass='my-custom-class'>
      <IonList>
      <IonItem>
            <IonLabel position="floating">Gun Name</IonLabel>
            <IonInput value={text}></IonInput>
          </IonItem>
          <IonItem>
            <IonButton color="primary" onClick={() => takePicture()}>
              <IonIcon slot="start" icon={camera} />Take Picture
            </IonButton>
       
          </IonItem>
          <IonItemDivider>Featured Gun</IonItemDivider>
          <IonItem><IonToggle name="featured" checked color="primary" /></IonItem>
          <IonButton href={'guns/'} color="primary" slot="end">Save</IonButton>
          </IonList>
        <IonButton onClick={() => setShowModal(false)}>Cancel</IonButton>
      </IonModal>

      </IonContent>

    </IonPage>
  );
};


export default Guns;
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonButton, IonLabel, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonIcon, IonModal, IonList, IonInput, IonToggle, IonItemDivider } from '@ionic/react';
import './Tab1.css';
import axios from 'axios';
import { Plugins, CameraResultType } from '@capacitor/core';
import { addCircle, camera, gitNetwork} from 'ionicons/icons';
import { Gun } from '../types/Gun';

const URL = 'https://paintballinventory.pupillogroup.com/api/guns';
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

const postGuns = (name: any, image: any, featured:any, date: string) => {

    axios.post(URL, {
        name: name,
        image: image,
        featured: featured,
        date: date
      })
      .then(function (response) {
        console.log(response);
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      })    
  };


const Guns: React.FC = () => {

    const [guns, setGuns] = React.useState([]);
    const [photo, setPhoto] = React.useState<string>();
    const [showModal, setShowModal] = React.useState(false);
    const [text, setText] = React.useState<string>();
    const [featured, setFeatured] = React.useState<boolean>();

  React.useEffect(() => {

    fetchGuns().then(data => setGuns(data));

  }, []);

  const savePicture = () => {
console.log("Save Picture");
console.log("Name of Gun " + text );
console.log("Name of Picture " + photo );
console.log("Featured " + featured );
var d = new Date();
console.log("Date " + d.toDateString());
postGuns(text, photo,featured,d.toDateString());
fetchGuns().then(data => setGuns(data));
    setShowModal(false)
  }

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
            <img src={a['image']} alt="Image Proccessing Not Working" />
          <IonCardHeader>
            <IonCardSubtitle>{a['date']}</IonCardSubtitle>
            <IonCardTitle>{a['name']}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
          <IonButton href={'guns/'+ a['gun_id']} color="primary" slot="end">View Details</IonButton>
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
            <IonInput value={text} onIonChange={e => setText(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonButton color="primary" onClick={() => takePicture()}>
              <IonIcon slot="start" icon={camera} />Take Picture
            </IonButton>
       
          </IonItem>
          <IonItemDivider>Featured Gun</IonItemDivider>
          <IonItem><IonToggle name="featured" color="primary" onIonChange={e => setFeatured(e.detail.checked)} /></IonItem>
          <IonButton onClick={() => savePicture()} color="primary" slot="end">Save</IonButton>
          </IonList>
        <IonButton onClick={() => setShowModal(false)}>Cancel</IonButton>
      </IonModal>

      </IonContent>

    </IonPage>
  );
};


export default Guns;
import { IonSlide, IonButton, IonGrid, IonRow, IonCol } from "@ionic/react";
import { MutableRefObject } from "react";
import "../pages/CreateFamily/CreateFamily.css";

export interface CreateFamilySlideProps{
    mainSlide?: boolean,
    finalSlide?: boolean,
    lastSlide: boolean,
    title: string,
    text: string,
    sliderRef: MutableRefObject<HTMLIonSlidesElement>
}

const CreateFamilySlide = ( props:CreateFamilySlideProps) => {

	return (

		<IonSlide>
            <IonGrid class="ion-justify-content-center ion-align-items-center ion-align-self-center">
                <IonRow class="spacer"></IonRow>
                    <IonRow>
                        <IonCol size="10" className="slide-content">
                            <h1>{ props.title }</h1>
                            <p>{ props.text }</p>

                            { props.mainSlide && 
                                
                                <IonButton expand="block" fill="outline" onClick={ () => props.sliderRef.current.slideNext() }>Get started &rarr;</IonButton>
                            }

                            { props.finalSlide &&
                                <>
                                    <IonButton expand="block" fill="solid">Register</IonButton>
                                    <IonButton expand="block" fill="outline">Login</IonButton>
                                </>
                            }
                        </IonCol>
                    </IonRow>
                <IonRow class="spacer"></IonRow>
            </IonGrid>
		</IonSlide>
	);
}

export default CreateFamilySlide;
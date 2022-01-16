import {IonRow, IonCol, IonButton} from "@ionic/react";

interface BottomSlideProps {
    numButtons: string,
    buttonOneLabel: string, buttonOneClick: (data?:any)=> (any | void),//Top
    buttonTwoLabel?: string | null, buttonTwoClick?: (data?:any) => (any | void),//bottom left
    buttonThreeLabel?: string | null, buttonThreeClick?: (data?:any) => (any | void) //bottom right
}

const BottomSlideButtons = (props: BottomSlideProps) => {

    const {numButtons, 
            buttonOneLabel, buttonOneClick,
            buttonTwoLabel, buttonTwoClick,
            buttonThreeLabel, buttonThreeClick} = props;
    

    const handleButtonOne = () => {
        console.log('BottomButton - button one');
        buttonOneClick();
    }
    switch (numButtons){
        case "one":
            return (
                <IonRow>
                    <IonCol>
                        <IonButton expand="block" onClick={handleButtonOne}>{buttonOneLabel}</IonButton>
                    </IonCol>
                </IonRow>
            );

        case "two":
            return (
                <IonRow>
                    <IonCol>
                        <IonButton expand="block" onClick={buttonOneClick}>{buttonOneLabel}</IonButton>
                    </IonCol>
                    <IonCol>
                        <IonButton expand="block" onClick={buttonTwoClick}>{buttonTwoLabel}</IonButton>
                    </IonCol>
                </IonRow>
            );

        case "three":
            return (<>
                <IonRow>
                    <IonCol>
                        <IonButton expand="block" onClick={buttonOneClick}>{buttonOneLabel}</IonButton>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonButton expand="block" onClick={buttonTwoClick}>{buttonTwoLabel}</IonButton>
                    </IonCol>
                    <IonCol>
                        <IonButton expand="block" onClick={buttonThreeClick}>{buttonThreeLabel}</IonButton>
                    </IonCol>
                </IonRow>
            </>);
        default:
            return  (
                <p>Error: Should be one, two, or three buttons in props</p>
            );
    }
}

export default BottomSlideButtons;
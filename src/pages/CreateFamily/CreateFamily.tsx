import { IonContent, IonGrid, IonRow, IonSlides, IonText } from "@ionic/react";

import './CreateFamily.css'; 
import { FamilyInfo } from "../../models/FamilyInfo";
import { HumanInfo } from "../../models/HumanInfo";
import { PetInfo } from "../../models/PetInfo";
import React from "react";
import FamilyQuestionSlides from "../../components/CreateFamily/FamilyQuestionSlides"

export interface CreateFamilyProps {
    onCreateFamily: (family: FamilyInfo) => void,
    index: number
}

export interface CreateFamilyState {
    familyInProgress: FamilyInfo
}

export default class CreateFamily extends React.Component<CreateFamilyProps,CreateFamilyState> {
    constructor(props: CreateFamilyProps){
        super(props);
        this.state ={
            familyInProgress: new FamilyInfo({}) 
        };
    }

    render() {

        const addHuman = (newHuman: HumanInfo) => {
            let newFamily = this.state.familyInProgress;
            if(newFamily.humans.length == 0){
                newFamily.humans = [newHuman];
            } else {
                newFamily.humans.push(newHuman);
            }
            
            console.log('family has a new human');
            console.log(newFamily);
            
            this.setState({familyInProgress: newFamily});
        }

        const addPet = (newPet: PetInfo): FamilyInfo => {
            let newFamily = this.state.familyInProgress;
            if(newFamily.pets.length == 0){
                newFamily.pets = [newPet];
            } else {
                newFamily.pets.push(newPet);
            }

            console.log('family has a new pet');
            console.log(newFamily);
            this.setState({familyInProgress: newFamily});
            return newFamily;
        }


        const saveFamilyInfo = (newFamily: FamilyInfo) => {
            if(!this.state.familyInProgress.baseFamilyEqual(newFamily)){
                newFamily.id = this.props.index.toString();
                this.setState({familyInProgress: newFamily});
                console.log('added family info, now to humanInfo');
                console.log(newFamily)
            } else {
                console.log('data is same, moving forward without saving');
            }
        }

        const submitFamily = (newPet: PetInfo | null) => {
            // this method is broken
            if(newPet == null){
                console.log('pet already exists, moving on with family as is');
                this.props.onCreateFamily(this.state.familyInProgress);
            } else {
                this.props.onCreateFamily(addPet(newPet));
            }
        }

        return (
            <IonContent>
                <IonGrid class="thing">
                    <IonRow>
                        <FamilyQuestionSlides index={this.state.familyInProgress.id} saveFamilyInfo={saveFamilyInfo} 
                            addHuman={addHuman} addPet={addPet} submitFamily={submitFamily}/>
                    </IonRow>
                    <IonRow>
                        { this.state?.familyInProgress?.familyName && 
                            <IonText><p>{this.state.familyInProgress.familyName}<br/> 
                                { this.state.familyInProgress.fullAddress} </p>
                            </IonText>
                        }
                    </IonRow>
                    <IonRow>
                        { this.state?.familyInProgress?.humans.length > 0 &&
                            this.state.familyInProgress.humans.map(h => {
                                return (
                                    <IonText><p> {h.firstName + " " + h.lastName + " - " + h.email}
                                    </p></IonText>
                                );
                            }) 
                        }<br/>
                    </IonRow>
                    <IonRow>
                        { this.state?.familyInProgress?.pets.length > 0 &&
                            this.state.familyInProgress.pets.map(p => {
                                return (
                                    <IonText><p> { p.name + " " + p.breed + " - " + p.sex}
                                    </p></IonText>
                                );
                            }) 
                        }<br/>
                    </IonRow>
                </IonGrid>
            </IonContent>
        );
    }
}
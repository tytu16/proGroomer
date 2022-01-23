import {IonButton, IonCol, IonGrid, IonIcon, IonLabel, IonList, IonListHeader, IonModal, IonPopover, IonRow } from '@ionic/react';
import React from "react";
import ModalContentWrapper from "./ModalContentWrapper"
import {MyTextArea} from "../InputFields/MyTextArea"
import {MyTextInput} from "../InputFields/MyTextInput";

import { removeCircleOutline, addCircleOutline } from "ionicons/icons";

import "../InputFields/InputStyling.scss";
import AccordionHeader from '../Accordion/AccordionHeader';

interface ModalNoteListProps{
    fields: any,
    noteFormPrefix: string,
    label: string,
    defaultOn: boolean
    handleSave: Function,
    handleCancel: Function,
    handleDelete: Function
}

interface ModalNoteListState{
    tempString: string,
    displayLabels: Array<string>,
    index: number,
    notesActive: boolean,
    e: any
}

export class ModalNoteList extends React.Component<ModalNoteListProps, ModalNoteListState> {
    constructor(props: ModalNoteListProps){
        super(props);
        this.state = {
            tempString: "",
            displayLabels: [""],
            notesActive: props.defaultOn,
            index: -1,
            e: undefined
        }
    }

    handleSave = (noteIndex: number ) => {
        console.log('saving note');
        let labelsCopy = this.state.displayLabels.slice();
        if(this.state.tempString != ''){
            labelsCopy[noteIndex] = this.state.tempString;
        }
        this.setState({
            tempString: "",
            displayLabels: labelsCopy,
            notesActive: true,
            index: -1,
            e: undefined
        });
        this.props.handleSave(noteIndex);
    }

    //Todo: Canceling a new addition prevents adding new notes
    handleCancel = (noteIndex: number) => {
        if(this.state.displayLabels.length-2 == noteIndex){
            let newLabels = this.state.displayLabels.slice();
            newLabels.pop();
            this.setState({
                tempString: "",
                displayLabels: newLabels,
                notesActive: true,
                index: -1,
                e: undefined
            });
        } else {
            this.setState((prevState) => ({
                tempString: "",
                displayLabels: prevState.displayLabels,
                index: -1,
                e: undefined
            }));
        }
        this.props.handleCancel(noteIndex);
    }

    handleModalChange = (index: number, e: any) => {
        if(e){e.persist();}
        this.setState((prevState)=>({
            tempString: prevState.tempString,
            displayLabels: prevState.displayLabels,
            notesActive: true,
            index: index,
            e: e
        }));
    }

    handleLabelChange = (data: string, fieldName: string) => {
        this.setState((prevState) => ({
            tempString: data,
            displayLabels: prevState.displayLabels,
            notesActive: true,
            index: prevState.index,
            e: prevState.e
        }));
    }

    handleAddNewNote = (e: any) => {
        this.setState((prevState) => ({
            tempString: prevState.tempString,
            displayLabels: prevState.displayLabels.concat("").slice(),
            notesActive: true,
            index: prevState.displayLabels.length-1,
            e: prevState.e
        }));
    }

    handleButtonDelete = (index: number) => {
        let localNotes = this.state.displayLabels.slice();
        localNotes = localNotes.slice(0,index).concat(localNotes.slice(index+1));
        this.setState((prevState) => ({
            tempString: prevState.tempString,
            displayLabels: localNotes,
            notesActive: true,
            index: prevState.index,
            e: prevState.e
        }));
        this.props.handleDelete(index);
    }

    render() {
        return(<div>
        <IonRow>
            <IonCol size="12"><div onClick={()=>this.setState((prevState) =>({
                tempString: prevState.tempString,
                displayLabels: prevState.displayLabels,
                notesActive: !prevState.notesActive,
                index: prevState.index,
                e: prevState.e
            }))}>
            <AccordionHeader fieldArrayIndex={0} disabled={true}
                isPrimary={true} isActive={this.state.notesActive}
                handleDelete={()=>{}} handleAccordion={()=>{}}>
                    <IonLabel className="large-header" >Notes for {this.props.label}</IonLabel>
            </AccordionHeader></div>
            </IonCol>
        </IonRow>
        <IonRow>
            <IonCol size="12">
                <IonList className={["accordion", (this.state.notesActive ? "" : " collapsed")].join(" ")}>
                    <div className="question-content">
                    {this.props.fields.map((field:any, noteIndex:number) => (<div key={field.id}>
                        <IonRow className={this.state.displayLabels[noteIndex] == ""
                             ? "hidden" : "note-label"}>
                            <IonCol size="6">
                                <IonListHeader onClick={(e:any)=>{this.handleModalChange(noteIndex, e)}}>
                                    {this.state.displayLabels[noteIndex]} 
                                </IonListHeader>
                            </IonCol>
                            <IonCol size="6">
                                <IonButton onClick={()=>this.handleButtonDelete(noteIndex)} color="danger"><IonIcon icon={removeCircleOutline}></IonIcon>&nbsp;Delete</IonButton>
                            </IonCol>
                        </IonRow>
                        
                        <IonModal class="modal-popover" isOpen={this.state.index == noteIndex}
                                    onDidDismiss={() => this.handleModalChange(-1, undefined)}>
                            <ModalContentWrapper setShow={this.handleModalChange} title={`Note ${noteIndex+1} for ${this.props.label}`} 
                                onCancel={()=>this.handleCancel(noteIndex)} onSave={()=>this.handleSave(noteIndex)}>
                                <IonGrid>
                                    <IonRow>
                                        <MyTextInput index={noteIndex} placeholder="Note Label"
                                            objectType={this.props.noteFormPrefix} fieldName="label"
                                            required={false} onChange={this.handleLabelChange} watched={true}/>
                                    </IonRow>
                                    <IonRow>
                                        <MyTextArea index={noteIndex} placeholder="Note Message..."
                                            objectType={this.props.noteFormPrefix} fieldName="message"/>
                                    </IonRow>
                                </IonGrid>
                            </ModalContentWrapper>
                        </IonModal>
                    </div>))}
                    <IonRow><IonCol size="12">
                        <IonButton expand='block' onClick={(e: any) => {
                            this.handleAddNewNote(e)
                        }}><IonIcon icon={addCircleOutline}></IonIcon>&nbsp;Add Note</IonButton>
                    </IonCol></IonRow>
               </div></IonList>
            </IonCol>
        </IonRow>
        </div>);
    }
}
import {IonButton, IonCol, IonGrid, IonLabel, IonList, IonListHeader, IonModal, IonPopover, IonRow } from '@ionic/react';
import React from "react";
import ModalInput from "./ModalInput"
import {MyTextArea} from "../InputFields/MyTextArea"
import {MyTextInput} from "../InputFields/MyTextInput";
import ItemSlideWrapper from "../Accordion/ItemSlideWrapper";

interface ModalNoteListProps{
    fields: any,
    noteFormPrefix: string,
    label: string,
    handleSave: Function,
    handleCancel: Function,
    handleDelete: Function
}

interface ModalNoteListState{
    tempString: string,
    displayLabels: Array<string>,
    index: number,
    e: any
}

export class ModalNoteList extends React.Component<ModalNoteListProps, ModalNoteListState> {
    constructor(props: ModalNoteListProps){
        super(props);
        this.state = {
            tempString: "",
            displayLabels: [""],
            index: -1,
            e: undefined
        }
    }

    handleSave = (noteIndex: number ) => {
        let labelsCopy = this.state.displayLabels.slice();
        if(this.state.tempString != ''){
            labelsCopy[noteIndex] = this.state.tempString;
        }
        this.setState({
            tempString: "",
            displayLabels: labelsCopy,
            index: -1,
            e: undefined
        });
        this.props.handleSave(noteIndex);
    }

    handleCancel = (noteIndex: number) => {
        console.log(`handling cancel for index: ${noteIndex}`);
        if(this.state.displayLabels.length == noteIndex){
            this.setState((prevState) => ({
                tempString: "",
                displayLabels: prevState.displayLabels.slice(0,prevState.displayLabels.length-1),
                index: -1,
                e: undefined
            }));
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

    handlePopoverChange = (index: number, e: any) => {
        if(e){e.persist();}
        this.setState((prevState)=>({
            tempString: prevState.tempString,
            displayLabels: prevState.displayLabels,
            index: index,
            e: e
        }));
    }

    handleLabelChange = (data: string, fieldName: string) => {
        this.setState((prevState) => ({
            tempString: data,
            displayLabels: prevState.displayLabels,
            index: prevState.index,
            e: prevState.e
        }));
    }

    handleAddNewNote = (e: any) => {
        this.setState((prevState) => ({
            tempString: prevState.tempString,
            displayLabels: prevState.displayLabels.concat(""),
            index: prevState.displayLabels.length-1,
            e: prevState.e
        }));
    }

    handleButtonDelete = (index: number) => {
        let localNotes = this.state.displayLabels.slice();
        localNotes = localNotes.slice(0,index).concat(localNotes.slice(index+1))
        this.setState((prevState) => ({
            tempString: prevState.tempString,
            displayLabels: localNotes,
            index: prevState.index,
            e: prevState.e
        }));
        this.props.handleDelete(index);
    }

    render() {
        return(<div>
        <IonRow>
            <IonCol size="6">
                <IonLabel className="large-header" >Notes for {this.props.label}</IonLabel>
            </IonCol>
            <IonCol size="6">
                <IonButton onClick={(e: any) => {
                    this.handleAddNewNote(e)
                }}>Add Note</IonButton>
            </IonCol>
        </IonRow>
        <IonRow>
            <IonCol size="12">
                <IonList>
                    {this.props.fields.map((field:any, noteIndex:number) => (<div key={field.id}>
                        <IonRow className={this.state.displayLabels[noteIndex] == ""
                             ? "hidden" : "note-label"}>
                            <IonCol size="6">
                                <IonListHeader onClick={(e:any)=>{this.handlePopoverChange(noteIndex, e)}}>
                                    {this.state.displayLabels[noteIndex]} 
                                </IonListHeader>
                            </IonCol>
                            <IonCol size="6">
                                <IonButton color="danger">Delete</IonButton>
                            </IonCol>
                        </IonRow>
                        
                        <IonModal class="modal-popover" isOpen={this.state.index == noteIndex}
                                    onDidDismiss={() => this.handlePopoverChange(-1, undefined)}>
                            <ModalInput setShow={this.handlePopoverChange} title={`Note ${noteIndex+1} for ${this.props.label}`} 
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
                            </ModalInput>
                        </IonModal>
                        </div>))}
                </IonList>
            </IonCol>
        </IonRow>
        </div>);
    }
}
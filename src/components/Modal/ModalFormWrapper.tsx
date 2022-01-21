import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { ModalNoteList } from './ModalNoteList';
import * as _ from 'lodash';

interface InputProps {
    onSave: Function,
    personIndex: number,
    label: string
    formPrefix: string
}

interface Note{
    label: string,
    message: string
}

const ModalFormWrapper: React.FC<InputProps> = ({personIndex, formPrefix, onSave}) => {
    const noteFormPrefix = formPrefix + `.${personIndex}.note`;
    const {watch, control, setValue} = useFormContext();

    console.log(`notecardModal name:${noteFormPrefix}`)
    const { fields, append, remove} = useFieldArray({
        control,
        name: noteFormPrefix,
    });
  
    const [notes, setNotes] = useState<Array<Note>>([]);

    const handleSave = (index: number) => {
        const data = _.cloneDeep(watch(`${noteFormPrefix}.${index}`));
        let newNotes = notes.slice();
        if(index < newNotes.length){
            newNotes[index] = data;
        } else {
            newNotes = newNotes.concat(data);
            append({label: "", message: ""});
        }
        setNotes(newNotes);
        onSave(data);
    }

    const handleCancel = (index: number) => {
        let fieldName = `${noteFormPrefix}.${index}`;
        if(index < notes.length){
            setValue(fieldName, {message: _.cloneDeep(notes[index].message), 
                                   label: _.cloneDeep(notes[index].label)});
        } else {
            setValue(fieldName, {message: "", label: ""});
        }
    }

    const handleDelete = (index: number) => {
        let newNotes = notes.slice(0,index).concat(notes.slice(index+1,));
        setNotes(newNotes);
        remove(index);
    }

    return <ModalNoteList fields={fields} noteFormPrefix={noteFormPrefix} handleDelete={handleDelete}
                label={'Person Num'} handleSave={handleSave} handleCancel={handleCancel} />
}
export default ModalFormWrapper;
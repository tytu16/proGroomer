import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { ModalNoteList } from './ModalNoteList';
import * as _ from 'lodash';

interface InputProps {
    objectIndex: number,
    label: string
    formPrefix: string,
    defaultOn: boolean
}

interface Note{
    label: string,
    message: string
}

const ModalFormWrapper: React.FC<InputProps> = ({objectIndex, formPrefix, label, defaultOn}) => {
    const noteFormPrefix = formPrefix + `.${objectIndex}.note`;
    const {watch, control, setValue} = useFormContext();

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
                label={label} handleSave={handleSave} handleCancel={handleCancel} defaultOn={defaultOn}/>
}
export default ModalFormWrapper;
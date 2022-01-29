import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { ModalNoteList } from './ModalNoteList';
import * as _ from 'lodash';

interface InputProps {
    label: string
    formName: string,
    defaultOn: boolean
}

interface Note{
    label: string,
    message: string
}

const ModalFormWrapper: React.FC<InputProps> = ({formName, label, defaultOn}) => {
    const {watch, control, setValue} = useFormContext();

    const { fields, append, remove} = useFieldArray({
        control,
        name: formName,
    });
  
    const [notes, setNotes] = useState<Array<Note>>([]);

    const handleSave = (index: number) => {
        const data = _.cloneDeep(watch(`${formName}.${index}`));
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
        let fieldName = `${formName}.${index}`;
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

    return <ModalNoteList fields={fields} noteFormPrefix={formName} handleDelete={handleDelete}
                label={label} handleSave={handleSave} handleCancel={handleCancel} defaultOn={defaultOn}/>
}
export default ModalFormWrapper;
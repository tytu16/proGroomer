import BaseFamily from "../models/baseFamily";

export interface FamiliesProps {
    families: Array<BaseFamily>,
    onNewFamily: (family: string) => void,
}
  
export interface FamiliesTabProps{
    families: Array<BaseFamily>,
    onNewFamily: (family: string) => void,
    onCreateFamily: (family: BaseFamily) => void
}

export interface FamiliesState {
    families: Array<BaseFamily>;
}
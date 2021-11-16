import BaseFamily from "../models/baseFamily";

export interface FamiliesProps {
    families: Array<BaseFamily>,
    onNewFamily: (family: string) => void,
}


export interface FamiliesState {
    families: Array<BaseFamily>;
}
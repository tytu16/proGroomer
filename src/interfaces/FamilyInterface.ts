import { FamilyInfo } from "../models/FamilyInfo";

export interface FamiliesProps {
    families: Array<FamilyInfo>,
    onNewFamily: (family: string) => void,
}


export interface FamiliesState {
    families: Array<FamilyInfo>;
}
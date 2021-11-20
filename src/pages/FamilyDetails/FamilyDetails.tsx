import React from "react";
import { useParams } from "react-router";
import PetQuestions from "../../components/CreateFamily/PetQuestions";
import { FamilyInfo } from "../../models/FamilyInfo";

export interface FamilyDetailProps {
    family: FamilyInfo
}

const FamilyDetail = (props: FamilyDetailProps) => {
    const params = useParams<{id: string}>()
    return (<>
        <h1>Displaying family id {params.id}</h1>
        <h2>family name: {props.family.familyName}</h2>
        <h2>family address: {props.family.fullAddress}</h2>
        <h2>Humans in the family:</h2>
        {
            props.family.humans.map(h => {
                return (
                    <h3>human name: {h.fullName + " - " + h.email}</h3>
                );
            })
        }
        <h2>Pets in the family</h2>
        {
            props.family.pets.map(p => {
                return (
                    <h3>pet name: {p.name + " " + p.breed + " " + p.sex}</h3>
                );
            })
        }
    </>);
}

export default FamilyDetail;
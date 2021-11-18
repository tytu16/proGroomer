import React from "react";
import { useParams } from "react-router";
import { FamilyInfo } from "../../models/FamilyInfo";

export interface FamilyDetailProps {
    family: FamilyInfo
}

const FamilyDetail = (props: FamilyDetailProps) => {
    const params = useParams<{id: string}>()
    console.log(props);
    return (<>
        <h1>Displaying family id {params.id}</h1>
        <h2>family name: {props?.family?.familyName}</h2>
        <h3>human name: {props.family.humans[0].firstName + " " + props.family.humans[0].lastName}</h3>
    </>);
}

export default FamilyDetail;
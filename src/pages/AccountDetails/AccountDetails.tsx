import React from "react";
import { useParams } from "react-router";
import PetQuestions from "../CreateAccount/CreateAccountQuestions/PetQuestions";
import { AccountInfo } from "../../models/AccountInfo";

export interface AccountDetailProps {
    account: AccountInfo
}

const AccountDetail = (props: AccountDetailProps) => {
    const params = useParams<{id: string}>()
    return (<>
        <h1>Displaying account id {params.id}</h1>
        <h2>account name: {props.account.accountName}</h2>
        <h2>account address: {props.account.fullAddress}</h2>
        <h2>People in the account:</h2>
        {
            props.account.person.map(h => {
                return (
                    <h3>Person name: {h.fullName + " - " + h.email}</h3>
                );
            })
        }
        <h2>Pets in the account</h2>
        {
            props.account.pet.map(p => {
                return (
                    <h3>pet name: {p.name + " " + p.breed + " " + p.maleFemale}</h3>
                );
            })
        }
    </>);
}

export default AccountDetail;
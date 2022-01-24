import { useFormContext } from "react-hook-form";

export interface AccountSummaryProps {
    handleAccountNames: (name: string, index: number) => void,
    accountNames: Array<string>,
    toPeopleInfo: () => void,
    index: number
}

const AccountSummary = (props: AccountSummaryProps) => {
    const {watch} = useFormContext();
    const accountSummary = watch()
    return (<p></p>);
}
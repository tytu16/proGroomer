import { useFormContext } from "react-hook-form";

export interface AccountSummaryProps {
    index: number,
    submitAndRepeat: Function,
    submitAndEnd: Function
}

const AccountSummary = (props: AccountSummaryProps) => {
    const {watch} = useFormContext();
    const accountSummary = watch();
    return (<p>account summry for index: {props.index}</p>);
}

export default AccountSummary;
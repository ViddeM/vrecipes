import DefaultLayout from "../layouts/DefaultLayout";
import {FC} from "react";
import {useTranslations} from "../hooks/useTranslations";

export type ErrorProps = { error: string };

const ErrorCard: FC<ErrorProps> = ({error}) => {
    const {translate} = useTranslations();

    return (
        <DefaultLayout>
            <div className="card">
                <p>
                    {translate(error)}
                </p>
            </div>
        </DefaultLayout>
    )
}

export default ErrorCard;
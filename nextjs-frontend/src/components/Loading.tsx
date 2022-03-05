import {FC} from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import {useTranslations} from "../hooks/useTranslations";

const Loading: FC = () => {
    let {t} = useTranslations();

    return (
        <DefaultLayout>
            {/*FIXME: Swap for a real spinner or smth*/}
            {t.common.loading}
        </DefaultLayout>
    )
}

export default Loading
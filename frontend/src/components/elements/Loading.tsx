import { FC } from "react";

import { useTranslations } from "../../hooks/useTranslations";
import DefaultLayout from "../../layouts/DefaultLayout";

const Loading: FC = () => {
  const { t } = useTranslations();

  return (
    <DefaultLayout>
      {/*FIXME: Swap for a real spinner or smth*/}
      {t.common.loading}
    </DefaultLayout>
  );
};

export default Loading;

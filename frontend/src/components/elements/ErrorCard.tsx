import React, { FC } from "react";

import { useTranslations } from "../../hooks/useTranslations";
import DefaultLayout from "../../layouts/DefaultLayout";

export type ErrorProps = { error: string };

const ErrorCard: FC<ErrorProps> = ({ error }) => {
  const { translate } = useTranslations();

  return (
    <DefaultLayout>
      <div>
        <p>{translate(error)}</p>
      </div>
    </DefaultLayout>
  );
};

export default ErrorCard;

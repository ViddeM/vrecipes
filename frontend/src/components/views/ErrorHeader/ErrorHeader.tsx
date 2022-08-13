import { useTranslations } from "../../../hooks/useTranslations";

import styles from "./ErrorHeader.module.scss";

const ErrorHeader = () => {
  const { t } = useTranslations();

  return (
    <div className={styles.appErrorHeader}>
      <h6>{t.errors.failedToConnectToBackend}</h6>
    </div>
  );
};
export default ErrorHeader;

import { useTranslations } from "../../../hooks/useTranslations";
import { useMe } from "../../../hooks/useMe";
import { useRouter } from "next/router";
import { isClientSide } from "../../../api/Api";
import { LOGIN_ENDPOINT } from "../../../api/Endpoints";
import CardLayout from "../../../layouts/CardLayout";
import styles from "./[recipebook].module.scss";

const EditRecipeBook = () => {
  const { t, translate } = useTranslations();
  const { isLoggedIn, me, initialized } = useMe();
  const router = useRouter();

  if (!isLoggedIn && isClientSide() && initialized) {
    router.push(LOGIN_ENDPOINT);
  }

  return (
    <CardLayout>
      <form className={`card ${styles.editRecipeBookCardColumn}`}></form>
    </CardLayout>
  );
};

export default EditRecipeBook;

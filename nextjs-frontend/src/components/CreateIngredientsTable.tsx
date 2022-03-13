import styles from "./CreateIngredientsTable.module.scss";
import { IconButton } from "./Buttons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "../hooks/useTranslations";

const CreateIngredientsTable = () => {
  let { t } = useTranslations();

  return (
    <table className={styles.createIngredientsTable}>
      <thead>
        <tr>
          <th>
            <h3>{t.recipe.ingredients}</h3>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>WHAT?</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={3} className={styles.tableFooter}>
            <IconButton
              icon={faPlus}
              variant="primary"
              type="button"
              size="small"
            />
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default CreateIngredientsTable;

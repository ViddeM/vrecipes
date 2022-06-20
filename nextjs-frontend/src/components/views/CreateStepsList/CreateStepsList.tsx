import {
  faArrowDown,
  faArrowUp,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import { Step } from "../../../api/Step";
import { useTranslations } from "../../../hooks/useTranslations";
import { IconButton } from "../../elements/Buttons/Buttons";
import { TextArea } from "../../elements/TextField/TextField";

import styles from "./CreateStepsList.module.scss";

const STEP_BASE_ID = "step";

interface CreateStepsListProps {
  steps: Step[];
  setSteps: (newSteps: Step[]) => void;
}

const CreateStepsList = ({ steps, setSteps }: CreateStepsListProps) => {
  const { t } = useTranslations();

  const deleteStep = (stepNumber: number) => {
    const newSteps = steps
      .filter((s) => s.number !== stepNumber)
      .map((s) => {
        if (s.number > stepNumber) {
          return { ...s, number: s.number - 1 };
        }
        return s;
      });
    setSteps(newSteps);
  };

  const changeStepPosition = (stepNumber: number, up: boolean) => {
    // Ensure that it doesn't go above the max number of steps (0 indexed).
    let newNumber = Math.min(stepNumber + 1, steps.length - 1);

    if (up) {
      // Ensure that it doesn't go below 0
      newNumber = Math.max(stepNumber - 1, 0);
    }

    const newSteps = steps
      .map((step) => {
        if (step.number === stepNumber) {
          return {
            ...step,
            number: newNumber,
          };
        } else {
          // Swap place with the row that is where we want to be
          if (step.number === newNumber) {
            return {
              ...step,
              number: stepNumber,
            };
          }
        }

        return step;
      })
      .sort((a, b) => {
        return a.number - b.number;
      });

    setSteps(newSteps);
  };

  return (
    <div className={styles.createStepsListContainer}>
      <h3>{t.recipe.createSteps}</h3>

      {steps.length > 0 && (
        <div className={styles.stepsContainer}>
          {steps.map((step, index) => {
            return (
              <CreateStep
                key={index}
                changeStepPosition={(up) => changeStepPosition(step.number, up)}
                deleteStep={() => deleteStep(step.number)}
                step={step}
                updateStep={(updatedStep: Step) => {
                  setSteps(
                    steps.map((s) => {
                      if (s.number === step.number) {
                        return updatedStep;
                      }
                      return s;
                    })
                  );
                }}
              />
            );
          })}
        </div>
      )}

      <IconButton
        icon={faPlus}
        className="marginTop"
        variant="primary"
        type="button"
        size="small"
        iconColor={"white"}
        onClick={() => {
          setSteps([...steps, { number: steps.length, description: "" }]);
        }}
      />
    </div>
  );
};

interface CreateStepProps {
  step: Step;
  updateStep: (step: Step) => void;
  deleteStep: () => void;
  changeStepPosition: (up: boolean) => void;
}

const CreateStep = ({
  step,
  updateStep,
  deleteStep,
  changeStepPosition,
}: CreateStepProps) => {
  const { t } = useTranslations();

  const stepId = `${STEP_BASE_ID}-${step.number}`;

  return (
    <div className={styles.stepContainer}>
      <div className={`marginRight ${styles.stepMovementContainer}`}>
        <IconButton
          variant="opaque"
          size="small"
          icon={faArrowUp}
          type="button"
          onClick={() => changeStepPosition(true)}
          disabled={false} /* TODO */
        />
        <p className={styles.stepNumber}>{`${step.number + 1}`}</p>
        <IconButton
          className={styles.deleteIngredientButton}
          variant="opaque"
          size="small"
          icon={faArrowDown}
          type="button"
          onClick={() => changeStepPosition(false)}
          disabled={false} /* TODO */
        />
      </div>
      <div className={styles.stepTextAreaContainer}>
        <label htmlFor={stepId}>{t.recipe.description}</label>
        <TextArea
          id={stepId}
          name={stepId}
          placeholder={t.recipe.description}
          value={step.description}
          onChange={(e) => {
            updateStep({ ...step, description: e.target.value });
          }}
          maxLength={1000}
          required
          textAreaClassName={styles.stepTextArea}
        />
      </div>
      <IconButton
        variant="secondary"
        size="small"
        icon={faMinus}
        type="button"
        onClick={deleteStep}
        className="marginLeft"
      />
    </div>
  );
};

export default CreateStepsList;

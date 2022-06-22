import Link from "next/link";

import { useTranslations } from "../../hooks/useTranslations";
import CardLayout from "../../layouts/CardLayout";

import { Button } from "./Buttons/Buttons";

interface NoAccessProps {
  text: string;
  backUrl: string;
}

const NoAccess = ({ text, backUrl }: NoAccessProps) => {
  const { t } = useTranslations();
  return (
    <CardLayout>
      <div className="card column">
        <p className="marginBottom">{text}</p>
        <Link href={backUrl}>
          <a tabIndex={-1}>
            <Button variant="primary" size="normal">
              {t.common.takeMeBack}
            </Button>
          </a>
        </Link>
      </div>
    </CardLayout>
  );
};

export default NoAccess;

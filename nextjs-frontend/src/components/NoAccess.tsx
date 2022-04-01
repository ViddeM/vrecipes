import { Button } from "./Buttons";
import { useTranslations } from "../hooks/useTranslations";
import CardLayout from "../layouts/CardLayout";
import Link from "next/link";
import { ROOT_ENDPOINT } from "../api/Endpoints";

interface NoAccessProps {
  text: String;
}

const NoAccess = ({ text }: NoAccessProps) => {
  const { t } = useTranslations();
  return (
    <CardLayout>
      <div className="card column">
        <p className="marginBottom">{text}</p>
        <Link href={ROOT_ENDPOINT}>
          <a>
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

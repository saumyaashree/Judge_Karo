import { getQuestionnaireBySector } from "@/lib/data";
import { notFound } from "next/navigation";
import QuestionnaireForm from "./components/QuestionnaireForm";
import { SECTORS } from "@/lib/constants";
import type { Sector } from "@/lib/types";

export default function QuestionnairePage({
  params,
}: {
  params: { sector: string };
}) {
  const sector = params.sector as Sector;
  const questionnaire = getQuestionnaireBySector(sector);
  const sectorInfo = Object.values(SECTORS).find(s => s.id === sector);

  if (!questionnaire || !sectorInfo) {
    notFound();
  }

  return (
    <div>
        <h1 className="text-3xl font-bold text-center mb-2 font-headline">Find Your Perfect {sectorInfo.name}</h1>
        <p className="text-muted-foreground text-center mb-8">Answer a few questions to get a personalized recommendation in seconds.</p>
        <QuestionnaireForm questionnaire={questionnaire} />
    </div>
  );
}

export function generateStaticParams() {
    return Object.values(SECTORS).map(sector => ({
        sector: sector.id,
    }));
}

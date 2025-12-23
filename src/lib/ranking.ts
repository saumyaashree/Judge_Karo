import { getProductsBySector, getScoresByProductId } from "./data";
import type { Product, Sector, UserAnswers, RecommendedProduct, ProductScores, ScoreBreakdown } from "./types";

const WEIGHTS = {
  useCaseMatch: 40,
  realWorldExperience: 30,
  longevity: 15,
  budgetAlignment: 10,
  buyTimingAdvisor: 5,
};

function calculateUseCaseMatch(product: Product, answers: UserAnswers): { score: number; reason: string } {
    let score = 0;
    let matchingTags: string[] = [];

    const primaryUse = answers.primaryUse as string || answers.usage as string;
    if (product.tags.includes(primaryUse)) {
        score += 50;
        matchingTags.push(primaryUse);
    }

    if(answers.priority === 'performance' && product.tags.includes('performance')) {
        score += 20;
    }
    if(answers.priority === 'comfort' && product.tags.includes('comfort')) {
        score += 20;
    }
     if(answers.mustHave && answers.mustHave !== 'none' && product.tags.includes(answers.mustHave as string)) {
        score += 30;
    }

    // Normalize to 100
    score = Math.min(100, score);
    
    let reason = `A strong contender for your focus on '${primaryUse}'.`;
    if(score > 80) reason = `An excellent fit for your primary need: '${primaryUse}'.`;
    if(score < 50) reason = `A possible, but not perfect, match for your use case.`;

    return { score, reason };
}

function calculateRealWorldExperience(scores: ProductScores): number {
    const comfortScore = (scores.comfort / 10) * 30;
    const reliabilityScore = (scores.reliability / 10) * 40;
    const repurchaseScore = (scores.repurchaseIntent / 100) * 30;
    return (comfortScore + reliabilityScore + repurchaseScore);
}

function calculateLongevityScore(scores: ProductScores): number {
    // 5+ years is a perfect score
    return Math.min(100, (scores.longevity / 5) * 100);
}

function calculateBudgetAlignment(product: Product, answers: UserAnswers): number {
    const budget = answers.budget as number;
    const price = product.price;
    const diff = budget - price;

    if (diff >= 0) {
        // Under budget is good, but being too far under might not be the best value.
        // Score is 100 if price is 75%-100% of budget.
        const percentageOfBudget = price / budget;
        if (percentageOfBudget >= 0.75) return 100;
        return 80;
    } else {
        // Over budget. Penalize based on how much over.
        const overAmount = Math.abs(diff);
        if (overAmount <= budget * 0.1) return 60; // Up to 10% over
        if (overAmount <= budget * 0.2) return 40; // Up to 20% over
        return 0; // More than 20% over
    }
}

function calculateBuyTiming(product: Product): number {
    return product.upcomingModel ? 0 : 100;
}


export function rankProducts(answers: UserAnswers, sector: Sector): RecommendedProduct[] {
  const products = getProductsBySector(sector);

  const rankedProducts = products.map((product) => {
    const scores = getScoresByProductId(product.id);
    if (!scores) return null;

    const useCase = calculateUseCaseMatch(product, answers);
    const realWorld = calculateRealWorldExperience(scores);
    const longevity = calculateLongevityScore(scores);
    const budget = calculateBudgetAlignment(product, answers);
    const timing = calculateBuyTiming(product);
    
    const scoreBreakdown: ScoreBreakdown = {
        useCaseMatch: (useCase.score / 100) * WEIGHTS.useCaseMatch,
        realWorldExperience: (realWorld / 100) * WEIGHTS.realWorldExperience,
        longevity: (longevity / 100) * WEIGHTS.longevity,
        budgetAlignment: (budget / 100) * WEIGHTS.budgetAlignment,
        buyTimingAdvisor: (timing / 100) * WEIGHTS.buyTimingAdvisor,
        total: 0
    };

    scoreBreakdown.total = Object.values(scoreBreakdown).reduce((sum, current) => sum + current, 0) - scoreBreakdown.total;

    return {
      product,
      scores,
      scoreBreakdown,
      fitReason: useCase.reason,
      buyNowOrWait: timing === 100 ? "BUY NOW" : "WAIT",
    } as Omit<RecommendedProduct, 'rank'>;
  });

  const validProducts = rankedProducts.filter(p => p !== null) as Omit<RecommendedProduct, 'rank'>[];
  
  const sortedProducts = validProducts.sort((a, b) => b.scoreBreakdown.total - a.scoreBreakdown.total);

  return sortedProducts.slice(0, 5).map((p, index) => ({
      ...p,
      rank: index + 1
  }));
}

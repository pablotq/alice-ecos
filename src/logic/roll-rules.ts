export type RollOutcome =
    | "critical-success"
    | "success"
    | "costly-success"
    | "failure"
    | "critical-failure";

export type RollResult = {
    diceCount: number;
    results: number[];
    cleanSuccess: number;
    costlySuccess: number;
    totalSuccess: number;
    difficulty: number;
    critical: boolean;
    costly: boolean;
    outcome: RollOutcome;
    roll: Roll;
};

type ResolveRollParams = {
    attributeValue: number;
    bonus?: number;
    integrity?: number;
    difficulty: number;
};

export async function resolveRoll({
    attributeValue,
    bonus = 0,
    integrity = 0,
    difficulty,
}: ResolveRollParams): Promise<RollResult> {
    const diceCount = Math.max(1, attributeValue + bonus - integrity);

    const roll = new Roll(`${diceCount}d6`);
    await roll.evaluate();

    const results = roll.dice.flatMap((die: any) =>
        die.results.map((result: any) => result.result)
    );

    const cleanSuccess = results.filter((value) => value >= 5).length;
    const costlySuccess = results.filter((value) => value === 4).length;
    const totalSuccess = cleanSuccess + costlySuccess;

    const critical = cleanSuccess >= 2 * difficulty;

    const criticalFailure =
        cleanSuccess === 0 &&
        costlySuccess === 0 &&
        results.filter((value) => value === 1).length >= 2;

    let costly = false;
    let outcome: RollOutcome;

    if (critical) {
        outcome = "critical-success";
    } else if (totalSuccess >= difficulty) {
        const neededCostly = Math.max(0, difficulty - cleanSuccess);
        costly = neededCostly > 0 && costlySuccess >= neededCostly;
        outcome = costly ? "costly-success" : "success";
    } else if (criticalFailure) {
        outcome = "critical-failure";
    } else {
        outcome = "failure";
    }

    return {
        diceCount,
        results,
        cleanSuccess,
        costlySuccess,
        totalSuccess,
        difficulty,
        critical,
        costly,
        outcome,
        roll,
    };
}
export default interface IDifficultyMetrics {
    numAllowedFromEachOperatorType: { [key: number]: number };
    difficultyOfPower: number;
    difficultyOfMultiplication: number;
    numMinOperators: number;
    numMaxOperators: number;
    numMinLevelOfComposition: number;
    numMaxLevelOfComposition: number;
    numMinParameters: number;
    numMaxParameters: number;
    minConstValue: number;
    maxConstValue: number;
    constIsOnlyInt: boolean;
    parameterChance: number;
    shouldYieldNonZeroDiff: boolean;
    shouldYieldNonConstDiff: boolean;
}
import IBackendPreferences from "./BackendPreferenceTypes";
import IDifficultyMetrics from "./DifficultyMetrics";

export interface IDifferentiationQueryBody {
    input: string;
    preferences: IBackendPreferences | null;
}

export interface IExerciseQueryBody {
    level: string | null;
    difficultyMetrics: IDifficultyMetrics | null;
    preferences: IBackendPreferences | null
}
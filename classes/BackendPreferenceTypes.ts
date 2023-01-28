export default interface IBackendPreference {
    simplificationPreferences: IBackendSimplificationPreferences;
}

export interface IBackendSimplificationPreferences {
    opsNotToEvaluate: string[]
}
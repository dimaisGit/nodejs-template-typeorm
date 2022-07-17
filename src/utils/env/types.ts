export type ExtractValueFromEnvFunction<ReturnType> = (
  variableName: string
) => ReturnType | never;

export type ExtractValueFromEnvFunction<ReturnType> = (
  variableName: EnvVariableName
) => ReturnType | never;

export type EnvVariableName = "PORT";

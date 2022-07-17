export type ExtractValueFromEnvFunction<ReturnType> = (
  variableName: EnvVariableName
) => ReturnType | never;

export type EnvVariableName = "PORT" | "DB_USERNAME" | "DB_PASSWORD";

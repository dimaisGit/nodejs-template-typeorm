import { checkIfEnvVariableIsNull } from "./checkIfEnvVariableIsNull";
import { ExtractValueFromEnvFunction } from "./types";

export const extractStringFromEnv: ExtractValueFromEnvFunction<string> = (
  variableName
) => {
  checkIfEnvVariableIsNull(variableName);

  return process.env[variableName] as string;
};

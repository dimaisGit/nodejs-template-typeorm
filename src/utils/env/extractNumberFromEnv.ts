import { checkIfEnvVariableIsNull } from "./checkIfEnvVariableIsNull";
import { ExtractValueFromEnvFunction } from "./types";

export const extractNumberFromEnv: ExtractValueFromEnvFunction<number> = (
  variableName
) => {
  checkIfEnvVariableIsNull(variableName);

  const value = parseFloat(process.env[variableName] as string);

  if (!Number.isNaN(value)) {
    return value;
  } else {
    const msg: string = `Specified ${variableName} ENV variable isn't matching its type (number)`;
    throw new Error(msg);
  }
};

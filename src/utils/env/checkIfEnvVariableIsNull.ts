export const checkIfEnvVariableIsNull = (
  variableName: string
): void | never => {
  if (!process.env[variableName]) {
    const msg: string = `You didn't specified ${variableName} ENV variable`;
    throw new Error(msg);
  }
};

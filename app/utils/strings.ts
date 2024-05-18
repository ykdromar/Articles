export const convertString = (input: string) => {
  // Step 1: Replace spaces with hyphens
  let result = input.replace(/\s+/g, "-");

  // Step 2: Remove all non-alphanumeric characters except hyphens
  result = result.replace(/[^a-zA-Z0-9-]/g, "");

  return result;
};

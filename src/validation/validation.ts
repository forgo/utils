/**
 * Represents the result of a validation check.
 * @property valid - Whether the value is valid.
 * @property suggestion - A suggestion for a valid value.
 */
export type ValidationResult = {
  valid: boolean;
  suggestion: string;
};

/**
 * Represents a validation function for a value.
 * @template T - The type of the value to validate.
 */
export type Validation<T> = (value?: T | null) => ValidationResult;

/**
 * Validates an artifact name to ensure it is lower-kebab-case, starts with a letter, and is >= 3 characters.
 * @param name - The name to validate.
 * @returns The result of the validation check.
 */
export const isValidArtifactName: Validation<string> = (name) => {
  if (typeof name !== "string" || name === null || name === undefined) {
    return {
      suggestion: "must be a string and not null or undefined",
      valid: false,
    };
  }

  // >= 3 characters
  const ruleLength = /^.{3,}$/;

  // must only contain lowercase letters, numbers, and dashes
  const ruleAllowedChars = /^[a-z0-9-]+$/;

  // must not contain consecutive dashes
  const ruleNoConsecutiveDashes = /^(?!.*--).*$/;

  // must not end with a dash
  const ruleNoEndDash = /^[^-].*[^-]$/;

  // must start with a letter
  const ruleStartWithAlpha = /^[a-z]/;

  const valid =
    ruleLength.test(name) &&
    ruleAllowedChars.test(name) &&
    ruleNoConsecutiveDashes.test(name) &&
    ruleNoEndDash.test(name) &&
    ruleStartWithAlpha.test(name);

  return {
    suggestion:
      "must be lower-kebab-case, start with a letter, and be >= 3 characters",
    valid,
  };
};

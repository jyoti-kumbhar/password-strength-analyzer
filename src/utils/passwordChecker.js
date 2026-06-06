import { commonPasswords } from "./commonPasswords";

export const analyzePassword = (password) => {
  let score = 0;
  const feedback = [];

  const checks = {
    length: password.length >= 12,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  if (checks.length) {
    score += 25;
  } else {
    feedback.push("Use at least 12 characters");
  }

  if (checks.uppercase) {
    score += 20;
  } else {
    feedback.push("Add uppercase letters");
  }

  if (checks.lowercase) {
    score += 20;
  } else {
    feedback.push("Add lowercase letters");
  }

  if (checks.number) {
    score += 20;
  } else {
    feedback.push("Add numbers");
  }

  if (checks.special) {
    score += 15;
  } else {
    feedback.push("Add special characters");
  }

  let strength = "Weak";

  if (score > 70) {
    strength = "Strong";
  } else if (score > 40) {
    strength = "Medium";
  }

  const isCommon = commonPasswords.includes(
    password.toLowerCase()
  );

  if (isCommon) {
    feedback.unshift(
      "This password is commonly used and easy to guess"
    );

    score = Math.min(score, 30);
    strength = "Weak";
  }

  const entropy = password.length
    ? Math.round(password.length * Math.log2(94))
    : 0;

  return {
    score,
    strength,
    feedback,
    checks,
    isCommon,
    entropy,
  };
};
import { User } from "@/features/auth/model/types";

export const calcProfileCompletion = (values: Partial<User>, portfolioCount = 0) => {
  let filledFields = 0;
  const totalFields = 9;

  if (values.firstName?.trim()) filledFields++;
  if (values.lastName?.trim()) filledFields++;
  if (values.username?.trim()) filledFields++;
  if (values.email?.trim()) filledFields++;
  if (values.phone?.trim()) filledFields++;
  if (values.country?.trim()) filledFields++;
  if (values.city?.trim()) filledFields++;

  if (values.skills && values.skills.length > 0) filledFields++;

  if (values.rate && values.rate > 0) filledFields++;

  const baseProgress = Math.round((filledFields / totalFields) * 85);

  const portfolioBonus = portfolioCount >= 5 ? 15 : 0;

  return Math.min(baseProgress + portfolioBonus, 100);
};

export const calcClientCompletion = (values: Partial<User>) => {
  const checks = [
    values.firstName?.trim(),
    values.lastName?.trim(),
    values.phone?.trim(),
    values.country?.trim(),
    values.city?.trim(),
    values.bio?.trim(),
    values.avatarUrl,
  ];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
};

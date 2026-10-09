import {
  REGISTRATION_OPEN,
  registrationDeadline,
  registrationMode,
} from "@/data/event";

const dayInMilliseconds = 24 * 60 * 60 * 1000;
const registrationDeadlineTimestamp = Date.parse(registrationDeadline);

export interface RegistrationStatus {
  isOpen: boolean;
  daysLeft: number | null;
  label: "Register on Unstop" | "Registration closed";
}

export function getRegistrationStatus(now: Date | null): RegistrationStatus {
  const isOpen =
    REGISTRATION_OPEN &&
    (now === null ||
      registrationMode === "manual" ||
      now.getTime() < registrationDeadlineTimestamp);
  const remainingMilliseconds =
    now === null ? null : registrationDeadlineTimestamp - now.getTime();
  const daysLeft =
    remainingMilliseconds !== null && remainingMilliseconds >= 0
      ? Math.ceil(remainingMilliseconds / dayInMilliseconds)
      : null;

  return {
    isOpen,
    daysLeft,
    label: isOpen ? "Register on Unstop" : "Registration closed",
  };
}

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { createHmac } from 'crypto';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateSecretHash(email: string): string {
  const clientId = '5ets0llbl3m4hv27ecvdrsda1v';
  const clientSecret = '12l6qsfg7skjsl6pknbanb5hg2mu7h3otnkcgtnp1b4vd3h9arjh';

  const message = email + clientId;
  const hmac = createHmac('sha256', clientSecret);
  hmac.update(message);
  return hmac.digest('base64');
}

// const getErrorMessage = (error: unknown): string => {
//   if (error instanceof Error) {
//     return error.message;
//   }

//   if (error && typeof error === "object" && "message" in error) {
//     return String(error.message);
//   }

//   if (typeof error === "string") {
//     return error;
//   }

//   return "An error occurred";
// }
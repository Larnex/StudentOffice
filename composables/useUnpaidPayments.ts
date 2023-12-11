// ~/composables/useUnpaidPayments.ts
import { useState } from "#app";

export const useUnpaidPayments = () => {
  const unpaidPayments = useState("unpaidPayments", () => {
    return true;
  });

  function setUnpaidStatus(status: boolean) {
    unpaidPayments.value = status;
  }

  return { unpaidPayments, setUnpaidStatus };
};

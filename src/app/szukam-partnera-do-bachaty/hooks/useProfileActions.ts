import { useCallback } from "react";
import { toast } from "react-toastify";

export const useProfileActions = () => {
  const handleWantToDance = useCallback(async (profileId: string) => {
    toast.success("Wysłano zaproszenie do tańca! 💃🕺");
  }, []);

  return {
    handleWantToDance,
  };
};

import { useForm } from "react-hook-form";
import { api } from "../../../utils/api";

export const useFirstLoginModal = () => {
  const { data } = api.measure.geAllMeasureFields.useQuery();

  const { register, handleSubmit } = useForm();

  return { data, register, handleSubmit };
};

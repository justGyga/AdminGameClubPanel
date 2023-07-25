import * as yup from "yup";

export const idDto = yup.object().shape({
    id: yup.number().required().min(1)
});
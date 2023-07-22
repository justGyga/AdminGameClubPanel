import * as yup from "yup";

export const getByIdDto = yup.object().shape({
    id: yup.number().required().min(1)
});
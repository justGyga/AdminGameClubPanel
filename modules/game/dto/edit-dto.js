import * as yup from "yup";

export const editDto = yup.object().shape({
    name: yup.string().required()
});
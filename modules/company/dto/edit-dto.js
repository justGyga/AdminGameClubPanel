import * as yup from "yup";

export const editDto = yup.object().shape({
    login: yup.string().min(2).max(10),
    name: yup.string().min(8).max(20),
});

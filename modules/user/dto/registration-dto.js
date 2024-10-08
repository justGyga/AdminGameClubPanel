import * as yup from "yup";

export const regDto = yup.object().shape({
    login: yup.string().required().min(2).max(10),
    password: yup.string().required().min(8).max(20),
    firstName: yup.string().required(),
    secondName: yup.string().required()
});

import * as yup from "yup";

export const registerDto = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(8)
});

import * as yup from "yup";

export const authorizationDto = yup.object().shape({
    newLogin: yup.string().required().min(2).max(10)
});

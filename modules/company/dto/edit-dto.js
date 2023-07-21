import * as yup from "yup";

export const editDto = yup.object().shape({
    newLogin: yup.string().min(2).max(10),
    newName: yup.string().min(8).max(20),
});

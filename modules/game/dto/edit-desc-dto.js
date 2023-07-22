import * as yup from "yup";

export const editDescDto = yup.object().shape({
    newDescription: yup.string().required()
});
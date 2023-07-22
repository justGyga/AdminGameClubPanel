import * as yup from "yup";

export const editNameDto = yup.object().shape({
    newName: yup.string().required()
});
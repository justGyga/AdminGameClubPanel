import * as yup from "yup";

export const addDto = yup.object().shape({
    name: yup.string().required().min(1),
    description: yup.string().required(),
    image: yup.string(),
    minNumUsers: yup.number().min(1),
    maxNumUsers: yup.number().required()
});

import * as yup from "yup";

export const uuidDto = yup.object().shape({ id: yup.string().uuid().required() });

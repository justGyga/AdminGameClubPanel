import * as yup from "yup";

const ValidateNumberIdDto = yup.object().shape({ id: yup.number().integer().positive().required() });

export default ValidateNumberIdDto;

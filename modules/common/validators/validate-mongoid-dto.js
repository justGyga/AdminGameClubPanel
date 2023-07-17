import * as yup from "yup";

const ValidateMongoIdDto = yup.object().shape({ id: yup.string().isTrim().required() });

export default ValidateMongoIdDto;

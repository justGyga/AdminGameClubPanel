import * as yup from "yup";

export const addDto = yup.object().shape({
    name: yup.string().required().min(1),
    description: yup.string().required(),
    image: yup.string(),
    minNumUsers: yup.number().min(1),
    maxNumUsers: yup
        .number()
        .required()
        .test("is-greater-than-min", "maxNumUsers must be greater than minNumUsers", function (value) {
            const { minNumUsers } = this.parent;
            return value > minNumUsers;
        })
});

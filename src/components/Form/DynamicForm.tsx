import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTheme } from "@mui/material";
import RadioCheckboxField from "./RadioCheckboxField.tsx";
import SelectField from "./SelectField.tsx";
import TextAreaField from "./TextAreaField.tsx";
import InputFields from "./InputFields.tsx";
import { IField, IFormSchema } from "../../Interfaces/formSchema";

import "./styles.scss";

const DynamicForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IFormSchema | null>(null);
  const theme = useTheme();
  const formFields = useSelector((state) => state) as IFormSchema;

  useEffect(() => {
    if (!formFields.formTitle) {
      navigate("/");
    }
  }, [formFields, navigate]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormSchema>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IFormSchema> = async (data) => {
    setFormData(data);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleReset = () => {
    reset();
    setFormData(null);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={`dynamic-form ${theme.palette.mode}`}>
      <div className="dn-form">
        <div className="form-container">
          <h1>{formFields.formTitle}</h1>
          <h3>{formFields.formDescription}</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            {formFields.fields.map((field: IField) => {
              // To modularize the code created separate component to get the checkbox or radio button inputs
              if (["checkbox", "radio"].includes(field.type)) {
                return (
                  <RadioCheckboxField
                    field={field}
                    register={register}
                    errors={errors}
                  />
                );
              }

              // To modularize the code created separate component to get the dropdown inputs
              if (field.type === "select") {
                return (
                  <SelectField
                    field={field}
                    register={register}
                    errors={errors}
                  />
                );
              }

              // To modularize the code created separate component to get the textarea inputs
              if (field.type === "textarea") {
                return (
                  <TextAreaField
                    field={field}
                    register={register}
                    errors={errors}
                  />
                );
              }

              // To modularize the code created separate component to get the all inputs which are not mentioned above
              return (
                <InputFields
                  field={field}
                  register={register}
                  errors={errors}
                />
              );
            })}

            <br />
            <div className="btn-container">
              <input type="submit" value="Submit" disabled={isSubmitting} />
              <input type="button" value="Reset" onClick={handleReset} />
            </div>
          </form>
        </div>
      </div>
      {formData ? (
        <pre className={theme.palette.mode}>
          {JSON.stringify(formData, null, 2)}
        </pre>
      ) : null}
    </div>
  );
};

export default DynamicForm;

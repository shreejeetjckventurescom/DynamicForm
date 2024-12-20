import React from "react";
import { IOption } from "../../Interfaces/formSchema";

const SelectField = ({ field, register, errors }) => {
  return (
    <div className="field-container" key={field.id}>
      <label className="field-label">{field.label}</label>
      <select
        className={`select-field ${errors[field.id] ? "input-error" : ""}`}
        {...register(field.id, {
          required: field.required ? `Please select an option` : false,
        })}
      >
        <option value="">Select</option>
        {field?.options?.map((option: IOption) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="error-wrapper">
        {errors[field.id] && (
          <span className="error">{errors[field.id].message}</span>
        )}
      </div>
    </div>
  );
};

export default SelectField;

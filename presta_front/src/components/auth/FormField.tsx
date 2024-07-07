// ! (2) react form hook + zod - création du champs
import { FormFieldProps } from "@/models/formType/SignUpType";

const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
  options,
  icon,
}) => (
  <>
    {type === "select" ? (
      <select className="select select-bordered w-full" {...register(name)}>
        {options?.map((option, index) => (
          <option key={index} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    ) : (
      <label className="input input-bordered flex items-center gap-2">
        {icon}
        <input
          type={type}
          className="grow"
          placeholder={placeholder}
          {...register(name, { valueAsNumber })}
        />
      </label>
    )}
    {error && <span className="error-message">{error.message}</span>}
  </>
);
export default FormField;

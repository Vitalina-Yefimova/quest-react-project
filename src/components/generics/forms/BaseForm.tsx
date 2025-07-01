import { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../generics/button/Button";
import { Link } from "react-router-dom";

interface Field {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}

interface BaseFormProps<T extends FieldValues> {
  fields: Field[];
  schema: import("zod").ZodSchema<T>;
  submitText?: string;
  onSubmit: (data: T) => Promise<void>;
}

export default function BaseForm<T extends FieldValues>({
  fields,
  schema,
  submitText = "Submit",
  onSubmit,
}: BaseFormProps<T>) {
  const { register, handleSubmit } = useForm<T>({
    resolver: zodResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const internalSubmit = async (data: T) => {
    if (!isChecked) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      await onSubmit(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Something went wrong.");
      }
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(internalSubmit)} className="space-y-2">
      {fields.map(({ name, label, type = "text", placeholder }) => (
        <div key={name}>
          <label className="text-[#E5E5E5] text-[15px] font-medium leading-[150%] font-variant-numeric">
            {label}
          </label>
          <input
            {...register(name as import("react-hook-form").Path<T>)}
            type={type}
            placeholder={placeholder ?? label}
            className="mt-1 py-3 pl-6 rounded-[3px] border border-white text-[#E5E5E5] text-sm font-medium leading-[144%] w-[400px] h-[53px]"
          />
          {errorMessage && (
            <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
          )}
        </div>
      ))}

      <Button
        type="submit"
        className={`w-[219px] h-[47px] p-3 mt-8 rounded-[47.32px] font-extrabold text-sm leading-[0.42px] mb-6 mx-auto block cursor-none ${
          isChecked ? "bg-[#F28A0F] text-white" : "bg-[#B8B8B8] text-white"
        }`}
      >
        {isLoading ? "Submitting..." : submitText}
      </Button>

      <div className="flex items-start space-x-2">
        <input
          type="checkbox"
          id="terms"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          className="w-[16px] h-[16px] cursor-pointer accent-[#F2890F]"
        />
        <label
          htmlFor="terms"
          className="text-[#E5E5E5] text-sm font-medium leading-[144%]"
        >
          I agree with the{" "}
          <Link to="/privacy-policy" className="text-[#E5E5E5] underline">
            personal data processing policy
          </Link>{" "}
          and{" "}
          <Link to="/user-agreement" className="text-[#E5E5E5] underline">
            user agreement
          </Link>
        </label>
      </div>
    </form>
  );
}

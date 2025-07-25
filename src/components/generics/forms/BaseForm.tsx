import { useEffect, useState } from "react";
import type { JSX } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../generics/button/Button";
import { Link } from "react-router-dom";

interface Field {
  name: string;
  label: string;
  type?: string;
  defaultValue?: string;
  showVerifyButton?: boolean;
  onVerifyClick?: () => void;
  isVerifying?: boolean;
}

interface BaseFormProps<T extends FieldValues> {
  fields: Field[];
  schema: import("zod").ZodSchema<T>;
  submitText?: string;
  onSubmit: (data: T) => Promise<void>;
  defaultValues?: Partial<T>;
  isSuccess?: boolean;
  successMessage?: string;
  resetOnSuccess?: boolean;
}

export default function BaseForm<T extends FieldValues>({
  fields,
  schema,
  submitText = "Submit",
  onSubmit,
  defaultValues = {},
  isSuccess = false,
  successMessage,
  resetOnSuccess,
}: BaseFormProps<T>): JSX.Element {
  const { register, handleSubmit, watch, setValue, reset } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as import("react-hook-form").DefaultValues<T>,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});

  useEffect(() => {
    for (const key in defaultValues) {
      setValue(
        key as string as import("react-hook-form").Path<T>,
        defaultValues[key]!
      );
    }
  }, [defaultValues, setValue]);

  useEffect(() => {
    if (resetOnSuccess && isSuccess) {
      const currentChecked = isChecked;
      setIsChecked(currentChecked);
      reset();
    }
  }, [isSuccess, resetOnSuccess, reset, isChecked]);

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
    <form
      onSubmit={handleSubmit(internalSubmit)}
      className="space-y-4 w-full max-w-md mx-auto"
    >
      {fields.map(
        ({
          name,
          label,
          type = "text",
          showVerifyButton,
          onVerifyClick,
          isVerifying,
        }) => {
          const value = watch(name as import("react-hook-form").Path<T>);
          const isFilled = value?.toString().length > 0;

          return (
            <div key={name} className="relative w-full h-[40px]">
              <input
                {...register(name as import("react-hook-form").Path<T>)}
                type={showPassword[name] ? "text" : type}
                id={name}
                className="peer w-full h-full px-4 py-3 border border-white rounded-[3px] bg-transparent text-[#E5E5E5] text-base placeholder-transparent"
              />
              <label
                htmlFor={name}
                className={`absolute left-4 text-[#E5E5E5] text-sm transition-all duration-150 pointer-events-none
                ${
                  isFilled
                    ? "-top-2 text-xs bg-[#1E1E1E] rounded-xs px-1"
                    : "top-1/2 -translate-y-1/2"
                }
                peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-[#1E1E1E] peer-focus:px-1 peer-focus:translate-y-0`}
              >
                {label}
              </label>

              {type === "password" && (
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      [name]: !prev[name],
                    }))
                  }
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-sm"
                >
                  {showPassword[name] ? "🙈" : "👁️"}
                </button>
              )}

              {showVerifyButton && (
                <button
                  type="button"
                  onClick={onVerifyClick}
                  className="absolute -bottom-6 right-0 text-sm text-[#F28A0F] underline"
                  disabled={isVerifying}
                >
                  {isVerifying ? "Sending..." : "Verify email"}
                </button>
              )}
            </div>
          );
        }
      )}

      <div className="flex items-start space-x-2 pt-3">
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
          <Link to="/privacy-policy" className="underline">
            personal data processing policy
          </Link>{" "}
          and{" "}
          <Link to="/user-agreement" className="underline">
            user agreement
          </Link>
        </label>
      </div>

      <Button
        type="submit"
        className={`w-[219px] h-[47px] p-3 mt-5 rounded-[47px] font-extrabold text-sm leading-[0.42px] mx-auto block ${
          isChecked && !isSuccess
            ? "bg-[#F28A0F] text-white cursor-none"
            : "bg-[#B8B8B8] text-white cursor-none"
        }`}
        disabled={!isChecked || isSuccess}
      >
        {isLoading ? "Submitting..." : submitText}
      </Button>

      {errorMessage && (
        <p className="text-red-500 text-xs mt-2 text-center">{errorMessage}</p>
      )}
      {successMessage && isSuccess && (
        <p className="text-green-500 text-xs mt-2 text-center">
          {successMessage}
        </p>
      )}
    </form>
  );
}

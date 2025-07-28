import { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createOrder } from "../../../utils/ordersApi";
import { useQuestStore } from "../../../store/useQuestStore";
import Button from "../../generics/button/Button";
import CalendarIcon from "../../icons/CalendarIcon";
import React from "react";

type DateInputProps = {
  value?: string;
  onClick?: () => void;
  placeholder?: string;
};

const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  ({ value, onClick, placeholder }, ref) => (
    <div className="relative w-full">
      <input
        value={value}
        onClick={onClick}
        placeholder={placeholder}
        readOnly
        ref={ref}
        className="w-full h-[45px] pl-4 pr-12 border border-white rounded-[3px] bg-transparent text-[#E5E5E5] text-base placeholder:text-[#A5A5A5] focus:outline-none cursor-pointer"
      />
      <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white pointer-events-none" />
    </div>
  )
);

export default function BookingForm({
  onSubmitSuccess,
}: {
  onSubmitSuccess: () => void;
}) {
  const { id: questId } = useParams();
  const quest = useQuestStore((state) => state.getQuestById(questId || ""));
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const minPlayers = quest?.players?.min ?? 1;
  const maxPlayers = quest?.players?.max ?? 8;

  const schema = z.object({
    date: z.string().min(1, "Date is required"),
    participants: z.coerce
      .number()
      .min(minPlayers, `Minimum ${minPlayers} participants`)
      .max(maxPlayers, `Maximum ${maxPlayers} participants`),
  });

  const today = new Date();
  const minBookingDate = new Date(today);
  minBookingDate.setDate(today.getDate() + 7);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setError(null);
    try {
      if (!questId) throw new Error("Missing quest ID");
      await createOrder({
        questId,
        date: new Date(data.date).toISOString(),
        participants: data.participants,
      });
      setIsSuccess(true);
      setTimeout(() => {
        onSubmitSuccess();
        reset();
      }, 1000);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Failed to book the quest.");
    }
  };

  return (
    <div>
      <h2 className="text-white text-2xl font-bold text-center mb-6">
        Book this Quest
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
        <div className="w-full">
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <DatePicker
                selected={field.value ? new Date(field.value) : null}
                onChange={(date: Date | null) =>
                  field.onChange(date ? date.toISOString().split("T")[0] : "")
                }
                minDate={minBookingDate}
                dateFormat="MM/dd/yyyy"
                placeholderText="Select Date"
                calendarClassName="bg-black text-white"
                customInput={<DateInput />}
              />
            )}
          />
          {errors.date && (
            <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
          )}
        </div>

        <div className="w-full">
          <input
            {...register("participants")}
            type="number"
            placeholder={`Number of Participants (Allowed: ${minPlayers}-${maxPlayers})`}
            className="w-full h-[45px] px-4 border border-white rounded-[3px] bg-transparent text-[#E5E5E5] text-base placeholder:text-[#A5A5A5] focus:outline-none"
          />
          {errors.participants && (
            <p className="text-red-500 text-xs mt-1">
              {errors.participants.message}
            </p>
          )}
        </div>

        <div className="flex justify-center mt-5">
          <Button
            type="submit"
            className="w-[200px] h-[45px] rounded-full bg-[#F28A0F] text-white font-extrabold text-sm cursor-none"
          >
            {isSuccess ? "Booked!" : "Book Now"}
          </Button>
        </div>

        {error && <p className="text-red-500 text-center text-sm">{error}</p>}
      </form>
    </div>
  );
}

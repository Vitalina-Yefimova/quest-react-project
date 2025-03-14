import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Button from "../generics/button/Button";

interface BookingFormProps {
  onSubmitSuccess: () => void;
}

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^\+?\d{10,15}$/, "Enter a valid phone number"),
  participants: z
    .string()
    .regex(/^\d+$/, "Must be a number")
    .transform((val) => parseInt(val, 10)),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function BookingForm({ onSubmitSuccess }: BookingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const onSubmit = async (data: BookingFormData) => {
    if (!isChecked) return;

    setIsLoading(true);
    try {
      const response = await fetch("https://escape-room.com/api/bookings", {
        // типа аля-придуманный
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("Booking request submitted successfully");
        onSubmitSuccess();
      } else {
        console.log("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.log("Error submitting booking request.");
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <label className="text-[#E5E5E5] text-[15px] font-medium leading-[150%] font-variant-numeric">
          Your Name
        </label>
        <input
          {...register("name")}
          placeholder="Name"
          className="mt-3 py-4 pl-6 rounded-[3px] border-solid border-white border-[1px] text-[#E5E5E5] text-sm font-medium leading-[144%] w-[400px] h-[53px]"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label className="text-[#E5E5E5] text-[15px] font-medium leading-[150%] font-variant-numeric">
          Contact Phone
        </label>
        <input
          {...register("phone")}
          placeholder="Phone"
          className="mt-3 py-4 pl-6 rounded-[3px] border-solid border-white border-[1px] text-[#E5E5E5] text-sm font-medium leading-[144%] w-[400px] h-[53px]"
        />
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
        )}
      </div>
      <div className="pb-[13px]">
        <label className="text-[#E5E5E5] text-[15px] font-medium leading-[150%] font-variant-numeric">
          Number of Participants
        </label>
        <input
          {...register("participants")}
          placeholder="Number of Participants"
          className="mt-3 py-4 pl-6 rounded-[3px] border-solid border-white border-[1px] text-[#E5E5E5] text-sm font-medium leading-[144%] w-[400px] h-[53px]"
        />
        {errors.participants && (
          <p className="text-red-500 text-xs mt-1">
            {errors.participants.message}
          </p>
        )}
      </div>
      <Button
        className={`w-[219px] h-[47px] p-3 rounded-[47.32px] font-extrabold text-sm leading-[0.42px] mb-6 mx-auto block cursor-none ${
          isChecked ? "bg-[#F28A0F] text-white" : "bg-[#B8B8B8] text-white"
        }`}
        onClick={handleSubmit(onSubmit)}
      >
        {isLoading ? "Submitting..." : "Submit Request"}
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

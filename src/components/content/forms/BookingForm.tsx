import { z } from "zod";
import BaseForm from "../../generics/forms/BaseForm";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().regex(/^\+?\d{10,15}$/),
  participants: z.number().int().min(1),
});

export default function BookingForm({
  onSubmitSuccess,
}: {
  onSubmitSuccess: () => void;
}) {
  return (
    <BaseForm
      schema={schema}
      endpoint="https://escape-room.com/api/bookings"
      submitText="Submit Request"
      onSuccess={onSubmitSuccess}
      fields={[
        { name: "name", label: "Your Name" },
        { name: "email", label: "Contact Email" },
        { name: "phone", label: "Contact Phone" },
        { name: "participants", label: "Number of Participants" },
      ]}
    />
  );
}

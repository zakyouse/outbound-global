import { Button } from "@heroui/button";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { Input } from "@heroui/input";
import axios from "axios";

import { useConsultation } from "@/contexts/consultationContext";

export default function ConsultationForm() {
  const { setConsultation } = useConsultation();

  // FORM STATE
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [cv, setCv] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Disable Sundays
  const isSunday = (date: Date) => date.getDay() === 0;

  const availableTimes = ["07:00", "08:00", "09:00", "10:00", "11:00"];

  async function submitConsultation(e: React.FormEvent) {
    e.preventDefault();

    if (!selectedDate) {
      alert("Please select a date");

      return;
    }

    const formData = new FormData();

    formData.append("full_name", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("country", country);
    formData.append("preferred_date", selectedDate.toISOString().split("T")[0]);
    formData.append("preferred_time", selectedTime);
    formData.append("service_type", serviceType);

    if (cv) {
      formData.append("cv", cv);
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:3000/consultation.php",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );
console.log(response)
      alert(response.data.message);
      setConsultation(false);
    } catch (error: any) {
      alert(error?.response?.data?.message || "Failed to submit consultation");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex items-center justify-center bg-white/10 backdrop-blur-sm fixed inset-0 z-50">
      <div className="max-w-3xl w-full mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-mygreen">
          Book a Consultation
        </h2>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={submitConsultation}
        >
          <Input
            isRequired
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <Input
            isRequired
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            isRequired
            label="Telephone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <Input
            isRequired
            label="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4 col-span-2">
            <div>
              <label className="text-sm font-medium" htmlFor="preferred_date">
                Preferred Date
              </label>
              <DatePicker
                className="mt-2 w-full rounded-lg px-4 py-3 bg-black/5 outline-none"
                filterDate={(date) => !isSunday(date)}
                id="preferred_date"
                minDate={new Date()}
                placeholderText="Select date"
                selected={selectedDate}
                onChange={(date: Date | null) => setSelectedDate(date)}
                onKeyDown={(e) => e.preventDefault()}
              />
            </div>

            <div>
              <label className="text-sm font-medium" htmlFor="preferred_time">
                Preferred Time
              </label>
              <select
                required
                className="mt-2 w-full rounded-lg px-4 py-3 bg-black/5 outline-none"
                id="preferred_time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                <option value="">Select time</option>
                {availableTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Input
            isRequired
            label="CV Upload"
            type="file"
            onChange={(e) => setCv(e.target.files?.[0] || null)}
          />

          <div>
            <label className="text-sm font-medium" htmlFor="service_type">
              Service Type
            </label>
            <select
              required
              className="mt-2 w-full rounded-lg px-4 py-3 bg-black/5 outline-none"
              id="service_type"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
            >
              <option value="">Select a service</option>
              <option>Consultation Session</option>
              <option>EB-1A Petition Support</option>
              <option>EB-2 NIW Support</option>
              <option>Petition Review</option>
              <option>Adjustment of Status Support</option>
            </select>
          </div>

          <button
            className="col-span-2 bg-secondary text-white py-3 rounded-full hover:scale-105 transition disabled:opacity-50"
            disabled={loading}
            type="submit"
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>

          <Button
            className="col-span-2"
            variant="flat"
            onPress={() => setConsultation(false)}
          >
            Close
          </Button>
        </form>
      </div>
    </section>
  );
}

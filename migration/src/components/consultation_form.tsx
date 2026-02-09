import { Button } from "@heroui/button";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { Input } from "@heroui/input";

import { useConsultation } from "@/contexts/consultationContext";
export default function ConsultationForm() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const { setConsultation } = useConsultation();
  // Disable Sundays
  const isSunday = (date: Date) => date.getDay() === 0;

  // Allowed times
  const availableTimes = ["07:00", "08:00", "09:00", "10:00", "11:00"];

  return (
    <section className="flex items-center justify-center bg-white/10 backdrop-blur-sm fixed top-0 left-0 z-99 min-h-screen w-full py-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-mygreen">
          Book a Consultation
        </h2>

        <form className="flex flex-col md:grid grid-cols-2 gap-2 md:gap-6">
          {/* Name */}
          <Input
            isRequired
            className="max-w-xs"
            defaultValue=""
            label="Full Name"
            type="text"
          />

          {/* Email */}
          <Input
            isRequired
            className="max-w-xs"
            defaultValue=""
            label="Email"
            type="email"
          />

          {/* Phone */}
          <Input
            isRequired
            className="max-w-xs"
            defaultValue=""
            label="Telephone"
            type="tel"
          />

          <Input
            isRequired
            className="max-w-xs"
            defaultValue=""
            label="Country"
            type="text"
          />
          <div className="grid grid-cols-2 gap-4 col-span-2">
            {/* Date Picker */}
          <div className="flex flex-col ">
            <label className="text-sm font-medium" htmlFor="date">
              Preferred Date
            </label>
            <DatePicker
              className="mt-2 w-full rounded-lg  px-4 py-3 focus:ring-2 text-black/50  bg-black/5 outline-none"
              dateFormat="MMMM d, yyyy"
              filterDate={(date) => !isSunday(date)}
              minDate={new Date()}
              placeholderText="Select a date"
              selected={selectedDate}
              onChange={(date: Date | null) => setSelectedDate(date)}
              onKeyDown={(e) => e.preventDefault()} // disables typing
            />
          </div>

          {/* Time Selector */}
          <div className=" ">
            <label className="text-sm font-medium" htmlFor="time">
              Preferred Time
            </label>
            <select
              required
              className="mt-2 w-full rounded-lg text-black/50  bg-black/5 px-4 py-3 focus:ring-2 outline-none"
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
          

          {/* CV Upload */}
          <Input
            isRequired
            className="max-w-xs"
            defaultValue=""
            label="CV Upload"
            type="file"
          />

          {/* Service Type */}
          <div>
            <label className="text-sm font-medium" htmlFor="serviceType">
              Service Type
            </label>
            <select
              required
              className="mt-2 w-full rounded-lg  px-4 py-3 focus:ring-2 text-black/50  bg-black/5 outline-none"
            >
              <option value="">Select a service</option>
              <option>Consultation Session</option>
              <option>EB-1A Petition Support</option>
              <option>EB-2 NIW Support</option>
              <option>Petition Review</option>
              <option>Adjustment of Status Support</option>
            </select>
          </div>

          {/* Submit */}
          <button
            className="mt-4 cursor-pointer bg-secondary text-white py-3 rounded-full hover:scale-105 transition-all transition-duration-300 col-span-2 transition-ease-in-out"
            type="submit"
          >
            Submit Request
          </button>
          <Button
            className="relative md:absolute top-4 right-4 black/5 md:black/20 w-full col-span-2 h-12 ml-4 md:mt-2 md:w-24 rounded-full"
            startContent={<span className="text-sm md:text-lg">✕</span>}
            variant="solid"
            onPress={() => setConsultation(false)}
          >
            <span className="">Close</span>
          </Button>
        </form>
      </div>
    </section>
  );
}

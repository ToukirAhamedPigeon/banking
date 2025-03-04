import React, { useEffect, useRef } from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import Flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { authFormSchema } from '@/lib/utils';

type FormSchemaType = z.infer<ReturnType<typeof authFormSchema>>;

interface CustomFlatpickrProps {
  control: Control<FormSchemaType>;
  name: FieldPath<FormSchemaType>;
  label: string;
  placeholder: string;
  defaultDate?: string | null; // Can be a date string or null
  className?: string;
}

const CustomFlatpickr = ({ control, name, label, placeholder, defaultDate = null, className = "" }: CustomFlatpickrProps) => {
  const datepickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (datepickerRef.current) {
      Flatpickr(datepickerRef.current, {
        dateFormat: "Y-m-d",
        defaultDate: defaultDate || new Date(), // If null, use current date
      });
    }
  }, []);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label">{label}</FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                id={name}
                placeholder={placeholder}
                className={`input-class min-w-full ${className}`}
                {...field}
                ref={datepickerRef}
              />
            </FormControl>
            <FormMessage className="text-red-500" />
          </div>
        </div>
      )}
    />
  );
};

export default CustomFlatpickr;

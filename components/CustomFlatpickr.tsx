import React, { useEffect, useRef } from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import Flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { authFormSchema } from "@/lib/utils";

type FormSchemaType = z.infer<ReturnType<typeof authFormSchema>>;

interface CustomFlatpickrProps {
  control: Control<FormSchemaType>;
  name: FieldPath<FormSchemaType>;
  label: string;
  placeholder: string;
  defaultDate?: string | null;
  className?: string;
}

const CustomFlatpickr = ({
  control,
  name,
  label,
  placeholder,
  defaultDate = null,
  className = "",
}: CustomFlatpickrProps) => {
  const datepickerRef = useRef<HTMLInputElement>(null);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        useEffect(() => {
          if (datepickerRef.current) {
            Flatpickr(datepickerRef.current, {
              dateFormat: "Y-m-d",
              defaultDate: field.value || defaultDate || new Date(),
              onChange: (selectedDates) => {
                if (selectedDates.length > 0) {
                  const selectedDateStr = selectedDates[0].toISOString().split("T")[0];
                  field.onChange(selectedDateStr);
                }
              },
            });
          }
        }, [field, defaultDate]);

        return (
          <div className="form-item">
            <FormLabel className="form-label dark:text-gray-300">{label}</FormLabel>
            <div className="flex w-full flex-col">
              <FormControl>
                <Input
                  id={name}
                  placeholder={placeholder}
                  className={`input-class min-w-full dark:text-gray-300 dark:border-blue-900 ${className}`}
                  value={field.value || ""}
                  onChange={() => {}}
                  ref={datepickerRef}
                />
              </FormControl>
              {fieldState.error && (
                <FormMessage className="text-red-500">{fieldState.error.message}</FormMessage>
              )}
            </div>
          </div>
        );
      }}
    />
  );
};

export default CustomFlatpickr;

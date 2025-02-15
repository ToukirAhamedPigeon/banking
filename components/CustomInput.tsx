import React from 'react'
import {
    FormControl,
    FormField,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control, FieldPath } from "react-hook-form"
import { z } from "zod"
import { authFormSchema } from '@/lib/utils'

// const formSchema =authFormSchema('sign-up');
type FormSchemaType = z.infer<ReturnType<typeof authFormSchema>>;
//   interface CustomInput{
//     control: Control<z.infer<typeof formSchema>>,
//     type: string,
//     name: FieldPath<z.infer<typeof formSchema>>,
//     label: string,
//     placeholder: string
//  }
interface CustomInput {
  control: Control<FormSchemaType>;
  type: string;
  name: FieldPath<FormSchemaType>;
  label: string;
  placeholder: string;
  className?: string;
}
const CustomInput = ({control, type, name, label, placeholder, className=''}:CustomInput) => {
  return (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <div className='form-item'>
                <FormLabel className='form-label'>{label}</FormLabel>
                <div className="flex w-full flex-col">
                    <FormControl>
                        <Input 
                        type={type}
                        id={name}
                        placeholder={placeholder}
                        className={'input-class min-w-full '+className}
                        {...field}
                        />
                    </FormControl>
                    <FormMessage className='text-red-500' />
                </div>
            </div>
        )}
        />
  )
}

export default CustomInput

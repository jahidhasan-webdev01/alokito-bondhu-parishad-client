"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useState } from "react";


export function DateInput({
  label,
  name,
  required,
}: {
  label: string;
  name: string;
  required?: boolean;
}) {


  const [date, setDate] =
    useState<Date | null>(null);



  return (

    <div>

      <label
        className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-brand-green
                "
      >

        {label}

        {
          required &&
          <span className="text-red-500">
            *
          </span>
        }

      </label>



      <DatePicker

        selected={date}

        onChange={(value: Date | null | [Date | null, Date | null]) => {
          if (Array.isArray(value)) {
            setDate(value[0]);
          } else {
            setDate(value);
          }
        }}

        dateFormat="dd-MM-yyyy"

        placeholderText="DD-MM-YYYY"

        required={required}

        name={name}

        wrapperClassName="w-full"

        className="
                    w-full
                    rounded-lg
                    border
                    border-brand-gold/30
                    bg-transparent
                    px-4
                    py-3
                    outline-none
                    transition
                    focus:border-brand-green
                "

      />


      {/* Send ISO date to backend */}

      <input

        type="hidden"

        name={name}

        value={
          date
            ?
            date.toISOString()
            :
            ""
        }

      />


    </div>

  );

}

export function DateInputOnChange({
  label,
  name,
  value,
  onChange,
  required,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {


  const selectedDate = value
    ? new Date(value)
    : null;



  const handleChange = (date: Date | null) => {

    if (!date) return;


    const formatted =
      date.toISOString().split("T")[0];


    const event = {
      target: {
        name,
        value: formatted,
      },
    } as React.ChangeEvent<HTMLInputElement>;



    onChange(event);

  };



  return (

    <div>

      <label
        className="
          mb-2
          block
          text-sm
          font-medium
          text-brand-green
        "
      >

        {label}

        {
          required &&
          <span className="text-red-500">
            *
          </span>
        }

      </label>



      <DatePicker

        selected={selectedDate}

        onChange={handleChange}

        dateFormat="dd-MM-yyyy"

        placeholderText="DD-MM-YYYY"

        name={name}

        required={required}

        wrapperClassName="w-full"

        className="
          w-full
          rounded-lg
          border
          border-brand-gold/30
          bg-transparent
          px-4
          py-3
          outline-none
          transition
          focus:border-brand-green
        "

      />

    </div>

  );
}
import "./Calendar.css";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";

const Calendar = ({ selectedDate, onDateChange }) => {
  // const [value, setValue] = useState(dayjs(new Date()));

  // console.log(value);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        orientation="portrait"
        value={dayjs(selectedDate)}
        disableFuture
        onChange={(newValue) => onDateChange(newValue.toDate())}
        renderInput={(params) => <TextField {...params} />}
        sx={{
          ".MuiPickerStaticWrapper-root": {
            width: "100%",
            height: "100%",
          },
          ".MuiCalendarPicker-root": {
            width: "100%",
            height: "100%",
            transform: "scale(0.8)", // Adjust this scale as needed
            transformOrigin: "top left",
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default Calendar;

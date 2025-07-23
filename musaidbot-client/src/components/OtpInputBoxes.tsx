import  { useRef, useEffect } from "react";
import { Box, TextField } from "@mui/material";

interface OtpInputBoxesProps {
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}

export default function OtpInputBoxes({ value, onChange, disabled = false }: OtpInputBoxesProps) {
  const firstInputRef = useRef<HTMLInputElement>(null);

  // فوكس تلقائي عند أول تحميل
  useEffect(() => {
    if (firstInputRef.current && !disabled) {
      firstInputRef.current.focus();
    }
  }, [disabled]);

  const inputs = [];
  for (let i = 0; i < 6; i++) {
    inputs.push(
      <TextField
        key={i}
        value={value[i] || ""}
        inputRef={i === 0 ? firstInputRef : undefined}
        inputProps={{
          maxLength: 1,
          style: {
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: "bold",
            width: 48,
            height: 56,
            borderRadius: 10,
            background: "#fff",
            boxShadow: "0 2px 8px rgba(80,46,145,0.10)",
          },
          inputMode: "numeric",
          pattern: "[0-9]*",
        }}
        onChange={(e) => {
          const newValue = value.split("");
          newValue[i] = e.target.value.replace(/[^0-9]/g, "");
          onChange(newValue.join(""));
          if (e.target.value && e.target.nextElementSibling) {
            (e.target.nextElementSibling as HTMLInputElement).focus();
          }
        }}
        onFocus={(e) => e.target.select()}
        disabled={disabled}
        sx={{
          mx: 0.6,
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: "#A498CB",
            borderWidth: 2,
          },
        }}
      />
    );
  }
  return (
    <Box dir="ltr" sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
      {inputs}
    </Box>
  );
}

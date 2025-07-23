import { useState } from "react";
import { Box, TextField, Button, Stack, IconButton, Typography, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import type { MerchantSectionProps } from "../../types/merchant";
import type { Address } from "../../types/shared";

export default function AddressForm({ initialData, onSave, loading }: MerchantSectionProps) {
  // استخدم مصفوفة العناوين (addresses) من البيانات الأولية
  const [addresses, setAddresses] = useState<Address[]>(
    initialData.addresses?.length
      ? initialData.addresses
      : [{ street: "", city: "", state: "", postalCode: "", country: "" }]
  );

  // تحديث حقل واحد في عنوان واحد
  const handleChange = (idx: number, key: keyof Address, value: string) => {
    setAddresses(addrs =>
      addrs.map((addr, i) =>
        i === idx ? { ...addr, [key]: value } : addr
      )
    );
  };

  // إضافة عنوان جديد فارغ
  const handleAdd = () => {
    setAddresses(addrs => [...addrs, { street: "", city: "", state: "", postalCode: "", country: "" }]);
  };

  // حذف عنوان
  const handleDelete = (idx: number) => {
    setAddresses(addrs => addrs.filter((_, i) => i !== idx));
  };

  // الحفظ (يرسل المصفوفة بالكامل)
  const handleSave = () => onSave({ addresses });

  return (
    <Box>
      <Typography variant="h6" mb={2}>عناوين المتجر</Typography>
      <Stack spacing={4}>
        {addresses.map((address, idx) => (
          <Box key={idx} sx={{ border: "1px solid #ececec", borderRadius: 2, p: 2, position: "relative", bgcolor: "#fafbfc" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography fontWeight="bold">عنوان {idx + 1}</Typography>
              {addresses.length > 1 && (
                <IconButton color="error" onClick={() => handleDelete(idx)} size="small">
                  <DeleteIcon />
                </IconButton>
              )}
            </Stack>
            <Stack spacing={2}>
              <TextField label="الشارع" value={address.street} onChange={e => handleChange(idx, "street", e.target.value)} fullWidth />
              <TextField label="المدينة" value={address.city} onChange={e => handleChange(idx, "city", e.target.value)} fullWidth />
              <TextField label="المنطقة/الولاية" value={address.state} onChange={e => handleChange(idx, "state", e.target.value)} fullWidth />
              <TextField label="الرمز البريدي" value={address.postalCode} onChange={e => handleChange(idx, "postalCode", e.target.value)} fullWidth />
              <TextField label="الدولة" value={address.country} onChange={e => handleChange(idx, "country", e.target.value)} fullWidth />
            </Stack>
          </Box>
        ))}
      </Stack>
      <Button
        startIcon={<AddLocationAltIcon />}
        variant="outlined"
        onClick={handleAdd}
        sx={{ mt: 3, mb: 2 }}
        disabled={loading}
      >
        إضافة عنوان جديد
      </Button>
      <Divider sx={{ my: 2 }} />
      <Button
        variant="contained"
        onClick={handleSave}
        disabled={loading}
        sx={{ minWidth: 140 }}
      >
        حفظ العناوين
      </Button>
    </Box>
  );
}

import { useEffect, useState } from "react";
import { Box, Paper, Typography, CircularProgress, Snackbar, Alert } from "@mui/material";
import { getMerchantInfo, updateMerchantInfo } from "../../api/merchantApi";
import type { MerchantInfo, Banner } from "../../types/merchant";
import { useAuth } from "../../context/AuthContext";
import BannersEditor from "../../components/store/BannersEditor";

export default function BannersManagementPage() {
  const { user } = useAuth();
  const merchantId = user?.merchantId ?? "";
  const [merchant, setMerchant] = useState<MerchantInfo | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({ open: false, message: "", severity: "success" });

  useEffect(() => {
    if (!merchantId) return;
    getMerchantInfo(merchantId).then(setMerchant);
  }, [merchantId]);

  const handleSaveBanners = async (banners: Banner[]) => {
    if (!merchantId) return;
    setSaveLoading(true);
    try {
      await updateMerchantInfo(merchantId, { banners });
      setMerchant((prev) => prev ? { ...prev, banners } : prev);
      setSnackbar({ open: true, message: "تم حفظ البانرات بنجاح!", severity: "success" });
    } catch  {
      setSnackbar({ open: true, message: "حدث خطأ أثناء الحفظ", severity: "error" });
    } finally {
      setSaveLoading(false);
    }
  };

  if (!merchant) return <Box display="flex" justifyContent="center" mt={8}><CircularProgress /></Box>;

  return (
    <Paper sx={{ p: 4, maxWidth: 900, mx: "auto", my: 6, borderRadius: 3 }}>
      <Typography variant="h5" mb={3} fontWeight="bold">
        إدارة البانرات الإعلانية
      </Typography>
      <Typography color="text.secondary" mb={4}>
        يمكنك هنا إضافة وتعديل البانرات التي تظهر في أعلى المتجر.
      </Typography>
      <BannersEditor
        banners={merchant.banners || []}
        onChange={handleSaveBanners}
        loading={saveLoading}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Paper>
  );
}

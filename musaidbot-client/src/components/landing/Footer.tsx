import { Box, Typography, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box sx={{ py: 6, px: 3, backgroundColor: '#f1f9ff', textAlign: 'center' }}>
      <Typography variant="body1" sx={{ mb: 1 }}>
        MusaidBot – منصة ذكية لخدمة عملائك تلقائيًا بكل احترافية
      </Typography>
      <Typography variant="body2" color="text.secondary">
        <Link href="#">سياسة الخصوصية</Link> | <Link href="#">تواصل معنا</Link>
      </Typography>
      <Typography variant="caption" color="text.disabled" display="block" sx={{ mt: 2 }}>
        © {new Date().getFullYear()} MusaidBot. جميع الحقوق محفوظة.
      </Typography>
    </Box>
  );
}

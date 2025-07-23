import {
  Box,
  Typography,
  Container,
  Link,
  IconButton,
  Divider,
  useTheme,
} from "@mui/material";
import {
  Facebook, Twitter, Instagram, LinkedIn, YouTube,
  Phone, Email, LocationOn, AccessTime,
} from "@mui/icons-material";
import type { MerchantInfo } from "../../types/merchant";
import type { Category } from "../../types/Category";
import React from "react";

// تعريف الأيقونات
const socialIcons = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: LinkedIn,
  youtube: YouTube,
};

export function Footer({ merchant, categories }: { merchant: MerchantInfo; categories: Category[] }) {
  const theme = useTheme();

  // ساعات الدوام كمصفوفة نصوص
  const workingHoursStr =
    merchant.workingHours?.length > 0
      ? merchant.workingHours.map(h => `${h.day}: ${h.openTime} - ${h.closeTime}`).join(" | ")
      : "";

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.primary.dark,
        color: "white",
        py: 6,
        position: "relative",
        overflow: "hidden",
        mt: "auto",
      }}
    >
      {/* ... (الزخارف كما هي) ... */}
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 4, md: 0 },
            justifyContent: "space-between",
            alignItems: "flex-start",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Store Info */}
          <Box flex={2} mb={{ xs: 4, md: 0 }}>
            <Box mb={3} display="flex" alignItems="center">
              {merchant.logoUrl && (
                <img src={merchant.logoUrl} alt={merchant.name} width={40} style={{ borderRadius: 20, marginRight: 10 }} />
              )}
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}
              >
                {merchant.name}
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
              {merchant.businessDescription || "متجر إلكتروني متخصص"}
            </Typography>

            {/* روابط السوشيال ميديا */}
            <Box sx={{ display: "flex", gap: 1.5, mt: 3 }}>
              {merchant.socialLinks &&
                Object.entries(merchant.socialLinks).map(([platform, url]) =>
                  url ? (
                    <IconButton
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener"
                      sx={{
                        backgroundColor: "rgba(255,255,255,0.1)",
                        color: "white",
                        "&:hover": { backgroundColor: theme.palette.secondary.main },
                      }}
                    >
                     {socialIcons[platform as keyof typeof socialIcons] &&
  React.createElement(socialIcons[platform as keyof typeof socialIcons])
}
                    </IconButton>
                  ) : null
                )}
            </Box>
          </Box>

          {/* Quick Links */}
          <Box flex={1} mb={{ xs: 4, md: 0 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3, position: "relative" }}>
              روابط سريعة
              <Divider sx={{ width: "50px", height: "3px", backgroundColor: theme.palette.secondary.main, mt: 1 }} />
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Link href="/" color="inherit" sx={{ textDecoration: "none", opacity: 0.9, "&:hover": { opacity: 1 } }}>الصفحة الرئيسية</Link>
              <Link href="/store" color="inherit" sx={{ textDecoration: "none", opacity: 0.9, "&:hover": { opacity: 1 } }}>المتجر</Link>
              <Link href="/store/about" color="inherit" sx={{ textDecoration: "none", opacity: 0.9, "&:hover": { opacity: 1 } }}>من نحن</Link>
              {/* أضف روابط حقيقة حسب مشروعك */}
            </Box>
          </Box>

          {/* Categories */}
          <Box flex={1} mb={{ xs: 4, md: 0 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3, position: "relative" }}>
              التصنيفات
              <Divider sx={{ width: "50px", height: "3px", backgroundColor: theme.palette.secondary.main, mt: 1 }} />
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {categories.slice(0, 5).map(cat => (
                <Link
                  key={cat._id}
                  href={`/store/category/${cat._id}`}
                  color="inherit"
                  sx={{ textDecoration: "none", opacity: 0.9, "&:hover": { opacity: 1 } }}
                >
                  {cat.name}
                </Link>
              ))}
            </Box>
          </Box>

          {/* Contact Info */}
          <Box flex={2}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3, position: "relative" }}>
              معلومات التواصل
              <Divider sx={{ width: "50px", height: "3px", backgroundColor: theme.palette.secondary.main, mt: 1 }} />
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              {merchant.addresses?.length > 0 && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <LocationOn sx={{ color: theme.palette.secondary.main, fontSize: "1.8rem", mr: 2 }} />
                  <Typography variant="body1">
                    {merchant.addresses[0]?.street}, {merchant.addresses[0]?.city}, {merchant.addresses[0]?.country}
                  </Typography>
                </Box>
              )}
              {merchant.phone && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Phone sx={{ color: theme.palette.secondary.main, fontSize: "1.8rem", mr: 2 }} />
                  <Typography variant="body1">{merchant.phone}</Typography>
                </Box>
              )}
              {merchant.email && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Email sx={{ color: theme.palette.secondary.main, fontSize: "1.8rem", mr: 2 }} />
                  <Typography variant="body1">{merchant.email}</Typography>
                </Box>
              )}
              {workingHoursStr && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <AccessTime sx={{ color: theme.palette.secondary.main, fontSize: "1.8rem", mr: 2 }} />
                  <Typography variant="body1">{workingHoursStr}</Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        <Divider sx={{ my: 5, backgroundColor: "rgba(255,255,255,0.2)" }} />
        {/* Footer Bottom Row */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            textAlign: "center",
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © {new Date().getFullYear()} {merchant.name || "متجرك الإلكتروني"}. جميع الحقوق محفوظة.
          </Typography>
          {/* ... (روابط سياسات) ... */}
        </Box>
      </Container>
    </Box>
  );
}

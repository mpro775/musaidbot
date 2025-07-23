// src/components/ComparisonSection.tsx

import  { useEffect } from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Container,
} from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaCheckCircle, FaTimesCircle, FaArrowRight } from "react-icons/fa";

const comparisons = [
  {
    before: "تأخير في الردود",
    after: "ردود فورية عبر WhatsApp",
    icon: "⏱️",
  },
  {
    before: "إدارة يدوية للطلبات",
    after: "إدارة تلقائية ذكية",
    icon: "🤖",
  },
  {
    before: "لا توجد توصيات للعملاء",
    after: "اقتراح منتجات تلقائيًا",
    icon: "✨",
  },
  {
    before: "ردود غير موحدة",
    after: "ردود ذكية موحدة ومخصصة",
    icon: "📊",
  },
  {
    before: "بدون لوحة تحكم",
    after: "لوحة تحكم مخصصة لكل تاجر",
    icon: "📱",
  },
];

const itemVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      type: "spring",
      stiffness: 120,
      damping: 12,
    },
  }),
};

const arrowVariant = {
  hover: {
    x: [0, 12, 0],
    transition: { duration: 1, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function ComparisonSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return (
    <Box
      ref={ref}
      sx={{
        position: "relative",
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 3 },
        background: "linear-gradient(135deg, #f8f9ff 0%, #eef6ff 100%)",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-15%",
          left: "-15%",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle at center, rgba(208, 0, 0, 0.04), transparent 70%)",
          filter: "blur(120px)",
          zIndex: 0,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: "-15%",
          right: "-15%",
          width: "350px",
          height: "350px",
          background:
            "radial-gradient(circle at center, rgba(0, 127, 95, 0.04), transparent 70%)",
          filter: "blur(100px)",
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        {/* عنوان القسم */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h3"
            align="center"
            sx={{
              fontWeight: 800,
              color: "#1a237e",
              mb: { xs: 4, md: 6 },
              fontSize: { xs: "2rem", sm: "2.4rem", md: "2.8rem" },
              position: "relative",
              "&::after": {
                content: '""',
                display: "block",
                width: { xs: "80px", md: "100px" },
                height: "4px",
                background: "linear-gradient(90deg, #d00000, #007f5f)",
                margin: "16px auto 0",
                borderRadius: "2px",
              },
            }}
          >
            قبل{" "}
            <Box
              component="span"
              sx={{ color: "#d00000", fontStyle: "italic" }}
            >
              vs
            </Box>{" "}
            بعد{" "}
            <Box component="span" sx={{ color: "#007f5f" }}>
              MusaidBot
            </Box>
          </Typography>
        </motion.div>

        {/* الأعمدة */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 4, md: 6 },
            alignItems: "flex-start",
          }}
        >
          {/* عمود قبل MusaidBot */}
          <Box sx={{ flex: 1 }}>
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Typography
                variant="h4"
                align="center"
                sx={{
                  color: "#d00000",
                  mb: 4,
                  fontWeight: 700,
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  background: "rgba(208, 0, 0, 0.06)",
                  display: "inline-block",
                  mx: "auto",
                  fontSize: { xs: "1.5rem", md: "1.7rem" },
                }}
              >
                قبل MusaidBot
              </Typography>
            </motion.div>

            {comparisons.map((item, i) => (
              <motion.div
                key={`before-${i}`}
                custom={i}
                variants={itemVariant}
                initial="hidden"
                animate={controls}
              >
                <Box
                  sx={{
                    p: 3,
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    background: "rgba(255, 255, 255, 0.85)",
                    borderRadius: 3,
                    boxShadow: "0 12px 35px -15px rgba(208, 0, 0, 0.1)",
                    borderLeft: "6px solid #d00000",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(135deg, rgba(208, 0, 0, 0.03), transparent)",
                      zIndex: 0,
                    },
                  }}
                >
                  {/* الأيقونة الدائرية */}
                  <Box
                    sx={{
                      minWidth: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      background: "rgba(208, 0, 0, 0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "22px",
                      color: "#d00000",
                      zIndex: 1,
                    }}
                  >
                    {item.icon}
                  </Box>

                  {/* النص */}
                  <Box sx={{ flex: 1, position: "relative", zIndex: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#d00000",
                        fontWeight: 600,
                        mb: 0.5,
                        fontSize: { xs: "1rem", md: "1.1rem" },
                      }}
                    >
                      {item.before}
                    </Typography>
                  </Box>

                  {/* أيقونة إلغاء */}
                  <FaTimesCircle
                    color="#d00000"
                    size={20}
                    style={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      zIndex: 1,
                    }}
                  />
                </Box>
              </motion.div>
            ))}
          </Box>

          {/* السهم المتحرك (للشاشات الكبيرة فقط) */}
          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 4,
              }}
            >
              <motion.div
                variants={arrowVariant}
                animate="hover"
                style={{
                  fontSize: "48px",
                  color: "#555",
                  opacity: 0.6,
                }}
              >
                <FaArrowRight />
              </motion.div>
            </Box>
          )}

          {/* عمود بعد MusaidBot */}
          <Box sx={{ flex: 1 }}>
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Typography
                variant="h4"
                align="center"
                sx={{
                  color: "#007f5f",
                  mb: 4,
                  fontWeight: 700,
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  background: "rgba(0, 127, 95, 0.06)",
                  display: "inline-block",
                  mx: "auto",
                  fontSize: { xs: "1.5rem", md: "1.7rem" },
                }}
              >
                بعد MusaidBot
              </Typography>
            </motion.div>

            {comparisons.map((item, i) => (
              <motion.div
                key={`after-${i}`}
                custom={i}
                variants={itemVariant}
                initial="hidden"
                animate={controls}
              >
                <Box
                  sx={{
                    p: 3,
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    background: "rgba(255, 255, 255, 0.85)",
                    borderRadius: 3,
                    boxShadow: "0 12px 35px -15px rgba(0, 127, 95, 0.1)",
                    borderLeft: "6px solid #007f5f",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(135deg, rgba(0, 127, 95, 0.03), transparent)",
                      zIndex: 0,
                    },
                  }}
                >
                  {/* الأيقونة الدائرية */}
                  <Box
                    sx={{
                      minWidth: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      background: "rgba(0, 127, 95, 0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "22px",
                      color: "#007f5f",
                      zIndex: 1,
                    }}
                  >
                    {item.icon}
                  </Box>

                  {/* النص */}
                  <Box sx={{ flex: 1, position: "relative", zIndex: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#007f5f",
                        fontWeight: 600,
                        mb: 0.5,
                        fontSize: { xs: "1rem", md: "1.1rem" },
                      }}
                    >
                      {item.after}
                    </Typography>
                  </Box>

                  {/* أيقونة تأكيد */}
                  <FaCheckCircle
                    color="#007f5f"
                    size={20}
                    style={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      zIndex: 1,
                    }}
                  />
                </Box>
              </motion.div>
            ))}
          </Box>
        </Box>

        {/* دعوة للعمل (CTA) */}
        <Box sx={{ textAlign: "center", mt: { xs: 6, md: 10 } }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            style={{
              display: "inline-block",
              textAlign: "center",
              background: "linear-gradient(135deg, #d00000, #007f5f)",
              color: "#fff",
              padding: "24px 32px",
              borderRadius: "40px",
              boxShadow: "0 12px 40px -10px rgba(0, 0, 0, 0.15)",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 1.5,
                fontSize: { xs: "1.2rem", md: "1.4rem" },
              }}
            >
              <Box component="span" sx={{ color: "#d00000" }}>
                تخلص
              </Box>{" "}
              من المشاكل القديمة و{" "}
              <Box component="span" sx={{ color: "#007f5f" }}>
                استمتع
              </Box>{" "}
              بمزايا MusaidBot
            </Typography>
            <Typography
              variant="body1"
              color="rgba(255,255,255,0.9)"
              sx={{ fontSize: { xs: "0.95rem", md: "1rem" }, mb: 2.5 }}
            >
              قم بترقية تجربة عملائك اليوم ووفر وقتك وجهدك
            </Typography>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: "inline-block",
                background: "#ffffff",
                color: "#1a237e",
                padding: "10px 28px",
                borderRadius: "30px",
                fontWeight: 700,
                fontSize: "1rem",
                boxShadow: "0 8px 30px -10px rgba(0,0,0,0.2)",
                cursor: "pointer",
                textTransform: "none",
              }}
            >
              ابدأ التحول الآن
            </motion.div>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}

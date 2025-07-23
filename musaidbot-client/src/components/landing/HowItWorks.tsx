// src/components/HowItWorksSection.tsx

import { useEffect } from "react";
import { Container, Box, Typography, useTheme, Button } from "@mui/material";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const steps = [
  {
    title: "أرسل رابط متجرك فقط",
    description:
      "نجمع المنتجات تلقائيًا ونكوّن قاعدة بيانات داخل Google Sheet بدون أي تدخل يدوي.",
    icon: "📦",
    color: "#3949ab", // تدرّج أزرق أغمق
    animation: {
      scale: [1, 1.1, 1],
      rotate: [0, 5, -5, 0],
      transition: { duration: 4, repeat: Infinity },
    },
  },
  {
    title: "نُعدّ النظام بالكامل تلقائيًا",
    description:
      "ننشئ Workflow مخصص داخل n8n للتكامل مع الردود، دون حاجة لأي معرفة تقنية.",
    icon: "⚙️",
    color: "#8e24aa", // أرجواني داكن
    animation: {
      rotate: [0, 360],
      transition: { duration: 8, repeat: Infinity, ease: "linear" },
    },
  },
  {
    title: "يبدأ MusaidBot بالرد فورًا",
    description:
      "نخصّص الردود تلقائيًا لعملائك عبر WhatsApp وغيره، مع لوحة تحكّم متكاملة لكل تاجر.",
    icon: "🤖",
    color: "#2e7d32", // أخضر داكن
    animation: {
      y: [0, -15, 0],
      transition: { duration: 2, repeat: Infinity },
    },
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.8,
      type: "spring",
      stiffness: 120,
    },
  }),
};

export default function HowItWorksSection() {
  const theme = useTheme();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0, // أبسط طريقة: بمجرد ظهور أي جزء من العنصر يُصبح inView = true
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <Box
      ref={ref}
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: "transparent",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "300px",
          height: "300px",
          background:
            "radial-gradient(circle at center, rgba(57,73,171,0.1), transparent 70%)",
          filter: "blur(80px)",
          zIndex: 0,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: "-10%",
          right: "-10%",
          width: "250px",
          height: "250px",
          background:
            "radial-gradient(circle at center, rgba(142,36,170,0.1), transparent 70%)",
          filter: "blur(60px)",
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        {/* العنوان الرئيسي */}
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 800,
            color: "#1a237e",
            mb: { xs: 4, md: 6 },
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            position: "relative",
            "&::after": {
              content: '""',
              display: "block",
              width: "100px",
              height: "4px",
              background: "linear-gradient(90deg, #3949ab, #2e7d32)",
              margin: "16px auto 0",
              borderRadius: "2px",
            },
          }}
        >
          كيف يعمل{" "}
          <Box component="span" sx={{ color: "#3949ab" }}>
            MusaidBot
          </Box>
          ؟
        </Typography>

        {/* الخطوط الواصل بين البطاقات (للشاشات الكبيرة فقط) */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            height: "2px",
            bgcolor: "transparent",
            zIndex: 1,
          }}
        >
          {[...Array(steps.length - 1)].map((_, idx) => (
            <motion.div
              key={`connector-${idx}`}
              style={{
                flex: 1,
                height: "2px",
                background: `linear-gradient(90deg, ${steps[idx].color}, ${
                  steps[idx + 1].color
                })`,
                margin: "0 12px",
                borderRadius: "1px",
              }}
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{
                delay: 0.4 + idx * 0.3,
                duration: 1.2,
                ease: "easeOut",
              }}
            />
          ))}
        </Box>

        {/* المراحل بالتتابع */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: { xs: 4, md: 6 },
            mt: { xs: 2, md: 8 },
            mb: { xs: 6, md: 8 },
            position: "relative",
            zIndex: 2,
          }}
        >
          {steps.map((step, index) => (
            <Box
              key={index}
              component={motion.div}
              custom={index}
              variants={cardVariant}
              initial="hidden"
              animate={controls}
              sx={{
                flex: { xs: "1 1 100%", md: "1 1 30%" },
                position: "relative",
              }}
            >
              <motion.div
                custom={index}
                variants={cardVariant}
                initial="hidden"
                animate={controls}
                style={{ position: "relative", width: "100%" }}
              >
                {/* رقم الخطوة */}
                <Box
                  component={motion.div}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.6 + index * 0.3,
                    type: "spring",
                    stiffness: 200,
                  }}
                  sx={{
                    position: "absolute",
                    top: "-20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    backgroundColor: step.color,
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "1.25rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 6px 18px ${step.color}60`,
                  }}
                >
                  {index + 1}
                </Box>

                {/* دائرة الأيقونة المتحركة */}
                <motion.div
                  animate={step.animation}
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    background: `linear-gradient(145deg, ${step.color} 0%, ${theme.palette.background.paper} 100%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "48px",
                    boxShadow: `0 8px 28px -6px ${step.color}80`,
                    margin: "0 auto 20px auto",
                    zIndex: 2,
                  }}
                >
                  {step.icon}
                </motion.div>

                {/* البطاقة النصية */}
                <motion.div
                  whileHover={{
                    y: -8,
                    boxShadow: `0 20px 45px -15px ${step.color}50`,
                  }}
                  style={{
                    padding: "28px",
                    borderRadius: "20px",
                    backgroundColor: "#fff",
                    textAlign: "center",
                    boxShadow: `0 8px 30px -10px ${step.color}30`,
                    borderTop: `6px solid ${step.color}`,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* طبقة شبه شفَّافة بلون الخطوة */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background: `linear-gradient(135deg, ${step.color}10, transparent 80%)`,
                      zIndex: 0,
                    }}
                  />

                  <Typography
                    variant="h5"
                    sx={{
                      color: step.color,
                      mb: 1.5,
                      fontWeight: 700,
                      zIndex: 1,
                      position: "relative",
                    }}
                  >
                    {step.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.75,
                      fontSize: "1rem",
                      zIndex: 1,
                      position: "relative",
                    }}
                  >
                    {step.description}
                  </Typography>

                  {/* سهم توضيحي للتسلسل (على الشاشات الكبيرة فقط) */}
                  {index < steps.length - 1 && (
                    <Box
                      sx={{
                        display: { xs: "none", md: "block" },
                        position: "absolute",
                        top: "50%",
                        right: "-30px",
                        transform: "translateY(-50%)",
                      }}
                    >
                      <motion.div
                        animate={{ x: [0, 10, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                        style={{
                          fontSize: "36px",
                          color: step.color,
                        }}
                      >
                        ➔
                      </motion.div>
                    </Box>
                  )}
                </motion.div>
              </motion.div>
            </Box>
          ))}
        </Box>

        {/* لافتة في الأسفل مع دعوة للتجربة */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.9, ease: "easeOut" }}
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            textAlign: "center",
            padding: "24px",
            borderRadius: "16px",
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(12px)",
            border: `1px solid rgba(25, 118, 210, 0.12)`,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#1a237e",
              mb: 1.5,
            }}
          >
            العملية بالكامل آليّة دون أي مجهود إضافيّ منك!
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.7, fontSize: "1rem" }}
          >
            فور إرسال رابط متجرك، يقوم النظام بِبناء البوت الخاص بك وتشغيله
            فورًا، مع تحديثٍ تلقائي للمنتجات عند أي تغيير في المتجر.
          </Typography>

          <motion.div
            whileHover={{ scale: 1.05 }}
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ display: "inline-block", marginTop: "24px" }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: "#1976d2",
                borderRadius: "40px",
                px: 4,
                py: 1.5,
                fontWeight: 700,
                fontSize: "1rem",
                boxShadow: "0 8px 20px rgba(25, 118, 210, 0.4)",
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#1565c0",
                },
              }}
            >
              جرب الآن مجانًا
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
}

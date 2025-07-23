// src/components/FeaturesSection.tsx

import  { useEffect } from 'react';
import { Box, Typography,  Container } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaMagic,
  FaWhatsapp,
  FaUserShield,
  FaShoppingCart,
  FaBrain,
  FaGlobe
} from 'react-icons/fa';

const features = [
  {
    icon: <FaMagic />,
    title: 'بدون إعدادات تقنية',
    description: 'يتم تفعيل البوت والتكامل تلقائيًا بدون الحاجة لأي معرفة تقنية.',
    color: '#9c27b0',
    gradient: 'linear-gradient(135deg, #9c27b0, #e040fb)',
  },
  {
    icon: <FaWhatsapp />,
    title: 'متكامل مع WhatsApp وInstagram',
    description: 'نربط قنواتك الرسمية وتُرسل الردود من رقم موحد خاص بك.',
    color: '#25D366',
    gradient: 'linear-gradient(135deg, #25D366, #128C7E)',
  },
  {
    icon: <FaUserShield />,
    title: 'لوحة تحكم خاصة لكل تاجر',
    description: 'كل تاجر يملك صلاحياته الخاصة ومحادثاته داخل لوحة مستقلة.',
    color: '#1976d2',
    gradient: 'linear-gradient(135deg, #1976d2, #2196f3)',
  },
  {
    icon: <FaShoppingCart />,
    title: 'استخلاص المنتجات تلقائيًا',
    description: 'نقوم بتحليل رابط المتجر واستخلاص المنتجات مباشرة.',
    color: '#FF5722',
    gradient: 'linear-gradient(135deg, #FF5722, #FF9800)',
  },
  {
    icon: <FaBrain />,
    title: 'Workflows ذكية في الخلفية',
    description: 'نستخدم n8n لبناء منطق متقدم للردود حسب نوع العميل.',
    color: '#607D8B',
    gradient: 'linear-gradient(135deg, #607D8B, #9E9E9E)',
  },
  {
    icon: <FaGlobe />,
    title: 'متوافق مع السوق الخليجي',
    description: 'منصة عربية بالكامل، تفهم لغة السوق واحتياجاته.',
    color: '#4CAF50',
    gradient: 'linear-gradient(135deg, #4CAF50, #8BC34A)',
  },
];

const itemVariant = {
  hidden: { opacity: 0, y: 60, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      type: 'spring',
      stiffness: 110,
      damping: 12,
    },
  }),
};

const iconVariant = {
  hover: {
    rotate: 15,
    scale: 1.2,
    transition: { duration: 0.3 },
  }
};

export default function FeaturesSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 3 },
        background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f7ff 100%)',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-10%',
          left: '-10%',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle at center, rgba(157, 39, 176, 0.05), transparent 70%)',
          filter: 'blur(100px)',
          zIndex: 0,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-10%',
          right: '-10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle at center, rgba(25, 118, 210, 0.05), transparent 70%)',
          filter: 'blur(80px)',
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        {/* عنوان القسم */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 800,
              color: '#1a237e',
              mb: { xs: 4, md: 6 },
              fontSize: { xs: '1.9rem', sm: '2.3rem', md: '2.8rem' },
              position: 'relative',
              '&::after': {
                content: '""',
                display: 'block',
                width: { xs: '80px', md: '100px' },
                height: '4px',
                background: 'linear-gradient(90deg, #3949ab, #2196f3)',
                margin: '16px auto 0',
                borderRadius: '2px',
              },
            }}
          >
            لماذا يختار التجار{' '}
            <Box component="span" sx={{ color: '#1976d2' }}>
              MusaidBot
            </Box>
          </Typography>
        </motion.div>

        {/* شبكة البطاقات */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: '1fr 1fr 1fr',
            },
            gap: { xs: 3, md: 4 },
            mt: { xs: 4, md: 8 },
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={itemVariant}
              initial="hidden"
              animate={controls}
              whileHover={{
                y: -8,
                rotateX: 3,
                rotateY: 3,
                transition: { duration: 0.4 },
              }}
              style={{ perspective: '1000px' }}
            >
              <Box
                sx={{
                  position: 'relative',
                  p: 4,
                  borderRadius: 4,
                  backgroundColor: 'rgba(255, 255, 255, 0.85)',
                  boxShadow: '0 15px 40px -15px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  textAlign: 'center',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '6px',
                    background: feature.gradient,
                    zIndex: 1,
                  },
                }}
              >
                {/* طبقة خفيفة شفافّة */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(135deg, ${feature.color}10, transparent 70%)`,
                    zIndex: 0,
                  }}
                />

                {/* الأيقونة الدائرية */}
                <motion.div
                  variants={iconVariant}
                  whileHover="hover"
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    width: '80px',
                    height: '80px',
                    margin: '0 auto 20px auto',
                    borderRadius: '50%',
                    background: feature.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '32px',
                    boxShadow: `0 10px 25px -5px ${feature.color}50`,
                  }}
                >
                  {feature.icon}
                </motion.div>

                {/* عنوان الميزة */}
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    color: feature.color,
                    fontWeight: 700,
                    zIndex: 2,
                    position: 'relative',
                    mb: 1.5,
                  }}
                >
                  {feature.title}
                </Typography>

                {/* وصف الميزة */}
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    lineHeight: 1.7,
                    fontSize: '1rem',
                    zIndex: 2,
                    position: 'relative',
                  }}
                >
                  {feature.description}
                </Typography>

                {/* تراكب خفيف عند التحويم */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: `radial-gradient(circle at center, ${feature.color}15 0%, transparent 70%)`,
                    opacity: 0,
                    transition: 'opacity 0.3s',
                    zIndex: 1,
                    pointerEvents: 'none',
                    '&:hover': {
                      opacity: 1,
                    },
                  }}
                />
              </Box>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

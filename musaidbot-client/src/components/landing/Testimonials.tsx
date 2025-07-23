import { Box, Typography, Avatar, Paper, useTheme, styled } from '@mui/material';
import { motion } from 'framer-motion';
import { Star } from '@mui/icons-material';

const testimonials = [
  {
    name: 'متجر عطور الوسام',
    role: 'صاحب متجر',
    comment: 'من أول يوم ارتفعت نسبة الردود والطلبات! MusaidBot فعلاً وفّر علي وقت وجهد كبير.',
    rating: 5,
    date: '15 يناير 2023'
  },
  {
    name: 'متجر نون للجمال',
    role: 'مالكة متجر',
    comment: 'كنت أرد بنفسي على كل رسالة، الآن كل شيء تلقائي وباحترافية. تجربة ممتازة.',
    rating: 4,
    date: '2 مارس 2023'
  },
  {
    name: 'متجر التقنية أولاً',
    role: 'مدير العمليات',
    comment: 'تكامل البوت مع WhatsApp سلس جدًا، وفريق الدعم رائع. أنصح فيه.',
    rating: 5,
    date: '28 مايو 2023'
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { 
      delay: i * 0.15, 
      duration: 0.6,
      type: "spring",
      stiffness: 80
    },
  }),
};

const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  }
};

const StyledPaper = styled(Paper)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  '&:before': {
    content: '"“"',
    position: 'absolute',
    top: 20,
    left: 20,
    fontSize: '120px',
    color: theme.palette.primary.light,
    opacity: 0.1,
    fontFamily: 'serif',
    lineHeight: 1
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
  }
}));

export default function TestimonialsSection() {
  const theme = useTheme();

  return (
    <Box sx={{ 
      py: 12, 
      px: { xs: 2, md: 3 }, 
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative elements */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: 200,
        height: 200,
        borderRadius: '50%',
        background: 'rgba(0, 180, 216, 0.05)',
        filter: 'blur(60px)',
        transform: 'translate(50%, -50%)'
      }} />
      
      <Box sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 300,
        height: 300,
        borderRadius: '50%',
        background: 'rgba(0, 119, 182, 0.05)',
        filter: 'blur(70px)',
        transform: 'translate(-50%, 50%)'
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Typography variant="h4" align="center" sx={{ 
          fontWeight: 'bold', 
          color: theme.palette.primary.dark,
          mb: 2,
          fontSize: { xs: '1.8rem', md: '2.4rem' },
          position: 'relative',
          display: 'inline-block',
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: -10,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80px',
            height: '4px',
            background: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)',
            borderRadius: '2px'
          }
        }}>
          آراء عملائنا
        </Typography>
        
        <Typography variant="body1" align="center" sx={{ 
          color: theme.palette.text.secondary,
          maxWidth: 700,
          mx: 'auto',
          mb: 6
        }}>
          انظر ماذا يقول عملاؤنا عن تجربتهم مع MusaidBot
        </Typography>
      </motion.div>

      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ maxWidth: '1300px', margin: '0 auto' }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(auto-fit, minmax(350px, 1fr))' },
            gap: 4,
            px: { xs: 0, md: 2 }
          }}
        >
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariant}
              whileHover={{ y: -5 }}
            >
              <StyledPaper
                sx={{
                  p: 4,
                  borderRadius: 4,
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                  }
                }}
              >
                <Box sx={{ mb: 3, position: 'relative', zIndex: 1 }}>
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        sx={{ 
                          color: i < item.rating ? theme.palette.warning.main : theme.palette.grey[300],
                          fontSize: '1.2rem'
                        }} 
                      />
                    ))}
                  </Box>
                  
                  <Typography variant="body1" sx={{ 
                    mb: 3,
                    lineHeight: 1.8,
                    fontSize: '1.1rem',
                    color: theme.palette.text.primary
                  }}>
                    {item.comment}
                  </Typography>
                </Box>
                
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mt: 'auto',
                  position: 'relative',
                  zIndex: 1
                }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: theme.palette.primary.main, 
                      mr: 2,
                      width: 56,
                      height: 56,
                      fontSize: '1.5rem'
                    }}
                  >
                    {item.name[0]}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {item.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.role}
                    </Typography>
                    <Typography variant="caption" display="block" color="text.disabled">
                      {item.date}
                    </Typography>
                  </Box>
                </Box>
              </StyledPaper>
            </motion.div>
          ))}
        </Box>
      </motion.div>
    </Box>
  );
}
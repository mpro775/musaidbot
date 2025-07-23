import { Box, Typography, Paper, Button, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import typingAnimation from '../../lotties/typing.json';

const messages = [
  {
    from: 'user',
    text: 'السلام عليكم، هل عندكم عطر رجالي مناسب للصيف؟',
  },
  {
    from: 'bot',
    text: 'وعليكم السلام! نعم بالتأكيد. أنصحك بـ:\n- عطر Summer Breeze\n- عطر Ocean Oud\nهل تود الطلب الآن؟ ✅',
    buttons: ['اطلب الآن', 'عرض المزيد']
  },
];

const messageVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { 
      delay: i * 0.3, 
      duration: 0.5,
      type: "spring",
      stiffness: 100
    },
  }),
};

const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren"
    }
  }
};

export default function LiveDemoSection() {
  const theme = useTheme();
  
  return (
    <Box sx={{ 
      py: 12, 
      px: { xs: 2, md: 3 }, 
      background: 'linear-gradient(135deg, #f6f9fc 0%, #e3f2fd 100%)',
      position: 'relative',
      overflow: 'hidden',
      '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '10px',
        background: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)'
      }
    }}>
      {/* Floating decorative elements */}
      <Box sx={{
        position: 'absolute',
        top: 50,
        right: 100,
        width: 120,
        height: 120,
        borderRadius: '50%',
        background: 'rgba(74, 144, 226, 0.1)',
        filter: 'blur(40px)'
      }} />
      
      <Box sx={{
        position: 'absolute',
        bottom: 30,
        left: 150,
        width: 180,
        height: 180,
        borderRadius: '50%',
        background: 'rgba(0, 242, 254, 0.1)',
        filter: 'blur(50px)'
      }} />
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ 
          color: theme.palette.primary.dark, 
          fontWeight: 'bold',
          mb: 4,
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
          جرّب MusaidBot الآن 👇
        </Typography>
      </motion.div>

      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{
          maxWidth: '460px',
          margin: '0 auto',
          position: 'relative'
        }}
      >
        <Box
          sx={{
            p: 2.5,
            borderRadius: 4,
            background: 'white',
            boxShadow: '0 20px 40px -10px rgba(0, 82, 163, 0.15)',
            position: 'relative',
            overflow: 'hidden',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '12px',
              background: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)'
            }
          }}
        >
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={messageVariant}
            >
              <Paper
                sx={{
                  p: 2,
                  my: 1.5,
                  borderRadius: 3,
                  maxWidth: '85%',
                  ml: msg.from === 'bot' ? 0 : 'auto',
                  backgroundColor: msg.from === 'bot' ? '#f5fdff' : '#f0f7ff',
                  border: msg.from === 'bot' ? '1px solid #e1f5fe' : '1px solid #e3f2fd',
                  boxShadow: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '3px',
                    height: '100%',
                    background: msg.from === 'bot' ? theme.palette.secondary.main : theme.palette.primary.main
                  }
                }}
              >
                <Typography variant="body1" sx={{ 
                  whiteSpace: 'pre-line',
                  lineHeight: 1.6,
                  color: theme.palette.text.primary
                }}>
                  {msg.text}
                </Typography>
                
                {msg.buttons && (
                  <Box sx={{ 
                    display: 'flex',
                    gap: 1,
                    mt: 2,
                    flexWrap: 'wrap'
                  }}>
                    {msg.buttons.map((btn, idx) => (
                      <Button
                        key={idx}
                        variant={idx === 0 ? 'contained' : 'outlined'}
                        size="small"
                        sx={{
                          borderRadius: 3,
                          textTransform: 'none',
                          fontSize: '0.75rem',
                          px: 2,
                          py: 0.5,
                          boxShadow: 'none',
                          '&:hover': {
                            boxShadow: '0 4px 8px rgba(0, 82, 163, 0.2)'
                          }
                        }}
                      >
                        {btn}
                      </Button>
                    ))}
                  </Box>
                )}
              </Paper>
            </motion.div>
          ))}

          {/* Bot Typing Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, type: 'spring' }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '16px',
              padding: '8px 12px',
              background: '#f5f5f5',
              borderRadius: '20px',
              width: 'fit-content'
            }}
          >
            <Box sx={{ width: 40 }}>
              <Lottie animationData={typingAnimation} loop autoplay />
            </Box>
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
              جاري الكتابة...
            </Typography>
          </motion.div>
        </Box>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginTop: '40px' }}
      >
        <Button 
          variant="contained" 
          size="large"
          sx={{
            borderRadius: 3,
            px: 4,
            py: 1.5,
            background: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)',
            boxShadow: '0 10px 20px rgba(0, 123, 255, 0.2)',
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: '600',
            '&:hover': {
              boxShadow: '0 12px 24px rgba(0, 123, 255, 0.3)',
              transform: 'translateY(-2px)'
            }
          }}
        >
          ابدأ المحادثة الآن
        </Button>
      </motion.div>
    </Box>
  );
}
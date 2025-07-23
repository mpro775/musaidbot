import  { useRef, useEffect } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { motion, useInView, useAnimation } from 'framer-motion';
import Lottie from 'lottie-react';
import botAnimation from '../../lotties/bot-typing.json'; // تأكد من وجود ملف lottie

const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <Box 
      sx={{ 
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #f0f7ff 0%, #f8f9ff 100%)',
        py: { xs: 8, md: 12 },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            radial-gradient(circle at 15% 50%, rgba(25, 118, 210, 0.08) 0%, transparent 20%),
            radial-gradient(circle at 85% 30%, rgba(156, 39, 176, 0.08) 0%, transparent 25%),
            radial-gradient(circle at 50% 80%, rgba(76, 175, 80, 0.08) 0%, transparent 20%)
          `,
          zIndex: 0,
        }
      }}
    >
      {/* أشكال متحركة في الخلفية */}
      <motion.div
        style={{
          position: 'absolute',
          top: '20%',
          left: '5%',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #1976d2, #64b5f6)',
          filter: 'blur(20px)',
          opacity: 0.3,
        }}
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '10%',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #9c27b0, #e040fb)',
          filter: 'blur(25px)',
          opacity: 0.25,
        }}
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <Container ref={ref}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.1fr 1fr' },
            gap: 6,
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* النص مع حركات متداخلة */}
          <Box sx={{ position: 'relative' }}>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    staggerChildren: 0.2,
                    delayChildren: 0.2
                  }
                }
              }}
              initial="hidden"
              animate={controls}
            >
              <motion.div variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}>
                <Typography 
                  variant="h3" 
                  component="h1" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 800,
                    lineHeight: 1.3,
                    color: '#1a237e',
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
                  }}
                >
                  رد تلقائي على عملائك، <Box component="span" sx={{ color: '#1976d2' }}>خلال دقائق</Box>
                </Typography>
              </motion.div>
              
              <motion.div variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } }
              }}>
                <Typography 
                  variant="h6" 
                  color="text.secondary" 
                  sx={{ 
                    mb: 4,
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                    lineHeight: 1.7,
                    maxWidth: '90%'
                  }}
                >
                  أرسل رابط متجرك، واترك الباقي علينا. بوت ذكي يرد على العملاء ويعرض المنتجات تلقائيًا في واتساب وتليجرام.
                </Typography>
              </motion.div>
              
              <motion.div variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.4 } }
              }}>
                <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{ 
                      px: 5, 
                      py: 1.5, 
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                      background: 'linear-gradient(45deg, #1976d2, #2196f3)',
                      boxShadow: '0 4px 15px rgba(25, 118, 210, 0.4)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #1565c0, #1976d2)',
                        boxShadow: '0 6px 20px rgba(25, 118, 210, 0.6)',
                      }
                    }}
                  >
                    ابدأ الآن مجانًا
                  </Button>
                  
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{ 
                      px: 5, 
                      py: 1.5, 
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                      borderColor: '#1976d2',
                      color: '#1976d2',
                      '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.08)',
                        borderColor: '#1565c0'
                      }
                    }}
                  >
                    مشاهدة العرض
                  </Button>
                </Box>
                
                <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ 
                    width: 50, 
                    height: 50, 
                    borderRadius: '50%', 
                    bgcolor: '#e3f2fd',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    color: '#1976d2',
                    fontWeight: 'bold'
                  }}>
                    4.9
                  </Box>
                  <Typography variant="body2" sx={{ color: '#555' }}>
                    تقييم 5 نجوم من أكثر من 500 عميل
                  </Typography>
                </Box>
              </motion.div>
            </motion.div>
          </Box>

          {/* الأنيميشن مع تأثيرات متقدمة */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: { 
                delay: 0.5, 
                duration: 0.8,
                type: "spring",
                stiffness: 100
              } 
            }}
            whileHover={{ 
              y: -10,
              transition: { duration: 0.3 }
            }}
            style={{
              position: 'relative',
              borderRadius: '24px',
     
              maxWidth: '100%'
            }}
          >
            <Lottie 
              animationData={botAnimation} 
              loop 
              autoplay 
              style={{ 
                transform: 'scale(1.1)',
                transformOrigin: 'center'
              }} 
            />
            
           
          </motion.div>
        </Box>
      </Container>
      
      {/* موجات في الأسفل */}
      <Box sx={{ 
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100px',
        overflow: 'hidden',
        zIndex: 0
      }}>
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          style={{ 
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            opacity=".25" 
            fill="#1976d2"
          ></path>
          <path 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
            opacity=".5" 
            fill="#1976d2"
          ></path>
          <path 
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
            fill="#1976d2"
          ></path>
        </svg>
      </Box>
    </Box>
  )
}

export default HeroSection;
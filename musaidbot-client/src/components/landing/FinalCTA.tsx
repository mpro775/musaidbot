import { Box, Typography, Button, useScrollTrigger, Slide, useTheme, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { keyframes } from '@emotion/react';

// Animation for pulse effect
const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 180, 216, 0.7); }
  70% { transform: scale(1.02); box-shadow: 0 0 0 10px rgba(0, 180, 216, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 180, 216, 0); }
`;

const StyledButton = styled(Button)(({ theme }) => ({
  animation: `${pulse} 2s infinite`,
  '&:hover': {
    animation: 'none',
    transform: 'translateY(-2px)',
    boxShadow: `0 8px 20px ${theme.palette.mode === 'dark' ? 'rgba(0, 180, 216, 0.4)' : 'rgba(0, 123, 255, 0.3)'}`
  },
  transition: 'all 0.3s ease'
}));

export default function FinalCTASection() {
  const theme = useTheme();
  const trigger = useScrollTrigger({ threshold: 300 });
  const [showCTA, setShowCTA] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setShowCTA(trigger);
  }, [trigger]);

  return (
    <Slide direction="up" in={showCTA} timeout={500}>
      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          left: 0,
          right: 0,
          zIndex: 1300,
          display: 'flex',
          justifyContent: 'center',
          px: 2
        }}
      >
        <Box
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
            color: 'white',
            px: { xs: 3, sm: 4 },
            py: 2.5,
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            boxShadow: '0 15px 30px rgba(0, 82, 163, 0.2)',
            maxWidth: '1200px',
            width: '100%',
            flexWrap: 'wrap',
            backdropFilter: 'blur(5px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            position: 'relative',
            overflow: 'hidden',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #00b4d8 0%, #48cae4 50%, #00b4d8 100%)'
            }
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Decorative elements */}
          <Box sx={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 150,
            height: 150,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            opacity: isHovered ? 0.8 : 0.5,
            transition: 'all 0.5s ease'
          }} />
          
          <Box sx={{
            position: 'absolute',
            bottom: -30,
            left: -30,
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            opacity: isHovered ? 0.8 : 0.5,
            transition: 'all 0.5s ease'
          }} />

          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontWeight: 'bold', 
              flexGrow: 1,
              textAlign: { xs: 'center', sm: 'left' },
              fontSize: { xs: '0.9rem', sm: '1rem' },
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'
            }}
          >
            جاهز ترتقي بتجربة عملائك؟ دع MusaidBot يبدأ عنك الآن 🤖✨
          </Typography>
          
          <Box sx={{
            display: 'flex',
            gap: 2,
            flexShrink: 0
          }}>
            <StyledButton
              variant="contained"
              color="secondary"
              size="large"
              sx={{ 
                backgroundColor: '#00b4d8',
                whiteSpace: 'nowrap',
                borderRadius: 3,
                px: 4,
                fontWeight: 'bold',
                boxShadow: '0 5px 15px rgba(0, 180, 216, 0.4)'
              }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              جرّب الآن
            </StyledButton>
            
            <Button
              variant="outlined"
              size="large"
              sx={{ 
                color: 'white',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                whiteSpace: 'nowrap',
                borderRadius: 3,
                px: 4,
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'white'
                }
              }}
            >
              تواصل معنا
            </Button>
          </Box>
        </Box>
      </Box>
    </Slide>
  );
}
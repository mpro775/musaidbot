import { Box, Typography, Button, ToggleButton, ToggleButtonGroup, useTheme, styled } from '@mui/material';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  popular: boolean;
  saving?: string;
}
const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.MuiToggleButton-root': {
      fontWeight: 'bold',
      color: theme.palette.text.secondary,
      '&.Mui-selected': {
        color: theme.palette.primary.main,
        backgroundColor: 'transparent',
        position: 'relative',
        '&:after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: '3px',
          background: theme.palette.primary.main,
          borderRadius: '3px'
        }
      }
    }
  }
}));

const pricingData: Record<'monthly' | 'yearly', PricingPlan[]> = {
  monthly: [
    {
      name: 'تجريبية',
      price: 'مجانية',
      period: '/ شهر',
      features: ['رد تلقائي أساسي', 'ربط مع متجر واحد', 'حتى 50 محادثة/شهر', 'دعم عبر البريد الإلكتروني'],
      popular: false
    },
    {
      name: 'أساسية',
      price: '99',
      period: '/ شهر',
      features: ['ربط حتى 3 متاجر', 'لوحة تحكم متكاملة', 'دعم WhatsApp', 'حتى 500 محادثة/شهر', 'دعم فني خلال 24 ساعة'],
      popular: false
    },
    {
      name: 'احترافية',
      price: '299',
      period: '/ شهر',
      features: ['متاجر غير محدودة', 'توصيات ذكية', 'ربط Instagram + Telegram', 'دعم فني مميز (24/7)', 'تقارير أداء متقدمة'],
      popular: true
    },
  ],
  yearly: [
    {
      name: 'تجريبية',
      price: 'مجانية',
      period: '/ سنة',
      features: ['رد تلقائي أساسي', 'ربط مع متجر واحد', 'حتى 50 محادثة/شهر', 'دعم عبر البريد الإلكتروني'],
      popular: false
    },
    {
      name: 'أساسية',
      price: '999',
      period: '/ سنة',
      features: ['ربط حتى 3 متاجر', 'لوحة تحكم متكاملة', 'دعم WhatsApp', 'حتى 500 محادثة/شهر', 'دعم فني خلال 24 ساعة'],
      popular: false,
      saving: 'وفر 20%'
    },
    {
      name: 'احترافية',
      price: '2499',
      period: '/ سنة',
      features: ['متاجر غير محدودة', 'توصيات ذكية', 'ربط Instagram + Telegram', 'دعم فني مميز (24/7)', 'تقارير أداء متقدمة'],
      popular: true,
      saving: 'وفر 30%'
    },
  ],
};

const itemVariant = {
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

export default function PricingSection() {
  const theme = useTheme();
  const [planType, setPlanType] = useState<'monthly' | 'yearly'>('monthly');
  const plans = pricingData[planType];

  const handlePlanChange = (_e: React.MouseEvent<HTMLElement>, newPlan: 'monthly' | 'yearly') => {
    if (newPlan !== null) {
      setPlanType(newPlan);
    }
  };

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
          اختر الخطة المناسبة لك 🚀
        </Typography>
        
        <Typography variant="body1" align="center" sx={{ 
          color: theme.palette.text.secondary,
          maxWidth: 700,
          mx: 'auto',
          mb: 6
        }}>
          اختر من بين خططنا المرنة التي تناسب احتياجات عملك. ترقى إلى مستوى أفضل تجربة دعم عملاء.
        </Typography>
      </motion.div>

      {/* Toggle */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        my: 6,
        position: 'relative',
        zIndex: 1
      }}>
        <StyledToggleButtonGroup
          exclusive
          value={planType}
          onChange={handlePlanChange}
          color="primary"
          sx={{
            backgroundColor: '#f1f5f9',
            borderRadius: 3,
            p: 0.5
          }}
        >
          <ToggleButton value="monthly" sx={{ px: 4, py: 1 }}>
            اشتراك شهري
          </ToggleButton>
          <ToggleButton value="yearly" sx={{ px: 4, py: 1 }}>
            اشتراك سنوي <Box component="span" sx={{ color: '#10b981', ml: 1 }}>(وفر حتى 30%)</Box>
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Box>

      {/* Cards */}
      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{
          display: 'grid',
    gridTemplateColumns: '1fr', // القيمة الافتراضية للأجهزة الصغيرة
          gap: 4,
          maxWidth: '1300px',
          margin: '0 auto',
          position: 'relative'
        }}
      >
        <AnimatePresence mode="wait">
          {plans.map((plan, index) => {
            const isPopular = plan.popular;
            
            return (
              <motion.div
                key={`${planType}-${index}`}
                custom={index}
                variants={itemVariant}
                layout
                transition={{ type: "spring", stiffness: 100 }}
                style={{ position: 'relative' }}
              >
                {isPopular && (
                  <Box sx={{
                    position: 'absolute',
                    top: -15,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#10b981',
                    color: 'white',
                    px: 3,
                    py: 0.5,
                    borderRadius: 20,
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    zIndex: 2,
                    boxShadow: '0 4px 6px rgba(16, 185, 129, 0.3)'
                  }}>
                    الأكثر اختيارًا
                  </Box>
                )}
                
                {plan.saving && (
                  <Box sx={{
                    position: 'absolute',
                    top: -15,
                    right: 20,
                    backgroundColor: theme.palette.primary.light,
                    color: theme.palette.primary.contrastText,
                    px: 2,
                    py: 0.5,
                    borderRadius: 20,
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    zIndex: 2
                  }}>
                    {plan.saving}
                  </Box>
                )}
                
                <Box
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    backgroundColor: isPopular ? theme.palette.primary.dark : 'white',
                    color: isPopular ? 'white' : theme.palette.text.primary,
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    border: isPopular ? `2px solid ${theme.palette.primary.light}` : '1px solid #e2e8f0',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                    },
                    position: 'relative',
                    overflow: 'hidden',
                    '&:before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: isPopular 
                        ? 'linear-gradient(90deg, #48cae4 0%, #00b4d8 100%)' 
                        : 'linear-gradient(90deg, #f0f9ff 0%, #e0f2fe 100%)'
                    }
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ 
                      mb: 2,
                      fontWeight: 'bold',
                      color: isPopular ? 'white' : theme.palette.primary.main
                    }}>
                      {plan.name}
                    </Typography>
                    
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h4" sx={{ 
                        fontWeight: 'bold',
                        color: isPopular ? 'white' : theme.palette.text.primary
                      }}>
                        {plan.price !== 'مجانية' ? (
                          <>
                            {plan.price} <Typography component="span" variant="h6">ر.س</Typography>
                          </>
                        ) : plan.price}
                      </Typography>
                      {plan.price !== 'مجانية' && (
                        <Typography variant="body2" sx={{ 
                          color: isPopular ? 'rgba(255,255,255,0.7)' : theme.palette.text.secondary
                        }}>
                          {plan.period}
                        </Typography>
                      )}
                    </Box>

                    <Box sx={{ 
                      mb: 4,
                      textAlign: 'right',
                      minHeight: { xs: 'auto', md: '220px' }
                    }}>
                      {plan.features.map((feat, i) => (
                        <Box key={i} sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          mb: 1.5,
                          gap: 1
                        }}>
                          <Box sx={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            backgroundColor: isPopular ? 'rgba(255,255,255,0.1)' : '#e0f2fe',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                              <path 
                                d="M20 6L9 17L4 12" 
                                stroke={isPopular ? '#48cae4' : theme.palette.primary.main} 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                              />
                            </svg>
                          </Box>
                          <Typography variant="body2" sx={{ 
                            color: isPopular ? 'white' : theme.palette.text.primary,
                            textAlign: 'right',
                            flex: 1
                          }}>
                            {feat}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  <Button
                    variant={isPopular ? 'contained' : 'outlined'}
                    color={isPopular ? 'secondary' : 'primary'}
                    fullWidth
                    size="large"
                    sx={{
                      borderRadius: 3,
                      py: 1.5,
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      boxShadow: isPopular ? '0 4px 6px rgba(0, 180, 216, 0.3)' : 'none',
                      '&:hover': {
                        boxShadow: isPopular ? '0 6px 8px rgba(0, 180, 216, 0.4)' : 'none',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {plan.price === 'مجانية' ? 'ابدأ الآن' : 'اشترك الآن'}
                  </Button>
                </Box>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </Box>
  );
}
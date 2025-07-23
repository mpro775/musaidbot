// components/store/StoreHeader.tsx
import { Box, Typography, Chip, Rating } from "@mui/material";
import type { MerchantInfo } from "../../types/merchant";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import ScheduleIcon from '@mui/icons-material/Schedule';

export function StoreHeader({ merchant }: { merchant: MerchantInfo }) {
  return (
    <Box mb={4} sx={{ 
      position: 'relative',
      borderRadius: 3,
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
      color: 'white',
      p: { xs: 3, md: 5 },
      textAlign: 'center'
    }}>
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 40%)',
      }} />
      
      <Box sx={{ 
        position: 'relative',
        zIndex: 2,
        maxWidth: 1200,
        mx: 'auto'
      }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          mb: 2
        }}>
          {merchant.logoUrl && (
            <Box sx={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              border: '4px solid rgba(255,255,255,0.3)',
              overflow: 'hidden',
              boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
              flexShrink: 0
            }}>
              <img 
                src={merchant.logoUrl} 
                alt={merchant.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </Box>
          )}
          
          <Box>
            <Typography variant="h3" sx={{ 
              fontWeight: 'bold', 
              mb: 1,
              textShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}>
              {merchant.name}
            </Typography>
            
            {merchant.businessDescription && (
              <Typography variant="h6" sx={{ 
                opacity: 0.9, 
                maxWidth: 700,
                mx: 'auto',
                mb: 2
              }}>
                {merchant.businessDescription}
              </Typography>
            )}
            
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 2,
              mt: 2
            }}>
              {merchant.phone && (
                <Chip 
                  icon={<PhoneIcon />}
                  label={merchant.phone}
                  sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
                />
              )}
              
              {merchant.addresses && (
                <Chip 
                  icon={<LocationOnIcon />}
label={merchant.addresses[0].city} 
                  sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
                />
              )}
              
              {merchant.workingHours && (
                <Chip 
                  icon={<ScheduleIcon />}
                  label={merchant.workingHours[0].day}
                  sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
                />
              )}
            </Box>
          </Box>
        </Box>
        
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Rating 
            value={4.5} 
            precision={0.5} 
            readOnly 
            sx={{ color: '#FFD700' }} 
          />
          <Typography variant="body2" sx={{ ml: 1, opacity: 0.9 }}>
            (4.5 من ٥٠٠ تقييم)
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
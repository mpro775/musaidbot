import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'https://musaidbot-backend.onrender.com/api';

// احصل على الإحصائيات الرئيسية للوحة التحكم
export const getDashboardStats = async (token: string, merchantId: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const res = await axios.get(`${API_BASE}/dashboard/stats`, {
    ...config,
    params: { merchantId }
  });



  return res.data;
};

import axios from 'axios';
import type {
  PerDayStat,
  ChannelStat,
  ProductStat,
  KeywordStat,
} from '../types/analytics';
import { API_BASE } from '../context/config';


/**
 * جلسات يومية
 */
export const getDailySessions = (
  merchantId: string,
  from: string,
  to: string
): Promise<PerDayStat[]> =>
  axios
    .get<PerDayStat[]>(`${API_BASE}/analytics/daily-sessions`, {
      params: { merchantId, from, to },
    })
    .then(res => res.data);

/**
 * مجموع الجلسات
 */
export const getSessionCount = (
  merchantId: string,
  from: string,
  to: string
): Promise<number> =>
  axios
    .get<{ count: number }>(`${API_BASE}/analytics/session-count`, {
      params: { merchantId, from, to },
    })
    .then(res => res.data.count);

/**
 * توزيع القنوات
 */
export const getChannelUsage = (merchantId: string): Promise<ChannelStat[]> =>
  axios
    .get<ChannelStat[]>(`${API_BASE}/analytics/channel-usage`, {
      params: { merchantId },
    })
    .then(res => res.data);

/**
 * أعلى المنتجات تفاعلاً
 */
export const getTopProducts = (
  merchantId: string,
  limit = 10
): Promise<ProductStat[]> =>
  axios
    .get<ProductStat[]>(`${API_BASE}/analytics/top-products-requested`, {
      params: { merchantId, limit },
    })
    .then(res => res.data);

/**
 * أعلى الكلمات المفتاحية
 */
export const getTopKeywords = (
  merchantId: string,
  limit = 20
): Promise<KeywordStat[]> =>
  axios
    .get<KeywordStat[]>(`${API_BASE}/analytics/top-keywords`, {
      params: { merchantId, limit },
    })
    .then(res => res.data);

// src/api/offersApi.ts
import axios from 'axios';
import { API_BASE } from '../context/config';
import type { CreateOfferDto, Offer } from '../types/Offer';

const authHeader = (token: string) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const getOffers = async (token: string, params?: any): Promise<Offer[]> => {
  const res = await axios.get(`${API_BASE}/offers`, {
    ...authHeader(token),
    params,
  });
  return res.data;
};

export const createOffer = async (token: string, dto: CreateOfferDto): Promise<Offer> => {
  const res = await axios.post(`${API_BASE}/offers`, dto, authHeader(token));
  return res.data;
};

export const updateOffer = async (
  token: string,
  id: string,
  dto: Partial<CreateOfferDto>
): Promise<Offer> => {
  const res = await axios.patch(`${API_BASE}/offers/${id}`, dto, authHeader(token));
  return res.data;
};

export const setOfferActive = async (
  token: string,
  id: string,
  active: boolean
): Promise<Offer> => {
  const res = await axios.patch(`${API_BASE}/offers/${id}/active`, { active }, authHeader(token));
  return res.data;
};

export const deleteOffer = async (token: string, id: string): Promise<void> => {
  await axios.delete(`${API_BASE}/offers/${id}`, authHeader(token));
};

// src/global.d.ts
export {}; // تأكد من جعل هذا الملف module

declare global {
  interface Window {
    MusaidChat?: {
      merchantId: string;
      apiBaseUrl: string;
      mode?: 'bubble' | 'iframe' | 'bar' | 'conversational';
    };
  }
}

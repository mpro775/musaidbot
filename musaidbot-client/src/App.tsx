import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./components/dashboard_Users/DashboardLayout";
import ConversationsPage from "./pages/Dashboard/ConversationsPage";

import OnboardingPage from "./pages/onboarding/OnboardingPage";
import PromptStudio from "./pages/Dashboard/PromptStudio";

import DocumentsPage from "./pages/Dashboard/DocumentsPage";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";

import LeadsManagerPage from "./pages/Dashboard/LeadsManagerPage";
import SupportPage from "./pages/Dashboard/SupportPage";
import AccountSettingsPage from "./pages/Dashboard/AccountSettingsPage";
import ChatWidgetConfigSinglePage from "./pages/Dashboard/ChatSettingsPage";
import HomeDashboard from "./pages/Dashboard/Home";
import theme from "./theme/theme";
import ProductsPage from "./pages/Dashboard/ProductsPage";
import CategoriesPage from "./pages/Dashboard/CategoriesPage";
import StorePage from "./pages/StorePage";
import OrderDetailsPage from "./pages/store/OrderDetailsPage";
import ProductDetailsPage from "./pages/store/ProductDetailsPage";
import AboutPage from "./pages/store/AboutPage";
import { CartProvider } from "./context/CartContext";
import OrdersPage from "./pages/Dashboard/OrdersPage";
import ChannelsIntegrationPage from "./pages/Dashboard/ChannelsIntegration";
import BannersManagementPage from "./pages/Dashboard/BannersManagementPage";
import MerchantSettingsPage from "./pages/Dashboard/MerchantSettings";
<svg width="0" height="0" style={{ position: "absolute" }}>
  <linearGradient id="my-gradient" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stopColor={theme.palette.primary.dark} />
    <stop offset="100%" stopColor={theme.palette.primary.main} />
  </linearGradient>
</svg>;

const App = () => {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/store/:slugOrId" element={<StorePage />} />
        <Route
          path="/store/:slugOrId/order/:orderId"
          element={<OrderDetailsPage />}
        />
        <Route
          path="/store/:slugOrId/product/:productId"
          element={<ProductDetailsPage />}
        />
        <Route path="/store/:slugOrId/about" element={<AboutPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<HomeDashboard />} />
          <Route path="conversations" element={<ConversationsPage />} />

          <Route path="products" element={<ProductsPage />} />
          <Route path="prompt" element={<PromptStudio />} />
          <Route path="chatsetting" element={<ChatWidgetConfigSinglePage />} />
          <Route path="leads" element={<LeadsManagerPage />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="category" element={<CategoriesPage />} />
          <Route path="setting" element={<AccountSettingsPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="banners" element={<BannersManagementPage />} />

          <Route path="channel" element={<ChannelsIntegrationPage />} />
          <Route path="marchinfo" element={<MerchantSettingsPage />} />
          <Route path="documents" element={<DocumentsPage />} />
        </Route>
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute>
              <OnboardingPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </CartProvider>
  );
};

export default App;

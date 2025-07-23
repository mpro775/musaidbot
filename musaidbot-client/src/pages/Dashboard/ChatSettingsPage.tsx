import { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Stack,
  IconButton,
  Card,
  CardContent,
  styled,
  useTheme,
  Alert,
  Tooltip,
} from "@mui/material";
import {
  ContentCopy,
  CheckCircle,
  Palette,
  Settings,
  Code,
  Visibility,
  Edit,
  Save,
  Cancel,
} from "@mui/icons-material";

type ThemeOption = "default" | "gray" | "blue" | "purple" | "custom";
type EmbedMode = "bubble" | "iframe" | "bar" | "conversational";

interface Settings {
  botName: string;
  welcomeMessage: string;
  theme: ThemeOption;
  brandColor: string;
  fontFamily: string;
  headerBgColor: string;
  bodyBgColor: string;
  embedMode: EmbedMode;
  shareUrl: string;
}

const ColorPickerButton = styled(Button)(() => ({
  minWidth: 40,
  height: 40,
  borderRadius: "50%",
  padding: 0,
  position: "relative",
  overflow: "hidden",
  "& input[type='color']": {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: 0,
    cursor: "pointer",
  },
}));

const SectionCard = styled(Card)(() => ({
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
  },
}));

export default function ChatWidgetConfigSinglePage() {
  const theme = useTheme();
  const merchantId = "YOUR_MERCHANT_ID";
  const apiBaseUrl = "https://api.yoursaas.com";

  const [settings, setSettings] = useState<Settings>({
    botName: "",
    welcomeMessage: "",
    theme: "default",
    brandColor: "#3B82F6",
    fontFamily: "Inter",
    headerBgColor: "#ffffff",
    bodyBgColor: "#f9fafb",
    embedMode: "bubble",
    shareUrl: `${apiBaseUrl.replace(/\/api$/, "")}/chat/`,
  });
  const [draftSettings, setDraftSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const previewRef = useRef<HTMLDivElement>(null);
  const [previewLoaded, setPreviewLoaded] = useState(false);
  const [copied, setCopied] = useState(false);

  // Fetch and initialize settings (mock)
  useEffect(() => {
    const fetched: Settings = {
      botName: "Musaid Bot",
      welcomeMessage: "مرحبًا! كيف يمكنني مساعدتك؟",
      theme: "default",
      brandColor: "#FF8500",
      fontFamily: "Tajawal",
      headerBgColor: "#FF8500",
      bodyBgColor: "#FFF5E6",
      embedMode: "bubble",
      shareUrl: `${apiBaseUrl.replace(/\/api$/, "")}/chat/musaid-bot-demo`,
    };
    setSettings(fetched);
    setLoading(false);
  }, []);

  // Determine which settings to use: draft or original
  const effective = draftSettings ?? settings;

  // Inject widget preview when embedMode changes or draft resets
  useEffect(() => {
    if (previewLoaded) return;
    const container = previewRef.current;
    if (!container) return;
    container.innerHTML = "";
    const s1 = document.createElement("script");
    s1.innerHTML = `window.MusaidChat={merchantId:'${merchantId}',apiBaseUrl:'${apiBaseUrl}'};`;
    const s2 = document.createElement("script");
    s2.src = `${apiBaseUrl.replace(/\/api$/, "")}/widget.js?mode=${
      effective.embedMode
    }`;
    s2.async = true;
    container.appendChild(s1);
    container.appendChild(s2);
    setPreviewLoaded(true);
  }, [effective.embedMode, previewLoaded]);

  // Handle form field changes
  const handleChange = <K extends keyof Settings>(
    key: K,
    value: Settings[K]
  ) => {
    if (draftSettings) {
      setDraftSettings((ds) => ({ ...ds!, [key]: value }));
    } else {
      setSettings((s) => ({ ...s, [key]: value }));
    }
    if (key === "embedMode") {
      setPreviewLoaded(false);
    }
  };

  // Create a temporary draft copy
  const cloneSettings = () => {
    setDraftSettings({ ...settings });
    setPreviewLoaded(false);
  };

  // Discard the draft and revert
  const discardDraft = () => {
    setDraftSettings(null);
    setPreviewLoaded(false);
  };

  // Save either draft or original settings
  const saveAll = () => {
    // TODO: call API to persist `toSave`
    setSettings(draftSettings || settings);
    setDraftSettings(null);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading)
    return (
      <Typography sx={{ mt: 4 }} align="center">
        جاري التحميل…
      </Typography>
    );

  // Prepare embed code string
  const embedScript =
    `<script>window.MusaidChat={merchantId:'${merchantId}',apiBaseUrl:'${apiBaseUrl}'};</script>\n` +
    `<script src="${apiBaseUrl.replace(/\/api$/, "")}/widget.js?mode=${
      effective.embedMode
    }"></script>`;

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: { xs: 2, md: 4 } }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" fontWeight={700}>
          إعدادات الدردشة
        </Typography>

        {!draftSettings ? (
          <Button
            variant="contained"
            startIcon={<Edit />}
            onClick={cloneSettings}
            sx={{
              bgcolor: "primary.main",
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            تعديل الإعدادات
          </Button>
        ) : (
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<Cancel />}
              onClick={discardDraft}
            >
              إلغاء
            </Button>
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={saveAll}
              sx={{
                bgcolor: "success.main",
                "&:hover": { bgcolor: "success.dark" },
              }}
            >
              حفظ التغييرات
            </Button>
          </Stack>
        )}
      </Box>

      {draftSettings && (
        <Alert severity="info" sx={{ mb: 3 }}>
          أنت تقوم بتعديل نسخة مؤقتة من الإعدادات. لن يتم تطبيق التغييرات حتى
          تقوم بحفظها.
        </Alert>
      )}

      {/* استبدال Grid بـ Box */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
        }}
      >
        {/* العمود الأيسر - الإعدادات */}
        <Box sx={{ flex: 1, mb: { xs: 3, md: 0 } }}>
          <Stack spacing={3}>
            {/* General Settings */}
            <SectionCard>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} mb={3}>
                  <Settings color="primary" />
                  <Typography variant="h6" fontWeight={600}>
                    الإعدادات العامة
                  </Typography>
                </Stack>

                <Stack spacing={2}>
                  <TextField
                    label="اسم البوت"
                    fullWidth
                    value={effective.botName}
                    onChange={(e) => handleChange("botName", e.target.value)}
                    variant="outlined"
                  />

                  <TextField
                    label="الرسالة الترحيبية"
                    fullWidth
                    multiline
                    rows={3}
                    value={effective.welcomeMessage}
                    onChange={(e) =>
                      handleChange("welcomeMessage", e.target.value)
                    }
                    variant="outlined"
                  />
                </Stack>
              </CardContent>
            </SectionCard>

            {/* Appearance Settings */}
            <SectionCard>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} mb={3}>
                  <Palette color="primary" />
                  <Typography variant="h6" fontWeight={600}>
                    المظهر والتنسيق
                  </Typography>
                </Stack>

                <Stack spacing={2}>
                  <FormControl fullWidth>
                    <InputLabel>نوع الثيم</InputLabel>
                    <Select
                      value={effective.theme}
                      label="نوع الثيم"
                      onChange={(e) =>
                        handleChange("theme", e.target.value as ThemeOption)
                      }
                      variant="outlined"
                    >
                      <MenuItem value="default">افتراضي</MenuItem>
                      <MenuItem value="gray">رمادي</MenuItem>
                      <MenuItem value="blue">أزرق</MenuItem>
                      <MenuItem value="purple">بنفسجي</MenuItem>
                      <MenuItem value="custom">مخصص</MenuItem>
                    </Select>
                  </FormControl>

                  <Typography variant="body2" fontWeight={500}>
                    تخصيص الألوان:
                  </Typography>

                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Tooltip title="لون العلامة التجارية">
                      <Stack alignItems="center" spacing={1}>
                        <ColorPickerButton
                          sx={{ bgcolor: effective.brandColor }}
                        >
                          <input
                            type="color"
                            value={effective.brandColor}
                            onChange={(e) =>
                              handleChange("brandColor", e.target.value)
                            }
                          />
                        </ColorPickerButton>
                        <Typography variant="caption">العلامة</Typography>
                      </Stack>
                    </Tooltip>
                    <Tooltip title="لون خلفية الرأس">
                      <Stack alignItems="center" spacing={1}>
                        <ColorPickerButton
                          sx={{ bgcolor: effective.headerBgColor }}
                        >
                          <input
                            type="color"
                            value={effective.headerBgColor}
                            onChange={(e) =>
                              handleChange("headerBgColor", e.target.value)
                            }
                          />
                        </ColorPickerButton>
                        <Typography variant="caption">الرأس</Typography>
                      </Stack>
                    </Tooltip>
                    <Tooltip title="لون خلفية الجسم">
                      <Stack alignItems="center" spacing={1}>
                        <ColorPickerButton
                          sx={{ bgcolor: effective.bodyBgColor }}
                        >
                          <input
                            type="color"
                            value={effective.bodyBgColor}
                            onChange={(e) =>
                              handleChange("bodyBgColor", e.target.value)
                            }
                          />
                        </ColorPickerButton>
                        <Typography variant="caption">الخلفية</Typography>
                      </Stack>
                    </Tooltip>
                  </Box>

                  <FormControl fullWidth>
                    <InputLabel>نوع الخط</InputLabel>
                    <Select
                      value={effective.fontFamily}
                      label="نوع الخط"
                      onChange={(e) =>
                        handleChange("fontFamily", e.target.value)
                      }
                      variant="outlined"
                    >
                      <MenuItem value="Tajawal">Tajawal</MenuItem>
                      <MenuItem value="Inter">Inter</MenuItem>
                      <MenuItem value="Roboto">Roboto</MenuItem>
                      <MenuItem value="Arial">Arial</MenuItem>
                      <MenuItem value="Custom">مخصص</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </CardContent>
            </SectionCard>

            {/* Embed Settings */}
            <SectionCard>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} mb={3}>
                  <Code color="primary" />
                  <Typography variant="h6" fontWeight={600}>
                    خيارات التضمين
                  </Typography>
                </Stack>

                <Stack spacing={2}>
                  <FormControl fullWidth>
                    <InputLabel>وضع التضمين</InputLabel>
                    <Select
                      value={effective.embedMode}
                      label="وضع التضمين"
                      onChange={(e) =>
                        handleChange("embedMode", e.target.value as EmbedMode)
                      }
                      variant="outlined"
                    >
                      <MenuItem value="bubble">فقاعة عائمة</MenuItem>
                      <MenuItem value="iframe">إطار مدمج</MenuItem>
                      <MenuItem value="bar">شريط سفلي</MenuItem>
                      <MenuItem value="conversational">محادثة كاملة</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    label="رابط المشاركة"
                    fullWidth
                    value={effective.shareUrl}
                    InputProps={{ readOnly: true }}
                    variant="outlined"
                  />

                  <Box>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      mb={1}
                    >
                      <Typography variant="body2" fontWeight={500}>
                        كود التضمين
                      </Typography>
                      <Tooltip title={copied ? "تم النسخ!" : "نسخ الكود"}>
                        <IconButton
                          size="small"
                          onClick={copyToClipboard}
                          color={copied ? "success" : "default"}
                        >
                          {copied ? <CheckCircle /> : <ContentCopy />}
                        </IconButton>
                      </Tooltip>
                    </Stack>
                    <TextField
                      fullWidth
                      multiline
                      minRows={4}
                      value={embedScript}
                      InputProps={{ readOnly: true }}
                      sx={{
                        fontFamily: "monospace",
                        fontSize: "0.8rem",
                        bgcolor: theme.palette.grey[100],
                        borderRadius: 1,
                      }}
                      variant="outlined"
                    />
                  </Box>
                </Stack>
              </CardContent>
            </SectionCard>
          </Stack>
        </Box>

        {/* العمود الأيمن - المعاينة */}
        <Box sx={{ flex: 1 }}>
          <SectionCard>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} mb={3}>
                <Visibility color="primary" />
                <Typography variant="h6" fontWeight={600}>
                  معاينة الدردشة
                </Typography>
              </Stack>

              <Paper
                ref={previewRef}
                sx={{
                  height: 500,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  overflow: "hidden",
                  bgcolor: "background.paper",
                }}
              />
            </CardContent>
          </SectionCard>
        </Box>
      </Box>
    </Box>
  );
}

// src/pages/DocumentsPage.tsx
import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  LinearProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import {
  CloudDownload as DownloadIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { useAuth } from "../../context/AuthContext";

interface Doc {
  _id: string;
  filename: string;
  status: string;
  errorMessage?: string;
  createdAt: string;
  fileType?: string;
}

interface LinkItem {
  _id: string;
  url: string;
  createdAt: string;
}

interface FaqItem {
  _id: string;
  question: string;
  answer: string;
}

const FILE_TYPES = [
  { value: "policy", label: "سياسة" },
  { value: "guide", label: "دليل استخدام" },
  { value: "instructions", label: "تعليمات" },
  { value: "other", label: "أخرى" },
];

const ACCEPTED_EXTENSIONS = ["pdf", "doc", "docx", "xls", "xlsx"];
const MAX_SIZE_MB = 5;
const MAX_FILES = 5;

export default function DocumentsPage() {
  const { user } = useAuth();
  const merchantId = user?.merchantId;
  const { enqueueSnackbar } = useSnackbar();

  const [docs, setDocs] = useState<Doc[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(0);
  const [addTypeDialog, setAddTypeDialog] = useState<null | Doc>(null);
  const [selectedType, setSelectedType] = useState("policy");
  // روابط المواقع
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [newLink, setNewLink] = useState("");
  // الأسئلة الشائعة
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [newQ, setNewQ] = useState("");
  const [newA, setNewA] = useState("");

  useEffect(() => {
    // بيانات وهمية مؤقتة
    const mockDocs: Doc[] = [
      {
        _id: "a1",
        filename: "contract.pdf",
        status: "completed",
        createdAt: new Date().toISOString(),
        fileType: "policy",
      },
      {
        _id: "b2",
        filename: "logo.docx",
        status: "processing",
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        fileType: "guide",
      },
      {
        _id: "c3",
        filename: "report.xlsx",
        status: "failed",
        errorMessage: "تنسيق غير مدعوم",
        createdAt: new Date(Date.now() - 7200000).toISOString(),
        fileType: "instructions",
      },
    ];
    // محاكاة التحميل
    const t = setTimeout(() => {
      setDocs(mockDocs);
      setLoading(false);
      setLinks([
        {
          _id: "l1",
          url: "https://example.com",
          createdAt: new Date().toISOString(),
        },
      ]);
      setFaqs([
        {
          _id: "f1",
          question: "كيف أسترجع المنتج؟",
          answer: "يمكنك الاسترجاع خلال 7 أيام.",
        },
      ]);
    }, 500);
    return () => clearTimeout(t);
  }, []);

  const handleDelete = (docId: string) => {
    setDocs((prev) => prev.filter((d) => d._id !== docId));
    enqueueSnackbar("تم حذف الوثيقة (وهمية)", { variant: "success" });
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // تحقق من العدد
    if (docs.length >= MAX_FILES) {
      enqueueSnackbar(`الحد الأقصى ${MAX_FILES} ملفات فقط`, {
        variant: "warning",
      });
      return;
    }
    // تحقق من الامتداد
    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    if (!ACCEPTED_EXTENSIONS.includes(ext)) {
      enqueueSnackbar("يسمح فقط برفع ملفات PDF, Word, Excel", {
        variant: "error",
      });
      return;
    }
    // تحقق من الحجم
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      enqueueSnackbar(`الحجم الأقصى ${MAX_SIZE_MB} ميجا`, { variant: "error" });
      return;
    }
    setUploading(true);
    setTimeout(() => {
      const newDoc: Doc = {
        _id: Math.random().toString(36).substr(2),
        filename: file.name,
        status: "completed",
        createdAt: new Date().toISOString(),
      };
      setAddTypeDialog(newDoc); // فتح نافذة اختيار النوع
      setUploading(false);
    }, 800);
  };

  // حفظ نوع الملف بعد الرفع
  const handleSaveType = () => {
    if (addTypeDialog) {
      setDocs((prev) => [
        { ...addTypeDialog, fileType: selectedType },
        ...prev,
      ]);
      setAddTypeDialog(null);
      setSelectedType("policy");
      enqueueSnackbar("تم رفع الوثيقة (وهمية)", { variant: "success" });
    }
  };

  // عند إغلاق نافذة النوع بالإلغاء، لا تضف الملف
  const handleCancelType = () => {
    setAddTypeDialog(null);
    setSelectedType("policy");
  };

  // روابط المواقع
  const handleAddLink = () => {
    if (!newLink.trim()) return;
    setLinks((prev) => [
      {
        _id: Math.random().toString(36).substr(2),
        url: newLink,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
    setNewLink("");
    enqueueSnackbar("تمت إضافة الرابط", { variant: "success" });
  };
  const handleDeleteLink = (id: string) => {
    setLinks((prev) => prev.filter((l) => l._id !== id));
    enqueueSnackbar("تم حذف الرابط", { variant: "info" });
  };

  // الأسئلة الشائعة
  const handleAddFaq = () => {
    if (!newQ.trim() || !newA.trim()) return;
    setFaqs((prev) => [
      {
        _id: Math.random().toString(36).substr(2),
        question: newQ,
        answer: newA,
      },
      ...prev,
    ]);
    setNewQ("");
    setNewA("");
    enqueueSnackbar("تمت إضافة السؤال", { variant: "success" });
  };
  const handleDeleteFaq = (id: string) => {
    setFaqs((prev) => prev.filter((f) => f._id !== id));
    enqueueSnackbar("تم حذف السؤال", { variant: "info" });
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={8}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        إدارة الوثائق والروابط والأسئلة الشائعة
      </Typography>
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} centered>
          <Tab label="الملفات" />
          <Tab label="روابط المواقع" />
          <Tab label="الأسئلة الشائعة" />
        </Tabs>
      </Paper>
      {/* تبويب الملفات */}
      {tab === 0 && (
        <Paper>
          <Box sx={{ p: 2, mb: 2 }}>
            <Button
              variant="contained"
              component="label"
              disabled={uploading || docs.length >= MAX_FILES}
            >
              {uploading ? <LinearProgress sx={{ width: 100 }} /> : "رفع وثيقة"}
              <input
                hidden
                type="file"
                onChange={handleUpload}
                accept=".pdf,.doc,.docx,.xls,.xlsx"
              />
            </Button>
            <Typography variant="caption" color="text.secondary" ml={2}>
              يسمح فقط بـ PDF, Word, Excel | الحجم الأقصى 5 ميجا | بحد أقصى 5
              ملفات
            </Typography>
          </Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>اسم الملف</TableCell>
                <TableCell>الحالة</TableCell>
                <TableCell>النوع</TableCell>
                <TableCell>تاريخ الرفع</TableCell>
                <TableCell>إجراءات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {docs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    لا توجد وثائق بعد
                  </TableCell>
                </TableRow>
              ) : (
                docs.map((d) => (
                  <TableRow key={d._id}>
                    <TableCell>{d.filename}</TableCell>
                    <TableCell>
                      {d.status}
                      {d.errorMessage && `: ${d.errorMessage}`}
                    </TableCell>
                    <TableCell>
                      {FILE_TYPES.find((t) => t.value === d.fileType)?.label ||
                        (d.fileType?.startsWith("custom:")
                          ? d.fileType.slice(7)
                          : "-")}
                    </TableCell>
                    <TableCell>
                      {new Date(d.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {d.status === "completed" && merchantId ? (
                        <IconButton
                          component="a"
                          href={`/api/merchants/${merchantId}/documents/${d._id}`}
                        >
                          <DownloadIcon />
                        </IconButton>
                      ) : null}
                      <IconButton onClick={() => handleDelete(d._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Paper>
      )}
      {/* نافذة اختيار نوع الملف */}
      <Dialog open={!!addTypeDialog} onClose={handleCancelType} keepMounted>
        <DialogTitle>اختر نوع الوثيقة</DialogTitle>
        <DialogContent>
          <Select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as string)}
            fullWidth
            sx={{ mt: 2 }}
          >
            {FILE_TYPES.map((t) => (
              <MenuItem key={t.value} value={t.value}>
                {t.label}
              </MenuItem>
            ))}
            <MenuItem value="custom">أخرى (اكتب نوعك)</MenuItem>
          </Select>
          {selectedType === "custom" && (
            <TextField
              autoFocus
              margin="dense"
              label="نوع الوثيقة"
              fullWidth
              value={
                selectedType.startsWith("custom:") ? selectedType.slice(7) : ""
              }
              onChange={(e) => setSelectedType("custom:" + e.target.value)}
              sx={{ mt: 2 }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelType}>إلغاء</Button>
          <Button
            variant="contained"
            onClick={handleSaveType}
            disabled={selectedType === "custom" && !selectedType.slice(7)}
          >
            حفظ
          </Button>
        </DialogActions>
      </Dialog>
      {/* تبويب الروابط */}
      {tab === 1 && (
        <Paper sx={{ p: 2 }}>
          <Box display="flex" gap={2} mb={2}>
            <TextField
              label="رابط الموقع"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              fullWidth
            />
            <Button variant="contained" onClick={handleAddLink}>
              إضافة
            </Button>
          </Box>
          <List>
            {links.length === 0 ? (
              <ListItem>
                <ListItemText primary="لا توجد روابط بعد" />
              </ListItem>
            ) : (
              links.map((l) => (
                <ListItem key={l._id}>
                  <ListItemText primary={l.url} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => handleDeleteLink(l._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            )}
          </List>
        </Paper>
      )}
      {/* تبويب الأسئلة الشائعة */}
      {tab === 2 && (
        <Paper sx={{ p: 2 }}>
          <Box display="flex" gap={2} mb={2}>
            <TextField
              label="السؤال"
              value={newQ}
              onChange={(e) => setNewQ(e.target.value)}
              fullWidth
            />
            <TextField
              label="الإجابة"
              value={newA}
              onChange={(e) => setNewA(e.target.value)}
              fullWidth
            />
            <Button variant="contained" onClick={handleAddFaq}>
              إضافة
            </Button>
          </Box>
          <List>
            {faqs.length === 0 ? (
              <ListItem>
                <ListItemText primary="لا توجد أسئلة بعد" />
              </ListItem>
            ) : (
              faqs.map((f) => (
                <ListItem key={f._id} alignItems="flex-start">
                  <ListItemText primary={f.question} secondary={f.answer} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => handleDeleteFaq(f._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            )}
          </List>
        </Paper>
      )}
    </Box>
  );
}

import { Box, Paper, Typography, CircularProgress } from "@mui/material";
import type { ChatMessage } from "../../types/chat";
import type { FC } from "react";
import emptyChat from "../../assets/empty-chat.png";

interface Props {
  messages: ChatMessage[];
  loading: boolean;
}

const ChatWindow: FC<Props> = ({ messages, loading }) => {
  if (loading) return <CircularProgress sx={{ m: 3 }} />;
  if (!messages.length)
    return (
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <img src={emptyChat} alt="Empty" width={80} />
        <Typography mt={2} color="gray">
          لا يوجد رسائل
        </Typography>
      </Box>
    );
  return (
    <Box sx={{ p: 2, height: "100%", overflowY: "auto" }}>
      {messages.map((msg, idx) => (
        <Box
          key={idx}
          display="flex"
          justifyContent={msg.role === "customer" ? "flex-end" : "flex-start"}
        >
          <Paper
            sx={{
              p: 1.2,
              mb: 1,
              background: msg.role === "customer" ? "#805ad5" : "#f2f2f2",
              color: msg.role === "customer" ? "#fff" : "#222",
              borderRadius: 3,
              maxWidth: 350,
              boxShadow: 1,
            }}
          >
            <Typography>{msg.text}</Typography>
            <Typography
              variant="caption"
              color="gray"
              sx={{ float: "left", fontSize: 11 }}
            >
              {new Date(msg.timestamp).toLocaleTimeString()}
            </Typography>
          </Paper>
        </Box>
      ))}
    </Box>
  );
};

export default ChatWindow;

import {  useState, type FC } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface Props {
  onSend: (text: string) => void;
}

const ChatInput: FC<Props> = ({ onSend }) => {
  const [text, setText] = useState('');
  function handleSend() {
    if (!text.trim()) return;
    onSend(text);
    setText('');
  }
  return (
    <Box display="flex" alignItems="center" p={1} borderTop="1px solid #eee">
      <TextField
        fullWidth
        placeholder="اكتب رسالة..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSend();
        }}
      />
      <IconButton onClick={handleSend}>
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default ChatInput;

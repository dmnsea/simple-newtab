import { IconButton, TextField } from "@mui/material";
import { Search } from '@mui/icons-material';
import { useState } from "react";

export default function SearchBar() {
  const [input, setInput] = useState('');
  return (
    <div style={{width: '100%', maxWidth: '720px', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', alignSelf: 'center'}}>
      <TextField fullWidth label="Search in Google" variant="outlined" value={input} onChange={e => setInput(e.target.value)}/>
      <IconButton onClick={(e) => {
        if(input.trim().length > 0){
          window.open('https://google.com/search?q='+encodeURIComponent(input), e.ctrlKey ? '_blank' : '_self')?.focus();
        }
      }} size='large'><Search/></IconButton>
    </div>
  );
}

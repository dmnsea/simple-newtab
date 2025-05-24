import { NewTabFolder } from "@/types/NewTabEntries";
import { Card, CardContent, Divider, Typography } from "@mui/material";

export default function FolderCard(props: NewTabFolder){
  return <Card sx={{width: '100%', height: '140px'}}>
    <CardContent>
      <Typography>{props.title}</Typography>
      <Divider/>
      <Typography>{props.children.length} sites inside</Typography>
    </CardContent>
  </Card>
}
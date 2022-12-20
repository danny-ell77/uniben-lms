import { formatDistanceToNow, subHours, parseISO } from 'date-fns';
import NextLink from "next/link";

import { v4 as uuid } from 'uuid';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Link,
  ListItemText
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const items = [
  {
    id: uuid(),
    name: 'Dropbox',
    imageUrl: '/static/images/items/item_1.png',
    updatedAt: subHours(Date.now(), 2)
  },
  {
    id: uuid(),
    name: 'Medium Corporation',
    imageUrl: '/static/images/items/item_2.png',
    updatedAt: subHours(Date.now(), 2)
  },
  {
    id: uuid(),
    name: 'Slack',
    imageUrl: '/static/images/items/item_3.png',
    updatedAt: subHours(Date.now(), 3)
  },
  {
    id: uuid(),
    name: 'Lyft',
    imageUrl: '/static/images/items/item_4.png',
    updatedAt: subHours(Date.now(), 5)
  },
  {
    id: uuid(),
    name: 'GitHub',
    imageUrl: '/static/images/items/item_5.png',
    updatedAt: subHours(Date.now(), 9)
  }
];

export const LatestMaterials = ({data, ...props}) => (
  <Card {...props}>
    <CardHeader
      subtitle={`${items.length} in total`}
      title="Latest Course Materials"
    />
    <Divider />
    <List>
      {data?.map?.((item, i) => (
        <ListItem
          divider={i < data.length - 1}
          key={item.id}
        >
          {/* <ListItemAvatar>
          <img
              alt={item.name}
              src={item.imageUrl}
              style={{
                height: 48,
                width: 48
              }}
            />
          </ListItemAvatar> */}
          <Link sx={{width: "100%", cursor: "pointer", textDecoration: "none"}} href={item?.file} target="_blank" rel="noreferrer">
          <ListItemText
            primary={item.original_file_name}
            secondary={`Updated ${formatDistanceToNow(parseISO(item.upload_finished_at))} ago by ${item.uploaded_by}`}
            />
          </Link>
          <IconButton
            edge="end"
            size="small"
          >
            <MoreVertIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
    <Divider />
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >
      <NextLink href="/dashboard/materials">
      <Button
        color="primary"
        endIcon={<ArrowRightIcon />}
        size="small"
        variant="text"
      >
        View all
      </Button>
      </NextLink>
    </Box>
  </Card>
);

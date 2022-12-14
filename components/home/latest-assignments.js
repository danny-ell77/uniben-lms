import NextLink from "next/link";
import { format, parseISO } from 'date-fns';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SeverityPill } from '../shared/severity-pill';


export const LatestAssignments = ({data, ...props}) => (
  <Card {...props}>
    <CardHeader title="Latest Assignments" />
    <PerfectScrollbar>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Code
              </TableCell>
              <TableCell>
                Instructor
              </TableCell>
              <TableCell sortDirection="desc">
                <Tooltip
                  enterDelay={300}
                  title="Sort"
                >
                  <TableSortLabel
                    active
                    direction="desc"
                  >
                    Date
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map?.((item) => (
              <TableRow
                hover
                key={item.id}
              >
                <TableCell>
                  {item.code}
                </TableCell>
                <TableCell>
                  {item.instructor_name}
                </TableCell>
                <TableCell>
                  {format(parseISO(item.due), 'dd/MM/yyyy')}
                </TableCell>
                <TableCell>
                  <SeverityPill
                    color={(item.status === 'COMPLETED' && 'success')
                    || (item.status === 'PENDING' && 'warning')
                    || 'error'}
                  >
                    {item.status}
                  </SeverityPill>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >
      <NextLink href="/dashboard/assignments">

      <Button
        color="primary"
        endIcon={<ArrowRightIcon fontSize="small" />}
        size="small"
        variant="text"
        >

        View all
      </Button>
        </NextLink>
    </Box>
  </Card>
);

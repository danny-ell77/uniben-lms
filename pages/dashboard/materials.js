import {
  Delete as DeleteIcon,
  OpenInNew as OpenInNewIcon
} from '@mui/icons-material';
import { LoadingButton } from "@mui/lab";
import {
  Box, Divider, FormControl, Grid, IconButton, InputLabel, List,
  ListItem, ListItemIcon, ListItemText, ListSubheader, MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { DashboardLayout } from "../../components/Layout";
import { toast } from "../../lib/features/toast";
import { useDirectUploadFinishMutation, useDirectUploadStartMutation, useGetCourseMaterialsQuery } from "../../lib/services/otherAPI";

const classOptions = [
  { value: "CPE 500L", label: "CPE 500L" },
  { value: "CPE 400L", label: "CPE 400L" },
  { value: "CPE 300L", label: "CPE 300L" },
  { value: "CPE 200L", label: "CPE 200L" },
  { value: "CPE 100L", label: "CPE 100L" },
];


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  subheader: {
    display: 'flex',
    alignItems: 'center',
  },
  downloadButton: {
    marginRight: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const CourseMaterials = () => {
  const classes = useStyles();
  const { user } = useSelector(state => state.auth)
  const { data: {data = [] } = {} } = useGetCourseMaterialsQuery()
  const [uploading, setUploading] = useState(false)
  const [classroom, setClassroom] = useState(null)
  const [material, setMaterial] = useState(null)
  const [directUploadStart, {isLoading: startLoading}] = useDirectUploadStartMutation()
  const [directUploadFinish, { isLoading: finishLoading }] = useDirectUploadFinishMutation()
  
  const handleChange = event => {
    setClassroom(event.target.value)
  };
    
    const _directUploadStart = async ({ file_name, file_type }) => {
        const payload = { file_name, file_type, classroom: classroom || user?.student?.classroom.name}
        console.log(payload)
        const fulfilled = await directUploadStart(payload).unwrap()
        return fulfilled
    }

    const directUploadDo = async (data) => {
        const postData = new FormData();

        for (const key in data?.fields) {
            postData.append(key, data.fields[key]);
        }
        postData.append('file', material);
        
        setUploading(true)
        const fulfilled = await fetch(data?.url, { method: 'POST', body: postData })
        setUploading(false)

    }

    const _directUploadFinish = async (fileId) => {
        console.log({ file_id: fileId })
        const payload = {file_id: fileId}
        await directUploadFinish(payload).unwrap()
        
    }
    const handleFileChange = e => {
        const file = e.target.files[0]
        setMaterial(file)
  }
  
    const uploadMaterial = async () => {
        if (!material) return
        if (user?.instructor && !classroom) {
            return toast({
                type: "warning",
                message: "A course material needs a classroom"
            })
        }
        const startFulfilled = await _directUploadStart({ file_name: material.name, file_type: material.type })
        console.log(startFulfilled)
        await directUploadDo(startFulfilled)
        await _directUploadFinish(startFulfilled.id)
    }

  return (
  <Grid container>
      <Grid item xs={12} md={6}>
      <Box m={2}>
        <Typography variant="h5">Upload Course Material</Typography>
      </Box>
        <form>
      <Box m={2}>
        <TextField
          fullWidth
          label="File"
          name="file"
          type="file"
          onChange={handleFileChange}
          variant="outlined"
        />
      </Box>
      {user?.instructor && <Box m={2}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="classroom-label">Classroom</InputLabel>
          <Select
            labelId="classroom-label"
            name="classroom"
            onChange={handleChange}
            value={classroom}
            label="Classroom"
          >
            <MenuItem value="">
              <em>None</em>
                </MenuItem>
                {
                  classOptions.map(item => (
                    <MenuItem value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))
              }
          </Select>
        </FormControl>
      </Box>}

      <Box m={2}>
        <LoadingButton
          color="primary"
          variant="contained"
            onClick={uploadMaterial}
            fullWidth={false}
          loading={startLoading || uploading || finishLoading}
        >
          Upload Material
        </LoadingButton>
      </Box>
        </form>
      </Grid>
      <Grid item xs={12} md={6}>
      <List
      className={classes.root}
      subheader={
        <ListSubheader className={classes.subheader}>
          Course Materials
        </ListSubheader>
      }
          style={{ overflow: 'hidden', height: '100vh', overflowY: 'scroll'}}
    >
      {data.map(material => (
        <React.Fragment key={material.id}>
          <ListItem sx={{
            "&:hover": {
            // backgroundColor: "#000",
            "& .materialTools": {
              opacity: 1,
            },
          },
          }}>
            <ListItemText primary={material?.original_file_name} />
            <ListItemIcon className="materialTools" sx={{ opacity: 0, transition: "ease-in-out", margin: 0, padding: 0 }}>
              <IconButton
                component="a"
                href={material.file}
                target="_blank"
                rel="noopener noreferrer"
              >
                <OpenInNewIcon />
              </IconButton>
              <IconButton onClick={() => {}}>
                <DeleteIcon />
              </IconButton>
            </ListItemIcon>
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
      </Grid>
    </Grid>
      
  );
};

CourseMaterials.getLayout  = (page) => <DashboardLayout>{page}</DashboardLayout>

export default CourseMaterials
import React from "react";
import { DashboardLayout } from "../../components/Layout";
import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { CumulativeGrades } from '../../components/home/cummulative-grades';
import { LatestAssignments } from '../../components/home/latest-assignments';
import { LatestMaterials } from '../../components/home/latest-materials';
import { SubmissionsProgress } from '../../components/home/submissions-progress';
import { TotalAssignments } from '../../components/home/total-assignments';
import { TotalSubmissions } from '../../components/home/total-submissions';
import { useGetAccountInformationQuery } from "../../lib/services/otherAPI";

const Index = () => {
  const { data } = useGetAccountInformationQuery();
  console.log(data)
  return (<>
    <Head>
      <title>
        Dashboard | Material Kit
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <CumulativeGrades data={data?.cumulative_grades} />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <SubmissionsProgress data={ data?.submissions_progress} />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalAssignments data={data?.total_assignments} />
          </Grid>

          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalSubmissions sx={{ height: '100%' }} data={data?.total_submissions} />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <LatestMaterials sx={{ height: '100%' }} data={data?.latest_course_materials} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestAssignments data={data?.latest_assignments} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>)
};

Index.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Index;

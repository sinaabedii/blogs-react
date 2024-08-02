import React from "react";
import CardEL from "../shared/CardEL";

import { useQuery } from "@apollo/client";
import { GET_BLOGS_INFO } from "../../graphql/queries";
import { Grid } from "@mui/material";
import Loader from "../shared/Loader";

function Blogs() {
  const { loading, data, error } = useQuery(GET_BLOGS_INFO);

  if (loading) return <Loader />;
  if (error) return <h4>Error....</h4>;

  return (
    <Grid container spacing={2}>
      {data.posts.map((post) => (
        <Grid item xs={12} sm={6} md={4} key={post.id}>
          <CardEL {...post} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Blogs;

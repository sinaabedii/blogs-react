import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { SEND_COMMENT } from "../../graphql/mutation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CommentForm({ slug }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");

  const [sendComment, { loading, data, error }] = useMutation(SEND_COMMENT, {
    variables: {
      name: name,
      email: email,
      text: text,
      slug: slug,
    },
  });
  console.log(data);

  const sendHandler = () => {
    if (name && email && text) {
      sendComment();
    } else {
      toast.warn("تمام فیلدهارا پر کنید", { position: "top-center" });
    }
  };

  if (data) {
    toast.success("کامنت ارسال شد و منتظر تایید می باشد", {
      position: "top-center",
    });
  }

  return (
    <Grid
      container
      sx={{
        boxShadow: "rgba(0,0,0,0.1) 0px 4px 12px",
        borderRadius: 4,
        py: 1,
        mt: 5,
      }}
    >
      <Grid item xs={12} m={2}>
        <Typography component="p" variant="h6" fontWeight={700} color="primary">
          فرم ارسال کامنت
        </Typography>
      </Grid>
      <Grid item xs={12} m={2}>
        <TextField
          label="نام کاربری"
          value={name}
          variant="outlined"
          sx={{ width: "100%" }}
          onChange={(event) => setName(event.target.value)}
        />
      </Grid>
      <Grid item xs={12} m={2}>
        <TextField
          label="ایمیل"
          value={email}
          variant="outlined"
          sx={{ width: "100%" }}
          onChange={(event) => setEmail(event.target.value)}
        />
      </Grid>
      <Grid item xs={12} m={2}>
        <TextField
          label="متن کامنت"
          value={text}
          variant="outlined"
          sx={{ width: "100%" }}
          onChange={(event) => setText(event.target.value)}
          multiline
          minRows={4}
        />
      </Grid>
      <Grid item xs={12} m={2}>
        {loading ? (
          <Button variant="contained" disabled>
            در حال ارسال..
          </Button>
        ) : (
          <Button onClick={sendHandler} variant="contained">
            ارسال
          </Button>
        )}
      </Grid>
      <ToastContainer />
    </Grid>
  );
}

export default CommentForm;

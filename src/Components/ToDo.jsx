import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useContext } from "react";
import { ToDoContext } from "./ToDoContexts";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Description } from "@mui/icons-material";

export default function ToDO({ todo }) {
  const [ShowDeleteDialog, setShowDeleteDialog] = useState(false);
  const [ShowUpdateDialog, setShowUpdateDialog] = useState(false);
  // state to confirm update
  const [updateValue, setUpdateValue] = useState({
    Title: todo.Title,
    Description: todo.Description,
  });
  const { TodoValue, setTodoValue } = useContext(ToDoContext);
  // function for close the Delete popUp
  function CloseDialog() {
    setShowDeleteDialog(false);
  }
  // function for close the Update popUp
  function CloseUpdateDialog() {
    setShowUpdateDialog(false);
  }
  //this function will open the popUp for update the todo
  function UpdateTodo() {
    setShowUpdateDialog(true);
  }
  // function for edit the completed mission
  function handlecheckclick() {
    const updatetodo = TodoValue.map((t) => {
      if (todo.id == t.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodoValue(updatetodo);
    localStorage.setItem("TodoValue", JSON.stringify(updatetodo));
  }
  //this function will open the popUp for delete the todo
  function DeletTodo() {
    setShowDeleteDialog(true);
  }
  //this function will  delete the todo
  function ConfirmDeleting() {
    const updatetodo = TodoValue.filter((t) => {
      return t.id != todo.id;
    });
    localStorage.setItem("TodoValue", JSON.stringify(updatetodo));

    setTodoValue(updatetodo);
  }
  //this function will  Update the todo
  function ConfirmUpdating() {
    const updatetodo = TodoValue.map((t) => {
      if (t.id == todo.id) {
        return {
          ...t,
          Title: updateValue.Title,
          Description: updateValue.Description,
        };
      } else {
        return t;
      }
    });
    localStorage.setItem("TodoValue", JSON.stringify(updatetodo));

    setTodoValue(updatetodo);

    setShowUpdateDialog(false);
  }
  return (
    <>
      {/* the popup for confirme deleting or back */}
      <Dialog
        onClose={CloseDialog}
        open={ShowDeleteDialog}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete Todo"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this todo?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={CloseDialog}>Cancel</Button>
          <Button onClick={ConfirmDeleting}>Delete</Button>
        </DialogActions>
      </Dialog>
      {/* ===== popup===== */}
      {/* update dialog */}
      <Dialog
        onClose={CloseUpdateDialog}
        open={ShowUpdateDialog}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Edit Todo"}</DialogTitle>
        <DialogContent>
          <TextField
            value={updateValue.Title}
            onChange={(event) => {
              setUpdateValue({ ...updateValue, Title: event.target.value });
            }}
            id="outlined-basic"
            label="Title"
            variant="standard"
          />
        </DialogContent>
        <DialogContent>
          <TextField
            value={updateValue.Description}
            onChange={(event) => {
              setUpdateValue({
                ...updateValue,
                Description: event.target.value,
              });
            }}
            id="outlined-basic"
            label="Description"
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={CloseUpdateDialog}>Cancel</Button>
          <Button onClick={ConfirmUpdating}>Save</Button>
        </DialogActions>
      </Dialog>
      {/*===== update dialog =====*/}
      <Card
        className="Card"
        sx={{
          minWidth: 275,
          marginTop: "10px",
          backgroundColor: "#283593",
          color: "white",
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography variant="h5" style={{ textAlign: "left" }}>
                {todo.Title}
              </Typography>
              <Typography variant="h6" style={{ textAlign: "left" }}>
                {todo.Description}
              </Typography>
            </Grid>
            <Grid
              size={4}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <IconButton
                onClick={handlecheckclick}
                className="ButtonHover"
                aria-label="check"
                style={{
                  color: todo.isCompleted ? "white" : "green",
                  backgroundColor: todo.isCompleted ? "green" : "white",
                  border: "3px solid #8bc34a ",
                }}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                onClick={UpdateTodo}
                className="ButtonHover"
                aria-label="EditIcon"
                style={{
                  color: "#0164af",
                  backgroundColor: "white",
                  border: "3px solid #0164af ",
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={DeletTodo}
                className="ButtonHover"
                aria-label="DeleteIcon"
                style={{
                  color: "#f60000",
                  backgroundColor: "white",
                  border: "3px solid #f60000 ",
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

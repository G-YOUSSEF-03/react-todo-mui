import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider, Grid } from "@mui/material";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import { ToDoContext } from "./ToDoContexts";
import { useContext } from "react";
//
import ToDO from "./ToDo";
import { useState } from "react";
import { Description } from "@mui/icons-material";
let AddId = 3;
export default function ToDoList() {
  const { TodoValue, setTodoValue } = useContext(ToDoContext);
  // state for the input
  const [inputValue, setInputValue] = useState("");

  // function for add the value to the state
  function AddTodo(event) {
    setInputValue(event.target.value);
  }
  function AddToList() {
    const newTodo = {
      id: AddId,
      Title: inputValue,
      Description: "you can edite this description",
      isCompleted: false,
    };
    AddId++;
    setTodoValue([...TodoValue, newTodo]);
    setInputValue("");
  }

  // maping to show the card by id
  const todolist = TodoValue.map((t) => {
    return <ToDO key={t.id} todo={t} />;
  });

  return (
    <Container style={{ width: "600px" }}>
      <Card sx={{ minWidth: 275, padding: "10px" }}>
        <CardContent>
          <Typography variant="h2" style={{ fontFamily: "Zolando" }}>
            Plan semain
          </Typography>
        </CardContent>
        <Divider />
        {/*====== buttons ======*/}
        <ToggleButtonGroup
          style={{ marginTop: "10px" }}
          //   value={alignment}
          exclusive
          //   onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton value="left">All</ToggleButton>
          <ToggleButton value="center">Done</ToggleButton>
          <ToggleButton value="right">en coure</ToggleButton>
        </ToggleButtonGroup>
        {/* ===== Buttons ====== */}
        {/* to do */}
        {todolist}
        {/* ====todo==== */}
        {/* ==== addBtn + input ==== */}
        <Grid container spacing={2} sx={{ marginTop: "10px" }}>
          <Grid size={8}>
            <TextField
              id="standard-basic"
              label="Add"
              variant="standard"
              style={{ width: "90%" }}
              value={inputValue}
              onChange={AddTodo}
            />
          </Grid>
          <Grid size={4}>
            <Button
              style={{ width: "100%", height: "100%" }}
              variant="outlined"
              onClick={AddToList}
            >
              Add
            </Button>
          </Grid>
        </Grid>
        {/* ==== addBtn + input ==== */}
      </Card>
    </Container>
  );
}

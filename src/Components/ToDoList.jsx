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
import { useContext, useEffect } from "react";
//
import ToDO from "./ToDo";
import { useState } from "react";
import { Description } from "@mui/icons-material";
let AddId = 3;
export default function ToDoList() {
  const { TodoValue, setTodoValue } = useContext(ToDoContext);
  // state for the input
  const [inputValue, setInputValue] = useState("");

  // function for add the value to the state + i add the storeage to save all todos even when i reload the page(i dont get it 100%)
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
    const updatetodo = [...TodoValue, newTodo];
    setTodoValue(updatetodo);
    localStorage.setItem("TodoValue", JSON.stringify(updatetodo));
    setInputValue("");
  }
  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("TodoValue")) ?? [];
    setTodoValue(storageTodos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // i'm trynig to show the completed todos
  const [DisplayedTodos, setDisplayedTodos] = useState("All");
  function ChangeTypeTodos(e) {
    setDisplayedTodos(e.target.value);
  }

  const completed = TodoValue.filter((t) => {
    return t.isCompleted;
  });
  const noncompleted = TodoValue.filter((t) => {
    return !t.isCompleted;
  });
  let todosToBeRendered = TodoValue;
  if (DisplayedTodos == "Completed") {
    todosToBeRendered = completed;
  } else if (DisplayedTodos == "NonCompleted") {
    todosToBeRendered = noncompleted;
  }

  // maping to show the card by id
  const todolist = todosToBeRendered.map((t) => {
    return <ToDO key={t.id} todo={t} />;
  });

  return (
    <Container
      style={{ width: "100vw", maxHeight: "100vh", overflow: "scroll" }}
    >
      <Card sx={{ minWidth: 275, padding: "10px" }}>
        <CardContent>
          <Typography variant="h2" style={{ fontFamily: "Zolando" }}>
            Todo List
          </Typography>
        </CardContent>
        <Divider />
        {/*====== buttons ======*/}
        <ToggleButtonGroup
          style={{ marginTop: "10px" }}
          value={DisplayedTodos}
          exclusive
          onChange={ChangeTypeTodos}
          aria-label="text alignment"
          color="primary"
        >
          <ToggleButton value="All">ALL</ToggleButton>
          <ToggleButton value="Completed">DONE</ToggleButton>
          <ToggleButton value="NonCompleted"> IN PROGRESS</ToggleButton>
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
              label="Add a new task..."
              variant="standard"
              style={{ width: "90%" }}
              value={inputValue}
              onChange={AddTodo}
            />
          </Grid>
          <Grid size={4}>
            <Button
              style={{ width: "100%", height: "100%" }}
              variant="contained"
              onClick={AddToList}
              disabled={inputValue.length == 0}
            >
              Add Task
            </Button>
          </Grid>
        </Grid>
        {/* ==== addBtn + input ==== */}
      </Card>
    </Container>
  );
}

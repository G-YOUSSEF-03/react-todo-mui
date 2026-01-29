import { createTheme, ThemeProvider } from "@mui/material";
import "./App.css";
import ToDoList from "./Components/ToDoList";
import { ToDoContext } from "./Components/ToDoContexts";
import { useState } from "react";

function App() {
  // state for the list
  const [TodoValue, setTodoValue] = useState([
    {
      id: 1,
      Title: "first todo",
      Description: "this is the first todo",
      isCompleted: false,
    },
    {
      id: 2,
      Title: "second todo",
      Description: "this is the second todo",
      isCompleted: false,
    },
  ]);
  const theme = createTheme({
    typography: {
      fontFamily: ["Zolando"],
    },
    palette: {
      primary: {
        main: "#ab003c",
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <ToDoContext.Provider value={{ TodoValue, setTodoValue }}>
          <ToDoList />
        </ToDoContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default App;

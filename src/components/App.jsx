import React, { useState } from "react";
import { Header, Footer } from "./layouts";
import Exercises from "./exercises";
import { muscles, exercises } from "../store";

const menu = {
  100: "profile",
  101: "myAccount",
  102: "logout"
};

const App = () => {
  const [musclesArr] = useState(muscles);
  const [exercisesArr, setExercisesArr] = useState(exercises);
  const [category, setCategory] = useState("");
  const [exercise, setExercise] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [exerciseSelected, setExerciseSelected] = useState({});

  const getExercisesByMuscles = () => {
    const initEx = musclesArr.reduce(
      (accum, curr) => ({
        ...accum,
        [curr]: []
      }),
      {}
    );

    console.log("initEx", initEx);

    return Object.entries(
      exercisesArr.reduce((accum, current) => {
        const { muscles } = current;
        accum[muscles] = [...accum[muscles], current];
        return accum;
      }, initEx)
    );
  };

  const ex = getExercisesByMuscles();

  const handleCategorySelect = category => {
    setCategory(category);
    setEditMode(false);
  };

  const handleExerciseSelect = id => {
    const current = exercisesArr.find(ex => ex.id === id);
    setExercise(current);
    setEditMode(false);
  };

  const handleExerciseCreate = exercise => {
    setExercisesArr(prev => [...prev, exercise]);
    setEditMode(false);
  };

  const handleExerciseDelete = id => {
    setExercisesArr(prev => prev.filter(ex => ex.id !== id));
    setEditMode(false);
  };

  const handleExerciseSelectEdit = id => {
    setEditMode(true);
    const current = exercisesArr.find(ex => ex.id === id);
    setExerciseSelected(current);
  };

  const handleExerciseEdit = exercise => {
    console.log("handleEdit", exercise);
    setExercisesArr(prev => prev.filter(ex => ex.id !== exercise.id));
    setExercisesArr(prev => [...prev, exercise]);
    setEditMode(false);
  };

  const handleMenuSelect = menuIndex => {
    console.log("menuSelect", menu[menuIndex]);
  };

  const handleSearch = str => {
    console.log("search str received in App", str);
    let current = exercisesArr.find(ex =>
      ex.title.toLowerCase().includes(str.toLowerCase())
    );
    if (!current) {
      console.log("search again", str);
      current = exercisesArr.find(ex =>
        ex.description.toLowerCase().includes(str.toLowerCase())
      );
    }

    if (current) {
      setExercise(current);
      setEditMode(false);
    } else {
      alert("Seaching '" + str + "' found no match");
    }
  };

  return (
    <div className="App">
      <Header
        muscles={musclesArr}
        onCreate={handleExerciseCreate}
        onSearch={handleSearch}
        onMenuSelect={handleMenuSelect}
      />
      <Exercises
        category={category}
        exercise={exercise}
        exercises={ex}
        onSelect={handleExerciseSelect}
        onDelete={handleExerciseDelete}
        exSelected={exerciseSelected}
        onSelectEdit={handleExerciseSelectEdit}
        onEdit={handleExerciseEdit}
        editMode={editMode}
        muscles={musclesArr}
      />
      <Footer
        category={category}
        muscles={musclesArr}
        onSelect={handleCategorySelect}
      />
    </div>
  );
};

export default App;

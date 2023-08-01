import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import boardsReducer from './slices/boardsSlice';
import cardsReducer from './slices/cardsSlice';
import tasksReducer from './slices/tasksSlice';
import currTaskReducer from './slices/currTaskSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    boards: boardsReducer,
    cards: cardsReducer,
    tasks: tasksReducer,
    currTask: currTaskReducer,
  },
});

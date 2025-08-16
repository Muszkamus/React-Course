# Challenge: Create advanced state management system with useReducer + Context API

👨‍💼 You have been tasked by your project manager to refactor this app to using the Context API

YOUR TASKS:

- DONE Duplicate `src` folder to `src-no-context`
- DONE Review data flow and passed props
- DONE Identify prop drilling problem
- DONE Use the Context API to fix the (very small) prop drilling problem
- DONE Create a new context `QuizContext` with the reducer we created earlier
- DONE Create a custom provider component `QuizProvider` and provide all the state to the app
- DONE Create a custom hook to consume state all over the application
- DONE Delete all unnecessary props
- DONE IMPORTANT: Note how you actually need state right in App component. This means you need to wrap the whole App into the context (HINT: try in index.js)

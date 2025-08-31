// import React, { createContext, useState, useContext } from 'react';

// const CountContext = createContext();

// export const useCounts = () => useContext(CountContext);

// export const CountProvider = ({ children }) => {
//     const [counts, setCounts] = useState({
//         admins: 0,
//         organizers: 0,
//         students: 0,
//         externals: 0,
//     });

//     // Function to update counts, could also include functions for decrement, etc.
//     const updateCounts = (type, value) => {
//         setCounts((prevCounts) => ({
//             ...prevCounts,
//             [type]: value,
//         }));
//     };

//     return (
//         <CountContext.Provider value={{ counts, updateCounts }}>
//             {children}
//         </CountContext.Provider>
//     );
// };




// import { CountProvider } from './path-to-your-context-file';

// const App = () => {
//     return (
//         <CountProvider>
//             {/* Rest of your app */}
//         </CountProvider>
//     );
// };

// export default App;



// import React from 'react';
// import { useCounts } from './path-to-your-context-file';

// const SomeComponent = () => {
//     const { counts, updateCounts } = useCounts();

//     // Now you can use counts and updateCounts in your component
//     // For example, when creating an admin:
//     const handleCreateAdmin = () => {
//         // ...perform create admin operation...
//         updateCounts('admins', counts.admins + 1);
//     };

//     return (
//     // ... your component JSX ...
//   );
// };




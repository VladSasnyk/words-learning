import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import HomePage from './pages/Home';
import WordsPage, {
  loader as wordsLoader,
  action as wordsAction,
} from './pages/Words';
import LearnPage from './pages/Learn';
import ArchivePage, { loader as archiveWordsLoader, } from './pages/Archive';



const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, 
        element: <HomePage />,
        loader: archiveWordsLoader, },
      {
        path: 'words',
        element: <WordsPage />,
        loader: wordsLoader,
        action: wordsAction,
      },
      {
        path: 'learn',
        element: <LearnPage />,
        loader: wordsLoader,
      },
      {
        path: 'archive',
        element: <ArchivePage />,
        loader: archiveWordsLoader,
      }
    ]
  },
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;

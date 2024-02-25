import { Navigate, Route, Routes } from 'react-router-dom';

import { Home, Tweets } from 'pages';

export const App = () => {
  return (
    <div>
      <Routes>
        <Route index element={<Home />} />
        <Route path="tweets" element={<Tweets />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

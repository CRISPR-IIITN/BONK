import { useState } from "react";
import { User } from "../App";
import Heatmap from "./Heatmap";
import Admin from "./Admin";

const Home = ({ user, onLogout }: { user: User; onLogout: () => void }) => {
  const [currentPage, setCurrentPage] = useState(1);

  if (currentPage === 1)
    return (
      <Heatmap
        user={user}
        page={currentPage}
        setPage={setCurrentPage}
        onLogout={onLogout}
      />
    );
  else if (currentPage === 2)
    return (
      <Admin page={currentPage} setPage={setCurrentPage} onLogout={onLogout} />
    );
  else return <></>;
};

export default Home;

// 1 - heatmap
// 2 - admin
// 3 - settings

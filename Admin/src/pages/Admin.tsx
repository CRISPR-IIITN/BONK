import NavBar from "../components/heatmap/NavBar";

interface Props {
  onLogout: () => void;
  page: number;
  setPage: (page: number) => void;
}

const Admin = ({ onLogout, page, setPage }: Props) => {
  return (
    <>
      <NavBar
        isAdmin={true}
        page={page}
        onLogout={onLogout}
        setPage={setPage}
      />
    </>
  );
};

export default Admin;

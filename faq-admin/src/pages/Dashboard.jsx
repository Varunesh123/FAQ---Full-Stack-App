import FAQList from "../components/FAQList";
import FAQForm from "../components/FAQForm";

const Dashboard = () => {
  return (
    <div className="container">
      <h1 className="text-center">FAQ Admin Panel</h1>
      <FAQForm />
      <FAQList />
    </div>
  );
};

export default Dashboard;

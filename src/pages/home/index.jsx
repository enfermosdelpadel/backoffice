import { supabase } from "../../supabase/client";
import TaskFrom from "../../Components/TaskFrom";
// import { useContext } from "react";
// import { TaskContext } from "../../context/TaskContext";
import TaskList from "../../Components/TaskList";
import Layout from "../../Components/Layout";

const Home = () => {
  // const context = useContext(TaskContext);

  return (
    <Layout>
      <div>
        <h1>Do you have something to do?!</h1>
        <button onClick={() => supabase.auth.signOut()}>Logout</button>
        <TaskFrom />
        <TaskList />
      </div>
    </Layout>
  );
};

export default Home;

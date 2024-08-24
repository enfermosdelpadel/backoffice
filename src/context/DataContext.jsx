import PropTypes from "prop-types";
import { createContext, useState, useEffect } from "react";
import { supabase } from "../supabase/client";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [profile, setProfile] = useState([]);
  const [user, setUser] = useState([null]); // Initialize user as null

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, [user]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data, error } = await supabase.from("profiles").select("*");
      if (error) {
        throw error;
      } else {
        setProfile(data);
      }
    };
    fetchProfiles();
  }, []);

  // Understand why this dont work
  // const fetchTasks = async (done = false) => {
  //   const { data, error } = await supabase
  //     .from("task")
  //     .select("*")
  //     .eq("userid", user.id) //only fetch tasks that belong to the user
  //     .eq("done", done)
  //     .order("id", { ascending: true });
  //   if (error) {
  //     throw error;
  //   } else {
  //     setTasks(data);
  //   }
  // };

  // const createTask = async (taskName) => {
  //   try {
  //     const result = await supabase.from("task").insert({
  //       name: taskName,
  //       userid: user.id,
  //     });
  //     console.log(result);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  // const deleteTask = async (id) => {
  //   const { error, data } = await supabase
  //     .from("task")
  //     .delete()
  //     .eq("userid", user.id)
  //     .eq("id", id);
  //   // console.log(id);
  //   if (error) throw error;
  //   else {
  //     console.log(data);
  //   }
  // };

  // const updateTask = async (id, done) => {
  //   const { error, data } = await supabase
  //     .from("task")
  //     .update({ done: !done })
  //     .eq("userid", user.id)
  //     .eq("id", id);
  //   if (error) throw error;
  //   else {
  //     console.log(data);
  //   }
  // };

  return (
    <DataContext.Provider value={{ user, profile }}>
      {children}
    </DataContext.Provider>
  );
};

DataContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

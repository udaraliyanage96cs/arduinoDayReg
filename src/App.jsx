import React, { useState, useEffect } from "react";
import { db } from "./utils/firebase";
import {
  collection,
  getDocs,
  query,
  getCountFromServer,
  where,
} from "firebase/firestore";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState({
    all: 0,
    hackthon: 0,
    day_one: 0,
    day_two: 0,
  });
  const [userDetails, setUserDetails] = useState([]);

  const fetchUsers = async () => {
    const arduino_day = collection(db, "Arduino_Day_Registration");

    const all_users = query(arduino_day);
    const snapshot_all_users = await getCountFromServer(all_users);
    const all_count = snapshot_all_users.data().count;

    const hackthon_users = query(arduino_day, where("Hackthon", "==", "Yes"));
    const snapshot_hackthon_users = await getCountFromServer(hackthon_users);
    const hackthon_count = snapshot_hackthon_users.data().count;

    const day_1_users = query(
      arduino_day,
      where("Attends.Day_One", "==", true)
    );
    const snapshot_day_1_users = await getCountFromServer(day_1_users);
    const day_1_count = snapshot_day_1_users.data().count;

    const day_2_users = query(
      arduino_day,
      where("Attends.Day_Two", "==", true)
    );
    const snapshot_day_2_users = await getCountFromServer(day_2_users);
    const day_2_count = snapshot_day_2_users.data().count;

    const school_users = query(arduino_day, where("University_or_School", "==", "Student"));
    const snapshot_school_users = await getCountFromServer(school_users);
    const school_count = snapshot_school_users.data().count;

    const uni_users = query(arduino_day, where("University_or_School", "==", "Undergraduate"));
    const snapshot_uni_users = await getCountFromServer(uni_users);
    const uni_count = snapshot_uni_users.data().count;

    setUsers({
      all: all_count,
      hackthon: hackthon_count,
      day_one: day_1_count,
      day_two: day_2_count,
      school_count: school_count,
      uni_count: uni_count,
    });

    await getDocs(query(arduino_day)).then((querySnapshot) => {
      const user = querySnapshot.docs.map((doc) => ({
        doc: doc.data(),
        id: doc.id,
      }));
      console.log(user);
      setUserDetails(user);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <h5>All Registed Users : {users.all}</h5>
      <h5>Hackthon Teams : {users.hackthon}</h5>
      <h5>Day One : {users.day_one}</h5>
      <h5>Day Two : {users.day_two}</h5>
      <h5>School Count : {users.school_count}</h5>
      <h5>University Count : {users.uni_count}</h5>
      <div className="mt-5">
        <table className="table  table-striped">
          <thead className="table-dark">
            <tr>
              <th scope="col">User Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile</th>
              <th scope="col">Day One</th>
              <th scope="col">Day Two</th>
              <th scope="col">Student/Undergraduate</th>
              <th scope="col mx-w50">Education Center Name</th>
            </tr>
          </thead>
          <tbody>
            {!loading && 
              userDetails.map((user,index) => {
                return(
                  <tr key={index}>
                    <th>{user.doc.FullName}</th>
                    <th>{user.doc.Email}</th>
                    <th>{user.doc.Phone}</th>
                    <th>{user.doc.Attends.Day_One ? 'Attend':''}</th>
                    <th>{user.doc.Attends.Day_Two ? 'Attend':''}</th>
                    <th>{user.doc.University_or_School}</th>
                    <th>{user.doc.Education_center_Name}</th>
                  </tr>
                )
              })
            }
            
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

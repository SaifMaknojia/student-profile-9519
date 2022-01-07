import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../card/Card';
import './_homepage.scss';

const Homepage = () => {
  const [studentData, setStudentData] = useState([]);
  const [filterStudentData, setFilterStudentData] = useState([]);
  const [searchValue, setSearchValue] = useState();
  const [searchTagValue, setSearchTagValue] = useState();
  const API_URL = 'https://api.hatchways.io/assessment/students';

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) =>
        setStudentData(
          res.data.students.map((student) => {
            return { ...student, tags: [] };
          })
        )
      )
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (searchValue || searchTagValue) {
      if (searchValue && searchTagValue) {
        setFilterStudentData(
          studentData.filter((student) => {
            const name = `${student.firstName} ${student.lastName}`;
            const tags = `${student.tags.join()}`;
            if (
              name.toLowerCase().includes(searchValue) &&
              tags.toLowerCase().includes(searchTagValue)
            )
              return student;
          })
        );
      } else if (searchValue) {
        setFilterStudentData(
          studentData.filter((student) => {
            const name = `${student.firstName} ${student.lastName}`;
            if (name.toLowerCase().includes(searchValue)) return student;
          })
        );
      } else if (searchTagValue) {
        setFilterStudentData(
          studentData.filter((student) => {
            const tags = `${student.tags.join()}`;
            if (tags.toLowerCase().includes(searchTagValue)) return student;
          })
        );
      }
    } else setFilterStudentData(studentData);
  }, [studentData, searchValue, searchTagValue]);

  return (
    <div className="container">
      <div className="card-container">
        <input
          onChange={(e) => setSearchValue(e.target.value)}
          className="input-search"
          placeholder="Search by name"
          type="search"
        />
        <input
          onChange={(e) => setSearchTagValue(e.target.value)}
          className="input-search-tag"
          placeholder="Search by tag"
          type="search"
        />
        <>
          {filterStudentData.map((student) => (
            <Card
              studentData={studentData}
              setStudentData={setStudentData}
              key={student.id}
              student={student}
            />
          ))}
        </>
      </div>
    </div>
  );
};

export default Homepage;

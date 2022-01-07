import React, { useState, useRef } from 'react';
import './_card.scss';

const Card = ({ student, setStudentData, studentData }) => {
  const [showTest, setShowTest] = useState(false);
  const inputRef = useRef();

  //calculating total and then getting the average
  const average = () => {
    const total = student.grades.reduce((a, b) => +a + +b, 0);
    const average = total / student.grades.length;
    return average;
  };

  const toggleTest = () => {
    setShowTest(!showTest);
  };

  const handleKeypress = (e) => {
    if (e.charCode === 13) {
      setStudentData(
        studentData.map((std) => {
          if (std.id === student.id) {
            return { ...std, tags: [...student.tags, e.target.value] };
          }
          return std;
        })
      );
      inputRef.current.value = '';
    }
  };

  return (
    <div className="card">
      <div className="profile">
        <img className="profile__image" src={student.pic} />
      </div>
      <div className="info">
        <div className="info__header">
          <h2 className="info__header--title">
            {`${student.firstName} ${student.lastName}`}
          </h2>
          <button onClick={toggleTest} className="info__header--button">
            {showTest ? '- ' : '+'}
          </button>
        </div>
        <div className="info__content">
          <p className="info__content--name">Email: {student.email}</p>
          <p className="info__content--name">Company: {student.company}</p>
          <p className="info__content--name">Skill: {student.skill}</p>
          <p className="info__content--name">Average: {average()}%</p>

          {showTest && (
            <ul>
              {student.grades.map((marks, i) => (
                <li key={i} className="info__content--name">
                  <span>Test {i + 1}: </span>
                  {marks}%
                </li>
              ))}
            </ul>
          )}
          <p className="tag-holder">
            {student.tags.map((tag, i) => (
              <span key={i} className="tag">
                {tag}
              </span>
            ))}
          </p>
          <input
            onKeyPress={handleKeypress}
            ref={inputRef}
            className="tags-input"
            type="text"
            placeholder="Add a tag"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;

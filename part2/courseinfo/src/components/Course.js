const Header = ({ courseName }) => <h2>{courseName}</h2>;

const Part = ({ part }) => (
  <li>
    {part.name} {part.exercises}
  </li>
);

const Content = ({ parts }) => (
  <ul>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </ul>
);

const Total = ({ parts }) => {
  const totalExercises = parts.reduce(
    (total, value) => total + value.exercises,
    0
  );
  return <h3>Number of exercises {totalExercises}</h3>;
};

const Course = ({ course }) => (
  <div>
    <Header courseName={course.name} />

    <Content parts={course.parts} />

    <Total parts={course.parts} />
  </div>
);

export default Course;

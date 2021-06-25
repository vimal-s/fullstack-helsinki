import { useState } from "react";

const Display = ({ text }) => <h1>{text}</h1>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const FeedbackUI = ({ onClick }) => (
  <div>
    <Display text="give feedback" />
    <Button text="good" onClick={onClick.good} />
    <Button text="neutral" onClick={onClick.neutral} />
    <Button text="bad" onClick={onClick.bad} />
  </div>
);

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ count }) => {
  const totalCount = count.good + count.neutral + count.bad;

  return (
    <div>
      <Display text="statistics" />
      {totalCount === 0 ? (
        <p>No feedback given</p>
      ) : (
        <div>
          <table>
            <tbody>
              <Statistic text="good" value={count.good} />
              <Statistic text="neutral" value={count.neutral} />
              <Statistic text="bad" value={count.bad} />
              <Statistic text="all" value={totalCount} />
              <Statistic
                text="average"
                value={(count.good - count.bad) / totalCount}
              />
              <Statistic
                text="positive"
                value={(count.good * 100) / totalCount + "%"}
              />
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [goodCount, setGoodCount] = useState(0);
  const [neutralCount, setNeutralCount] = useState(0);
  const [badCount, setBadCount] = useState(0);

  const handleClickOnGood = () => setGoodCount(goodCount + 1);
  const handleClickOnNeutral = () => setNeutralCount(neutralCount + 1);
  const handleClickOnBad = () => setBadCount(badCount + 1);

  const click = {
    good: handleClickOnGood,
    neutral: handleClickOnNeutral,
    bad: handleClickOnBad,
  };
  const count = { good: goodCount, neutral: neutralCount, bad: badCount };

  return (
    <div>
      <FeedbackUI onClick={click} />
      <Statistics count={count} />
    </div>
  );
};

export default App;

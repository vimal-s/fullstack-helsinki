import { useState } from "react";

const Anecdote = (props) => (
  <div>
    <h1>{props.title}</h1>
    <p>{props.content}</p>
    <p>has {props.voteCount} votes</p>
  </div>
);

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>;

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [selected, setSelected] = useState({
    index: 0,
    votes: new Array(7).fill(0),
  });

  const randomAnecdote = () =>
    setSelected({
      ...selected,
      index: Math.floor(Math.random(0, 1) * anecdotes.length),
    });

  const updateVotes = () => {
    const votes = [...selected.votes];
    votes[selected.index]++;
    setSelected({ ...selected, votes: votes });
  };

  // todo: when votes tie the left most one is selected using this approach,
  //       because maxVotesIndex starts from 0 on every re-render
  let maxVotesIndex = 0;
  selected.votes.forEach((value, index, array) => {
    if (array[maxVotesIndex] < value) {
      maxVotesIndex = index;
    }
  });

  return (
    <div>
      <Anecdote
        title="Anecdote of the day"
        content={anecdotes[selected.index]}
        voteCount={selected.votes[selected.index]}
      />
      <Button onClick={updateVotes} text="vote" />
      <Button onClick={randomAnecdote} text="give me a random anecdote" />
      <Anecdote
        title="Anecdote with most votes"
        content={anecdotes[maxVotesIndex]}
        voteCount={selected.votes[maxVotesIndex]}
      />
    </div>
  );
};

export default App;

import { useState } from 'react';
import css from './App.module.css';
import CafeInfo from '../CafeInfo/CafeInfo';
import VoteOptions from '../VoteOptions/VoteOptions';
import type { Votes } from '../type/Votes';
import VoteStasts from '../VoteStats/VoteStats';
import Notification from '../Notification/Notification';



export default function App() {
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0
  });

  const handleVote = (type: keyof Votes) => {
    setVotes ({...votes, [type]: votes[type] +1});
  };

  const resetVotes = () => {
    setVotes({good: 0,
    neutral: 0,
    bad: 0} );
  }

//   const totalVotes = (type: keyof Votes) => {
//     return votes.good + votes.neutral + votes.bad;
//   }
   const totalVotes : number = votes.good + votes.neutral + votes.bad;
   const positiveRate = totalVotes ? Math.round((votes.good/ totalVotes) * 100):0;


  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions onVote={handleVote} onReset={resetVotes} canReset={ totalVotes === 0 ? false : true}/>
      {totalVotes === 0 ? <Notification /> : <VoteStasts votes = {votes} totalVotes = {totalVotes} positiveRate = {positiveRate}/>}
    </div>
  );
}
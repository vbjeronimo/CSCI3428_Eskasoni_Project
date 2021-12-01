import WordList from "./WordList";
import { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const VoteScreen = ({socket}) => {
    const [currentCategory, setCurrentCategory] = useState("");
    const [answers, setCurrentAnswers] = useState([]);
    const [categoryNumber, setCategoryNumber] = useState(0);
    const location = useLocation();

    //this will only run on the first render, getting the ball rolling
    //subsequent calls will be done by the 'next' button
    useEffect(() => {
        socket.emit('request_category/answers', categoryNumber);
    }, [location]);

    //this will handle distributing the new category/ answers into the components
    socket.on("receive_category/answers", (answers) => {
        //set the new currentCategory
        setCurrentCategory(answers[0].category);
        setCurrentAnswers(answers.slice(1));
    });

    socket.on("receive_updated_scores", (answers) => {
        setCurrentAnswers(answers.slice(1));
    });

    const handleNextCategory = () => {
        setCategoryNumber(categoryNumber + 1);
        socket.emit('request_category/answers', categoryNumber);
    };

    const vote = (scoreDifference, player) => {
        socket.emit("updateVoteScore", answers, player, scoreDifference);
    };

    return (
        <div className="VoteScreen">
            <div className="VoteCardTitle">
                <h2>{currentCategory}</h2>
                <button className="nextCategorybtn" onClick={handleNextCategory}>Next</button>
            </div>
            <WordList answers={answers} vote={vote}/>
        </div>
    );
}

export default VoteScreen;
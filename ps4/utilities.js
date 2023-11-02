import _, { set } from 'lodash';
import { DateTime } from "luxon";

function fetchWithCache(url, options = {}, cacheDuration = 1000 * 60 * 60) { // Default cache duration is 1 hour
    // Utility function to create a Response object from data (like fetch() would)
    function getResponseObject(data) {
        return new Response(new Blob([JSON.stringify(data)]));
    }

    const cachedData = localStorage.getItem(url); // Check if we have cached data for this URL

    if (cachedData) { // If we do...
        const { timestamp, data } = JSON.parse(cachedData); // Parse the data from the cache
        // Note: This uses destructuring syntax. It's equivalent to:
        // const parsedCachedData = JSON.parse(cachedData);
        // const timestamp = parsedCachedData.timestamp;
        // const data = parsedCachedData.data;

        if (Date.now() - timestamp < cacheDuration) { //...and it's not expired,
            return Promise.resolve(getResponseObject(data)); // Return a promise whose value is the stored data
        } else { // it has expired, so remove it
            localStorage.removeItem(url);
        }
    }

    // If we don't have cached data or it's expired, fetch it from the network
    return fetch(url, options)
        .then((response) => response.json()) // Parse the JSON data from the response
        .then((data) => {
            localStorage.setItem(url, JSON.stringify({ // Store the data in localStorage with a timestamp
                timestamp: Date.now(),
                data
            }));
            return getResponseObject(data);
        });
}

document.querySelector('body').prepend(document.createElement('h2'));
document.querySelector('body').prepend(document.createElement('h1'));
console.log(document.querySelector('body'));
const header = document.querySelector('h1');
const timer = document.querySelector('h2')

const timeOut = DateTime.now().plus({minutes:1}).toLocaleString(DateTime.TIME_SIMPLE);

let timeLeft = DateTime.fromFormat(timeOut, 'h:mm a').diff(DateTime.now(), ['minutes','seconds']);
timer.innerText = `You have until ${timeOut} to answer the questions. You have ${timeLeft.toFormat('m:ss')} time left`
updateTime();
async function updateTime() {
    const timeNow = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    header.innerText = timeNow;
    console.log(timeOut);

    timeLeft = DateTime.fromFormat(timeOut, 'h:mm a').diff(DateTime.now(), ['minutes','seconds']);
    timer.innerText = `You have until ${timeOut} to answer the questions. You have ${timeLeft.toFormat('m:ss')} time left`
    if (timeLeft.minutes == 0 && timeLeft.toFormat('s') == 0) {
        window.alert(`Time is up! Your Score: ${qCorrect} of ${qCount}\nClose to try again!`)
        location.reload()
    }
    
}



let qCount = 0;
let qCorrect = 0;
const score = document.querySelector('#score');
async function play() {
    
    setInterval(updateTime, 1000);
    
    const response = await fetchWithCache("https://the-trivia-api.com/v2/questions");
    const value = await response.json();
    
    const body = document.querySelector('body')
    let correctAnswers = [];
    for (let i = 0; i < value.length; i++) {
        const question = document.createElement('p');
        question.innerText = value[i].question.text;

        let qlist = [];
    
        for (let y = 0; y < value[i].incorrectAnswers.length; y++) {
            qlist.push(value[i].incorrectAnswers[y]);
        }
        qlist.push(value[i].correctAnswer.trim());
        correctAnswers.push(value[i].correctAnswer.trim());
        qlist = _.shuffle(qlist);
        
        const answers = document.createElement('ul');
        for (let y = 0; y < qlist.length; y++){
            const answer = document.createElement('li')
            const button = document.createElement('button');
           
            button.innerText = qlist[y];
            answer.appendChild(button);

            answers.appendChild(answer);
            

        }
        
        body.append(question, answers);
        
        answers.addEventListener('click', (event) => {

            const clickedAnswer = event.srcElement.innerText;
            
            if (event.srcElement.localName == 'button'){
                object = event.srcElement.parentElement;
                qObjectlist = object.parentElement.getElementsByTagName("button");
                for (let x = 0; x < qObjectlist.length; x++){
                    qObjectlist[x].disabled = true;
                }
                console.log(correctAnswers)
                console.log(clickedAnswer)
                if (correctAnswers.includes(clickedAnswer)) {
                    object.append('👈', ('✔️'));
                    qCount++;
                    qCorrect++;


                }
                else {
                    object.append('❌');
                    for (let x = 0; x < qObjectlist.length; x++) {
                        


                        if (correctAnswers.includes(qObjectlist[x].innerText)){
                            qObjectlist[x].parentElement.append('👈');
                        }
                    }
                    qCount++;
                    
                }
        
                score.innerText = `Your Score: ${qCorrect} of ${qCount}`;
            }

        });
    
        
    }

}

play();
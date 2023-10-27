function shuffleArray(array) {
    const shuffledArray = array.slice(); // Copy the array

    // Shuffle the copy of the array using https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
    for (let i = shuffledArray.length - 1; i > 0; i--) { // For each index,
        const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements i and j
    }
    return shuffledArray; // Return the shuffled copy
}

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

let qCount = 0;
let qCorrect = 0;
const score = document.querySelector('#score');
async function play() {
    const response = await fetchWithCache("https://the-trivia-api.com/v2/questions");
    const value = await response.json();
    
    const body = document.querySelector('body')
    let correctAnswers = [];
    for (i = 0; i < value.length; i++) {
        const question = document.createElement('p');
        question.innerText = value[i].question.text;

        let qlist = [];
    
        for (y = 0; y < value[i].incorrectAnswers.length; y++) {
            qlist.push(value[i].incorrectAnswers[y]);
        }
        qlist.push(value[i].correctAnswer);
        correctAnswers.push(value[i].correctAnswer);
        qlist = shuffleArray(qlist);
        
        const answers = document.createElement('ul');
        for (y = 0; y < qlist.length; y++){
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
                console.log(event.srcElement.parentElement.parentElement);
                object = event.srcElement.parentElement;
                qObjectlist = object.parentElement.getElementsByTagName("button");
                for (x = 0; x < qObjectlist.length; x++){
                    qObjectlist[x].disabled = true;
                }

                if (correctAnswers.includes(clickedAnswer)) {
                    object.append('👈', ('✔️'));
                    qCount++;
                    qCorrect++;


                }
                else {
                    object.append('❌');
                    for (x = 0; x < qObjectlist.length; x++) {
                        console.log(qObjectlist[x]);
                        if (correctAnswers.includes(qObjectlist[x].innerText)){
                            qObjectlist[x].parentElement.append('👈');
                        }
                    }
                    qCount++;

                }

                score.innerText = `Your Score: ${qCorrect} of ${qCount}`
            }

        });
    }
}

play();
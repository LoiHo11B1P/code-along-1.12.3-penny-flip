// TODO: Declare any global variables we need


document.addEventListener('DOMContentLoaded', function () {
    // This is just a sanity check to make sure your JavaScript script is getting loaded
    // You can remove it once you see it in your browser console in the developer tools
    console.log('Hi')

    // TODO: Add event listener and handler for flip and clear buttons
    let coinFlipButton = document.querySelector('#flip-coin');
    coinFlipButton.addEventListener('click', function () {
        flipTheCoin();
    })
    let clearScoreButton = document.querySelector('#clear-score');

    let coinImage = document.querySelector('#coin-image');

    let statusMessage = document.querySelector('#flip-result');


    let coinFace = [ 
        {   
            name: 'heads', 
            source: 'assets/images/penny-heads.jpg'
        },
        {   
            name: 'tails',
            source: 'assets/images/penny-tails.jpg'
        }
    ]

    let scoreStat = {
        heads: {
            score: 0,
            percentage: 0
        },
        tails: {
            score: 0,
            percentage: 0
        },
        totalFlip: 0
    }

    // Flip Button Click Handler
        // TODO: Determine flip outcome
    function flipTheCoin () {
       
        let randomFlip = Math.floor(Math.random()*2);
        //console.log(coinFace[randomFlip].name)
        updateCoinImage(coinFace[randomFlip].source)
        
       calculateScore(coinFace[randomFlip].name);
       statusMessage.textContent = `You Flipped ${coinFace[randomFlip].name}`

    }

        // TODO: Update image and status message in the DOM
    function updateCoinImage (imageSource) {
        coinImage.setAttribute('src', imageSource);
    }
        // Update the scorboard
        // TODO: Calculate the total number of rolls/flips
        // Make variables to track the percentages of heads and tails
        // TODO: Use the calculated total to calculate the percentages
        // HINT: Make sure not to divide by 0! (if total is 0, percent will be 0 as well)
        // TODO: Update the display of each table cell

    function calculateScore (coinFace) {
        scoreStat.totalFlip++;
        scoreStat[coinFace].score++
        
        if(scoreStat.totalFlip > 0) {
            
            let percentage = Math.round(100*(scoreStat[coinFace].score/scoreStat.totalFlip))
            //console.log(percentage)
            scoreStat[coinFace].percentage = percentage;

            document.querySelector(`#${coinFace}`).textContent = scoreStat[coinFace].score;
            document.querySelector(`#${coinFace}-percent`).textContent = (scoreStat[coinFace].percentage).toString()+'%';

            // recalculate the percentage for the coin face that didn't come up during the flip
            if (coinFace == 'heads') {
                scoreStat.tails.percentage = 100 - percentage;
                document.querySelector(`#tails-percent`).textContent = ( scoreStat.tails.percentage).toString()+'%';
            } else {
                scoreStat.heads.percentage = 100 - percentage;
                document.querySelector(`#heads-percent`).textContent = ( scoreStat.heads.percentage).toString()+'%';
            }

        }

    }


    // Clear Button Click Handler
        // TODO: Reset global variables to 0
        // TODO: Update the scoreboard (same logic as in flip button click handler)
    const clearButton = document.querySelector('#clear-score');
    clearButton.addEventListener('click', function () {
        scoreStat.heads.score = 0;
        scoreStat.heads.percentage = 0;
        scoreStat.tails.score = 0;
        scoreStat.tails.percentage = 0;
        scoreStat.totalFlip = 0

        document.querySelector(`#tails-percent`).textContent = scoreStat.tails.percentage+'%';
        document.querySelector(`#heads-percent`).textContent = scoreStat.heads.percentage+'%';
        document.querySelector(`#tails`).textContent = scoreStat.tails.score;
        document.querySelector(`#heads`).textContent = scoreStat.heads.score;
        document.querySelector('#flip-result').textContent = "Let's Get Rolling!"
        


    })

})
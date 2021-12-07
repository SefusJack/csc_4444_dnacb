// Step 2: set your neural network options
const options = {
    task: 'classification'
}

// Step 3: initialize your neural network
const nn = ml5.neuralNetwork(options);

function loadData(path)
{
    const modelInfo = {
        model: 'brain/'+path+'/model.json',
        metadata: 'brain/'+path+'/model_meta.json',
        weights: 'brain/'+path+'/model.weights.bin',
      };
    nn.load(modelInfo, finishedLoading)
}
function finishedLoading(){
    console.log("Done Loading...")
}

loadData("")
// Step 4: add data to the neural network
function trainBot(_data)
{
    _data.forEach(item => {
        const inputs = {
        currentpos: item.currentpos, 
        movemade: item.movemade
        };
        const output = {
        result: item.result
        };

        nn.addData(inputs, output);
    });
    // Step 5: normalize your data;
    nn.normalizeData();

    // Step 6: train your neural network
    const trainingOptions = {
        epochs: 32,
        batchSize: 18
    }
    nn.train(trainingOptions, finishedTraining);

}
// Step 7: use the trained model
function finishedTraining(){
    console.log("Done Training...")
    nn.save()
}
var turn = ""
// Step 8: make a classification
async function classify(boardfen, move){
    const input = {
    currentpos: boardfen, 
    movemade: move
    }
    try 
    {
        return await nn.classify(input);
    } 
    catch (error) 
    {
        return null
    }
}

async function getMLMove(boardPosition, possibleMoves, prevmove)
{
    var game = new Chess(boardPosition)
    var arr = []
    for(var i = 0; i < possibleMoves.length; i++)
    {
        game = new Chess(boardPosition)
        var targetMove = possibleMoves[i];
        game.move(targetMove)
        fen = game.fen()
        if(fen.indexOf(" w ") != -1)
        {
            turn = "b"
        }
        if(fen.indexOf(" b ") != -1)
        {
            turn = "w"
        }
        arr.push(await classify(prevmove, targetMove))
    }
    bestMove = getBestMove(arr)
    if(bestMove != null)
    {
        console.log("The ML bot had the most confidence in: " + possibleMoves[bestMove])
        return possibleMoves[bestMove]
    }
    else
    {
        var randomIdx = Math.floor(Math.random() * possibleMoves.length)
        return possibleMoves[randomIdx]
    }
}

function getBestMove(_arr)
{
    white = []
    black = []
    draw = []
    //test
    for(var i = 0; i < _arr.length; i++)
    {
        if(_arr[i] != null)
        {
            if(_arr[i][0].label == 'black')
            {
                black.push([_arr[i][0].label, _arr[i][0].confidence, i])
            }
            else if(_arr[i][0].label == 'white')
            {
                white.push([_arr[i][0].label, _arr[i][0].confidence, i])
            }
            else if(_arr[i][0].label == 'draw')
            {
                draw.push([_arr[i][0].label, _arr[i][0].confidence, i])
            }
        }
    }
    if(turn == "w")
    {
        if(white.length != 0)
        {
            white.sort(function(a,b){
                return b[1]-a[1]
            });
        }
        if(black.length != 0)
        {
            black.sort(function(a,b){
                return a[1]-b[1]
            });
        }
        if(draw.length != 0)
        {
            draw.sort(function(a,b){
                return b[1]-a[1]
            });
        }
        temp = [].concat(white, draw, black);
        if(temp.length != 0)
        {
            return temp[0][2]
        }
        else
        {
            return null
        }
    }
    if(turn == "b")
    {
        if(black.length != 0)
        {
            black.sort(function(a,b){
                return b[1]-a[1]
            });
        }
        if(white.length != 0)
        {
            white.sort(function(a,b){
                return a[1]-b[1]
            });
        }
        if(draw.length != 0)
        {
            draw.sort(function(a,b){
                return b[1]-a[1]
            });
        }
        temp = [].concat(black, draw, white);
        console.log(temp)
        if(temp.length != 0)
        {

            return temp[0][2]
        }
        else
        {
            return null
        }
    }
}
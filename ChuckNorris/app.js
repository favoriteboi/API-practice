const getJokes = async () => {
  try {
    const jokesData = await fetch ('https://api.chucknorris.io/jokes/random', {
      headers: {
        Accept: 'application/json' //tells the API to only send json files
      }
    });
    
    const jokesInfo = await jokesData.json() //converts to API to JS Object
    document.getElementById('loadingJoke')
      .innerHTML = jokesInfo.value;
    //console.log(jokesInfo.value)
  }
  catch(error) {
    console.log(error)
  }
  
}

document.getElementById('loadJokeBtn')
  .addEventListener('click', getJokes)
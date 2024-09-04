const randomJokeHTMLElement = document.querySelector('.random-joke');
const selectJokeHTMLElement = document.querySelector('#categories');
const buttonEvent = document.querySelector('.generate-joke-button');

const base_url = "https://api.chucknorris.io/jokes"
let selectedCategories = null;

const fetchRandomJoke = async (categories = '') => {
    try {
        const response = await fetch(`${base_url}/random?categories=${categories}`)
        const data = await response.json()
        return data
    } catch (error){
    
    throw new Error("Something went wrong!")

    }
}




const fetchCategories = async () => { 
    try {
        const response = await fetch(`${base_url}/categories`)
        const data = await response.json()
        return data
    } catch (error){
    
        throw new Error("Something went wrong!")

    }
}



const displayRandomJoke = async (categories) => {
    const joke = await fetchRandomJoke()
    console.log(joke)   
    console.log(randomJokeHTMLElement)
    randomJokeHTMLElement.textContent = joke.value
}

const fillSelectWithOptions = async () => {
    const categories = await fetchCategories()
    console.log(categories)

    if (!categories) return


    categories.forEach((category) => {
        const option = new Option(category, category)
        selectJokeHTMLElement.append(option)
    })
}




selectJokeHTMLElement.addEventListener('change', async (event) => {
    selectedCategories = event.currentTarget.value
    await fetchRandomJoke(selectedCategories)
})



buttonEvent.addEventListener('click', async () => {
    const response = await fetchRandomJoke(selectedCategories)
    randomJokeHTMLElement.textContent = response.value
})


displayRandomJoke()
fetchCategories()
fillSelectWithOptions()
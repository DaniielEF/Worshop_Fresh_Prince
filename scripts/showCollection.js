import { deleteData } from "./deleteData.js";
import { patchData } from "./patchData.js";


export const showCollection = (contenedor, datos) => {
  contenedor.innerHTML = ''
  datos.forEach((movie) => {
    const movieDiv = document.createElement('div');
    movieDiv.style.width = '6rem';

    movieDiv.innerHTML = `
       <img src=${movie.Poster} id= ${movie.id} class="moviePoster" alt=${movie.Title}>
    `
//Manejar el click en las peliculas para entrar al detalle
    const moviePoster = movieDiv.querySelector('.moviePoster')

    moviePoster.addEventListener('click', (e)=>{
        //Almacenar en el local storage
        localStorage.setItem('selectedMovie',JSON.stringify(movie))
        window.location.href='../pages/movieDetail.html'        
    })

    // const moviePoster = movieDiv.querySelector('.moviePoster');
    // moviePoster.addEventListener('click',(e)=>{
    //     console.log(e.target)
    // })

    // // Código para cargar valores iniciales en el formulario para Editar
    // const editButton = movieDiv.querySelector('.editButton');

    // editButton.addEventListener('click', (e) => {
    //   const edittingHero = datos.find((hero) => hero.id === e.target.id);
  
    //   document.getElementById(`editComicName${movie.id}`).value = edittingHero.name;
    //   document.getElementById(`editHeroName${movie.id}`).value = edittingHero.superhero;
    //   document.getElementById(`editPublisher${movie.id}`).value = edittingHero.publisher;
    //   document.getElementById(`editAlter_ego${movie.id}`).value = edittingHero.alter_ego;
    //   document.getElementById(`editFirst_appearance${movie.id}`).value = edittingHero.first_appearance;
    //   document.getElementById(`editImage${movie.id}`).value = edittingHero.image;
    // }) 


    contenedor.appendChild(movieDiv)
  })
}
import Course from "./Course.js";
import Class from './Class.js';
import Student from './Student.js'
import Instructor from "./Instructor.js";
import Administrator from "./Administrator.js";


const cardsContainer = document.querySelector("#cards-container");
const search = document.querySelector("#searchInput");

addEventListener("keyup", handleSearch);

let courses = [];

console.log(await Course.readCourses());


function handleSearch(e){
    
    
    
}

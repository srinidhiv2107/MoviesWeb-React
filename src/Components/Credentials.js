import {v4 as uuidv4} from "uuid";

const myData =[
  {id: uuidv4(), name: "KGF Chapter 2", genre: "Action", rating: "10", isFavourite: false},
  {id: uuidv4(), name: "Leo", genre: "Thriller", rating: "10", isFavourite: false},
  {id: uuidv4(), name: "Mr Bean", genre: "Comedy", rating: "10", isFavourite: false},
  {id: uuidv4(), name: "Beast", genre: "Action", rating: "10", isFavourite: false},
  {id: uuidv4(), name: "Bolt", genre: "Family", rating: "10", isFavourite: false},
  {id: uuidv4(), name: "Oggy and the Cockroaches", genre: "Entertainment", rating: "10", isFavourite: false},
  {id: uuidv4(), name: "Kantara", genre: "Action", rating: "10", isFavourite: false},
  {id: uuidv4(), name: "Jai Bhim", genre: "Mystery", rating: "10", isFavourite: false},
  {id: uuidv4(), name: "The Conjuring", genre: "Horror", rating: "10", isFavourite: false},
  {id: uuidv4(), name: "The Nun", genre: "Horror", rating: "10", isFavourite: false},
  {id: uuidv4(), name: "Chaplin", genre: "Comedy", rating: "10", isFavourite: false},
  {id: uuidv4(), name: "Tom and Jerry", genre: "Comedy", rating: "10", isFavourite: false},
  {id: uuidv4(), name: "Mickey Mouse", genre: "Entertainment", rating: "10", isFavourite: false},
  {id: uuidv4(), name: "Black Stallion", genre: "Adventure", rating: "10", isFavourite: false},
  {id: uuidv4(), name: "The Nun 2", genre: "Horror", rating: "10", isFavourite: false},
  {id: uuidv4(), name: "Test 1", genre: "Action", rating: "10", isFavourite: false},
  {id: uuidv4(), name: "Test 2", genre: "Action", rating: "10", isFavourite: false},
  {id: uuidv4(), name: "Test 3", genre: "Action", rating: "10", isFavourite: false},
  {id: uuidv4(), name: "Test 4", genre: "Action", rating: "10", isFavourite: false},
  {id: uuidv4(), name: "Test 5", genre: "Action", rating: "10", isFavourite: false}
];
const  myGenres = {
  action: 8, thriller: 1, comedy: 3, family: 1, entertainment: 2, mystery: 1, horror: 3, adventure: 1
};

const titleCase = (text) => {
  return text.replace(/\w\S*/g, word => (
    word[0].toUpperCase() + word.slice(1).toLowerCase()
  ));
}

export {myData, myGenres, titleCase};

const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = new Array;

  
  app.get("/repositories", (request, response) => {

      return response.json(repositories)
    // TODO
  });
  
  app.post("/repositories", (request, response) => {
    const  { id = uuid(), title , url , techs, likes} = request.body
    const repositorie = {
      id,
      likes : Number(0),
      title , 
      url ,
      techs,
    }
    repositories.push(repositorie)

    return response.status(200).json(repositorie)

});

app.put("/repositories/:id", (request, response) => {

      const {id} = request.params

      const { title, url, techs, likes } = request.body

      const repositorieIndex  =  repositories.findIndex(repositorie =>  repositorie.id === id );

      if(repositorieIndex < 0) { 
        return response.status(400).json({message : 'not found '}) 
      };

      const repositorie = {
        id,
        title,
        url,
        techs,
      }
      if(likes ==! repositories.likes) {
        response.status(400).json({err : `not permited`})
      }
      repositories[repositorieIndex] = repositorie

      return response.json(repositorie)

});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params
  const repositorieIndex  =  repositories.findIndex(repositorie =>  repositorie.id === id );

  if(repositorieIndex < 0) { 
    return response.status(400).json({message : 'not found '}) 
  };

   repositories.splice(repositorieIndex , 1)

   return response.status(204).json({message : 'deleted susseful'});
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositorie = repositories.find((rep) => rep.id === id);
  if(!repositorie) {
    response.status(400).json({err : 'not permited '})
  }
  repositorie.likes += 1;

  return response.json(repositorie.likes);
});

module.exports = app;

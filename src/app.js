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
    const { title, url, techs } = request.body;
    const data = { id: uuid(), title, url, techs, likes: 0 };
    
    repositories.push(data);
    
    return response.json(data)
  });

  app.put("/repositories/:id", (request, response) => {
    const { title, url, techs } = request.body;
    const {id} = request.params;
    
    let repo = repositories.find( repo => repo.id === id )
     
    if (!repo)
      return response.status(400).json({ error: "Repository not found." })
    
    repo = {...repo, title, url, techs}
  
    return response.json(repo)
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
  const { id } = request.params

  const repository = repositories.find( repository => repository.id === id )
  
  if (!repository)
    return response.status(400).json({ error: "Repository not found." })
  
  repository.likes += 1

  return response.json(repository)
});

module.exports = app;

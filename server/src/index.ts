import express from 'express';
const PORT = 8080;
const main = async () => {
  const app = express();
  
  app.listen(PORT, () => {
    console.log(`server started on ${PORT}`)
  });
}

main();

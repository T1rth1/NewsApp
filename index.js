import axios from "axios";
import bodyParser from "body-parser";
// import cheerio from "cheerio";
import express from "express";
const app = express();
const port = 3000;

// i wanna improve the search bar and add a back button..for go to the home route..
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const apiKey = "647c5739419d42e28958c8c45fb960b1";
app.get('/', async(req,res) =>{
    // res.render("index.ejs");
    try {
        const result = await axios.get(`https://newsapi.org/v2/everything?q=apple&from=2023-10-02&to=2023-10-02&sortBy=popularity&apiKey=${apiKey}`);
        res.render("index.ejs", {
            json:result.data
        });
        // console.log(result.data);
        // console.log(result.data.articles[0].title);
      } catch (error) {
        if(error.response){
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);}
        else if(error.requiest){
            console.log(err.requiest);
        }else{
            console.log("Error", err.mesaage);
        }

        res.status(500);
      }
});
  // app.get('/articles/:id', async (req, res) => {
  //   try {
  //     // Fetch the HTML content from the external URL
  //     const index  = req.params; 
  //     console.log(index.id);
  //     const result = await axios.get(`https://newsapi.org/v2/everything?q=apple&from=2023-09-08&to=2023-09-08&sortBy=popularity&apiKey=${apiKey}`);
  //     const article = result.data.articles[index.id];
  //   //   const response = await axios.get(article.url);
  
  //   //  Parse the HTML content into a DOM object using jsdom
  //   //   const dom = new JSDOM(response.data, {
  //   //     url: article.url,
  //   //   });
  //   //   console.log(dom);
  //   await open(article.url);
  //   console.log(`Opened ${article.url} in the default web browser.`);
  //   } catch (error) {
  //     console.error('Error:', error);
  //     res.status(500).send('Internal Server Error');
  //   }
  // });
  app.post('/', async(req,res) =>{
    // res.render("index.ejs");
    let search = req.body.search;
    try {
        const result = await axios.get(`https://newsapi.org/v2/everything?q=${search}&sortBy=popularity&apiKey=${apiKey}`);
        // console.log(result.data);
        res.render("newsSearch.ejs", {
            json:result.data
        });
        // res.redirect("/");
        // console.log(result.data);
        // console.log(result.data.articles[0].title);
      } catch (error) {
        if(error.response){
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);}
        else if(error.requiest){
            console.log(err.requiest);
        }else{
            console.log("Error", err.mesaage);
        }

        res.status(500);
      }
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
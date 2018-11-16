import axios from "axios";


const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?&q=";
const APIKEY = "&api-key=d2e29213b6054f549f790d8b818c67eb";

export default {
  // Gets all books
  searchArticles: function(query) {
    return axios.get(BASEURL + query.searchTitle 
      +'&begin_date='+query.beginDate
      +'&end_date='+query.endDate 
      + APIKEY);
  },
  // Gets the book with the given id
  getSavedArticles: function() {
    return axios.get("/api/articles/");
  },
  // Deletes the book with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a book to the database
  saveArticle: function(Data) {
    return axios.post("/api/articles", Data);
  }
};

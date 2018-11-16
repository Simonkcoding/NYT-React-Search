import React, { Component } from 'react';
import API from "./utils/API";
import {
  //for article and savedlist
  ListGroup,
  ListGroupItem,
  //for search
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
// import {CSSTransition, TransitionGroup} from 'react-transition-group';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'


class App extends Component {

  state = {
    //search states
    searchTitle: "",
    beginDate: "",
    endDate: "",
    //display article states
    articles: [],
    //saved article states
    savedArticles: [],
    title: "",
    date: "",
    url: ""
  };

  // Loads all books  and sets them to this.state.books
  loadSavedArticles = () => {
    API.getSavedArticles()
      .then(res =>
        this.setState({ savedArticles: res.data, title: "", date: "", url: "" })
      )
      .catch(err => console.log(err));
  };

  //  // Handles updating component state when the user types into the input field
  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  handleFormSubmit = event => {
    event.preventDefault();
    // console.log(this.state.searchTitle)
    if (this.state.searchTitle) {
      API.searchArticles({
        searchTitle: this.state.searchTitle,
        beginDate: this.state.beginDate,
        endDate: this.state.endDate
      })
        .then(res => {
          this.setState({ articles: res.data.response.docs })
          console.log(this.state.articles)
        })
        .catch(err => console.log(err));

    }
  };

  handleSave = savedArticle => {
    API.saveArticle(savedArticle)
      .then(res => { 
        console.log(savedArticle)
        this.loadSavedArticles() 
      })
      .catch(err => console.log(err));
  }

componentDidMount(){
  this.loadSavedArticles() 
}

deleteSaved = (id) => {
  API.deleteArticle(id)
  .then(res => { 
    console.log(id)
    this.loadSavedArticles() 
  })
  .catch(err => console.log(err));
}
  render() {
    return (
      <div className="App">
        {/* Search */}
        <Card>
          <CardHeader>Find your articles</CardHeader>
          <CardBody>
            <Form onSubmit={this.handleFormSubmit}>
              <FormGroup>
                <Label for="item">Title</Label>
                <Input
                  type="text"
                  name="searchTitle"
                  placeholder="Donald Trump"
                  onChange={this.handleOnChange}
                />
                <Label for="item">Begin Date</Label>
                <Input
                  type="date"
                  name="beginDate"
                  onChange={this.handleOnChange}
                />
                <Label for="item">End Date</Label>
                <Input
                  type="date"
                  name="endDate"
                  onChange={this.handleOnChange}
                />
                <Button
                  color="dark"
                  style={{ marginTop: '2rem' }}
                  block
                >Search
              </Button>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
        {/* Display Articles */}
        <Card>
          <CardHeader>Results</CardHeader>
          <CardBody>
            <ListGroup>
              {this.state.articles.map(article => (
                <ListGroupItem
                  key={article.headline.print_headline}>
                  <Button className="save-btn"
                    color="danger"
                    size="sm"
                    onClick={() => {
                      let savedArticle = {
                        title: article.headline.print_headline,
                        url: article.web_url,
                        date: article.pub_date
                      }
                      this.handleSave(savedArticle)}}
                  >Save
                </Button>
                  <strong>
                    {article.headline.print_headline}
                  </strong>
                  <br />
                  Snippet: <br />
                  {article.snippet}
                  <br />
                  Url: <br />
                  <a href={article.web_url}>
                    {article.web_url}</a>
                    <br />
                  Date: <br />
                  {article.pub_date}
                </ListGroupItem>
              ))}
            </ListGroup>
          </CardBody>
        </Card>
        {/* Saved Artilces */}
        <Card>
          <CardHeader>Saved Articles</CardHeader>
          <CardBody>
            <ListGroup>
              {this.state.savedArticles.map(article => (
                <ListGroupItem>
                  <Button className="delete-btn"
                    color="danger"
                    size="sm"
                    onClick={() => this.deleteSaved(article._id)}
                  >Delete
                </Button>
                  {article.title}<br/>
                  URL: <br/>
                  {article.url}
              </ListGroupItem>
              ))}
            </ListGroup>
          </CardBody>
        </Card>

      </div>
    );
  }
}

export default App;

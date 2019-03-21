import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const APICOMPANIES = 'https://api-voadora.dev.tegra.com.br/flight/companies';
const APIFLIGHTS = 'https://api-voadora.dev.tegra.com.br/flight';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      companies: [],
      isLoading: false,
      error: null
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });

    try {
      const result = await axios.get(APICOMPANIES);

      this.setState({
        companies: result.data,
        isLoading: false
      });
    } catch (error) {
      this.setState({
        error,
        isLoading: false
      });
    }
  }

  

  handleSubmit(event) {
    
    event.preventDefault();
    //this.setState({ value: event.target.value })
    const data = new FormData(event.target);

    
    axios.post(APIFLIGHTS, { data })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }


  render() {
    const { companies, isLoading, error } = this.state;
    //this.companies == undefined ? ["", "Carregando..."] : this.companies; 
    console.log(this.companies);

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <label><br />
          Aeroporto de Origem:<br />
          <select value={this.state.value} ref="from">
            {companies.map(company => <option value={company.aeroporto} >{company.cidade} - {company.nome}</option>)}
          </select>
          </label>
        <label><br />
          Aeroporto de Destino:<br />
          <select value={this.state.value}  name="to" id="">
            {companies.map(company => <option value={company.aeroporto} >{company.cidade} - {company.nome}</option>)}
          </select>
        </label>
        <label><br />
          Aeroporto de Data<br />
          <input type="date" min="2019-03-10" max="2019-03-18" name="date" id="date" format="yyyy/MM/dd" />
        </label>
        <input type="submit" value="Buscar" />
      </form>
    );
  }
}
 
export default App;

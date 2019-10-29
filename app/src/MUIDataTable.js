
import React from 'react';
import MUIDataTable from "mui-datatables";

class DemoMUIDataTable extends React.Component {

    constructor(props, state){
        super(props)

        this.state = { columns: [], data: [] }
    }

    theData() {
        const url = 'https://gist.githubusercontent.com/artystable/819ba3d58718e6f1a2cbc64b003bf55d/raw/0b3a85de5159c1f8c51d2c6f29c39e34aebd567d/test-gist-obj.json'
    
        const testData = fetch(url)
                              .then(response => {
                                
                                return response.json()
                              })
                              .then(data => {
                                return data
                              })
                              .catch(err => {
                                // Handle error here
                                return 'Whoopsies!! Error: ' + err
                              })
        return testData
    }

    componentDidMount(){
      
      fetch(`https://gist.githubusercontent.com/artystable/819ba3d58718e6f1a2cbc64b003bf55d/raw/0b3a85de5159c1f8c51d2c6f29c39e34aebd567d/test-gist-obj.json`)
        .then(res => res.json())
        .then(json => this.setState({ columns: json.columns, data: json.data }));
    }

  render() {

    const options = {
      filterType: "dropdown",
      responsive: "scroll"
    };

    return (
        <div>
            {console.log(this.state.data)}
      <MUIDataTable
        title={"Invoice Manager"}
        data={this.state.data}
        columns={this.state.columns}
        options={options}
      />
      </div>
    );
  }
}

export default DemoMUIDataTable
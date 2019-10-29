import React, {useState} from 'react';
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
        //this.state.columns = await 
        // function theComlumns(){
        //     return this.theData()
        // }

        // const columns = theComlumns()
        // console.log(columns)


    //   fetch(`https://api.coinmarketcap.com/v1/ticker/?limit=10`)
    //     .then(res => res.json())
    //     .then(json => this.setState({ data: json }));
  

      fetch(`https://gist.githubusercontent.com/artystable/819ba3d58718e6f1a2cbc64b003bf55d/raw/0b3a85de5159c1f8c51d2c6f29c39e34aebd567d/test-gist-obj.json`)
        .then(res => res.json())
        .then(json => this.setState({ columns: json.columns, data: json.data }));



        // this.setState({
        //     columns: ["Name", "Title", "Location", "Age", "Salary"],
        //     data: [
        //             ["Aaren Rose", "Business Consultant", "Toledo", 28, "$75,000"],
        //     ]
        //     //this.getData().columns
        // })

    }

/* 
    setData() {
        this.setState({
            data: await getData()
        });
    }
 */

  render() {

    
/*     (async () => {
        const apiInvoiceData = getMockUpData()
        const columns = apiInvoiceData.columns
        const data = apiInvoiceData.data
    })(); */

    const columns = ["Name", "Title", "Location", "Age", "Salary"];


    const data = [
      ["Gabby George", "Business Analyst", "Minneapolis", 30, "$100,000"],
      ["Aiden Lloyd", "Business Consultant", "Dallas", 55, "$200,000"],
      ["Jaden Collins", "Attorney", "Santa Ana", 27, "$500,000"],
      ["Franky Rees", "Business Analyst", "St. Petersburg", 22, "$50,000"],
      ["Aaren Rose", "Business Consultant", "Toledo", 28, "$75,000"],
      [
        "Blake Duncan",
        "Business Management Analyst",
        "San Diego",
        65,
        "$94,000"
      ],
      ["Frankie Parry", "Agency Legal Counsel", "Jacksonville", 71, "$210,000"],
      ["Lane Wilson", "Commercial Specialist", "Omaha", 19, "$65,000"],
      ["Robin Duncan", "Business Analyst", "Los Angeles", 20, "$77,000"],
      ["Mel Brooks", "Business Consultant", "Oklahoma City", 37, "$135,000"],
      ["Harper White", "Attorney", "Pittsburgh", 52, "$420,000"],
      ["Kris Humphrey", "Agency Legal Counsel", "Laredo", 30, "$150,000"],
      ["Frankie Long", "Industrial Analyst", "Austin", 31, "$170,000"],
      ["Brynn Robbins", "Business Analyst", "Norfolk", 22, "$90,000"],
      ["Justice Mann", "Business Consultant", "Chicago", 24, "$133,000"],
      [
        "Addison Navarro",
        "Business Management Analyst",
        "New York",
        50,
        "$295,000"
      ],
      ["Jesse Welch", "Agency Legal Counsel", "Seattle", 28, "$200,000"],
      ["Eli Mejia", "Commercial Specialist", "Long Beach", 65, "$400,000"],
      ["Gene Leblanc", "Industrial Analyst", "Hartford", 34, "$110,000"],
      ["Danny Leon", "Computer Scientist", "Newark", 60, "$220,000"],
      ["Lane Lee", "Corporate Counselor", "Cincinnati", 52, "$180,000"],
      ["Jesse Hall", "Business Analyst", "Baltimore", 44, "$99,000"],
      ["Danni Hudson", "Agency Legal Counsel", "Tampa", 37, "$90,000"],
      ["Terry Macdonald", "Commercial Specialist", "Miami", 39, "$140,000"],
      ["Justice Mccarthy", "Attorney", "Tucson", 26, "$330,000"],
      ["Silver Carey", "Computer Scientist", "Memphis", 47, "$250,000"],
      ["Franky Miles", "Industrial Analyst", "Buffalo", 49, "$190,000"],
      ["Glen Nixon", "Corporate Counselor", "Arlington", 44, "$80,000"],
      [
        "Gabby Strickland",
        "Business Process Consultant",
        "Scottsdale",
        26,
        "$45,000"
      ],
      ["Mason Ray", "Computer Scientist", "San Francisco", 39, "$142,000"]
    ];

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
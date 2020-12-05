import React from 'react';
import axios from 'axios';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            order: "inorder"
        };
    }
    async componentDidMount() {
        const employeeData = await axios.get("https://randomuser.me/api/?results=200&nat=us");
        console.log(employeeData.data.results);
        this.setState({
            data: employeeData.data.results
        });
    }

    renderRows = () => {
        //map through data and generate each row tr/td
        const rows = this.state.data.map(({ name, email, phone, picture, login, dob }) => {
            return (
                <tr key={login.uuid}>
                    <td className="image">
                        <img src={picture.medium} />
                    </td>
                    <td className="name">
                        <p>{name.first} {name.last}</p>
                    </td>
                    <td className="phone">
                        <p>{phone}</p>
                    </td>
                    <td className="email">
                        <p>{email}</p>
                    </td>
                    <td className="date">
                        <p>{dob.date.slice(0, 10)}</p>
                    </td>

                </tr>
            );
        });
        return rows;
    }

    handleSearch = async () => {
        //get the data
        const employeeData = await axios.get("https://randomuser.me/api/?results=200&nat=us");
        console.log(employeeData.data.results);
        this.setState({
            data: employeeData.data.results
        });
        //get user data input
        const searchedUser = document.querySelector('.search').value;
        //filter the this.state.data .filter()
        const filteredArray = this.state.data.filter((employee) =>
            employee.name.first.indexOf(searchedUser) > -1
        );
        //set data state to filteedArray
        this.setState({
            data: filteredArray
        });
    }

    toggleNameOrder = () => {
        let sortedArr;
        if (this.state.order === "inorder") {
            sortedArr = this.state.data.sort((a, b) => (a.name.first > b.name.first ? -1 : 1));
            this.setState({
                data: sortedArr,
                order: "out of order"
            })
        } else {
            sortedArr = this.state.data.sort((a, b) => (a.name.first < b.name.first ? -1 : 1));
            this.setState({
                data: sortedArr,
                order: "inorder"
            })
        }
    }



    render() {
        return (
            <div>
                <input className='search' onChange={this.handleSearch} type="text" />
                <table>
                    <tr>
                        <th className='table-header' onClick={this.toggleOrder}>Image</th>
                        <th className='table-header' onClick={this.toggleNameOrder}>Name</th>
                        <th className='table-header' onClick={this.toggleOrder}>Phone</th>
                        <th className='table-header' onClick={this.toggleOrder}>Email</th>
                        <th className='table-header' onClick={this.toggleOrder}>DOB</th>
                    </tr>
                    {this.renderRows()}
                </table>
            </div>
        );
    }
}
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Table, Button } from "reactstrap";
import axios from "axios";
export default class Example extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
        };
    }

    loadPost() {
        axios.get("http://127.0.0.1:8000/api/post").then((response) => {
            this.setState({
                posts: response.data,
            });

            // console.log(response);
        });
    }

    deletePost(id) {
        axios
            .delete("http://127.0.0.1:8000/api/post/" + id)
            .then((response) => {
                // console.log(response);
                this.loadPost();
            });
    }

    componentWillMount() {
        this.loadPost();
    }

    render() {
        //rendering the posts into individual table row
        let posts = this.state.posts.map((post) => {
            return (
                <tr key={post.id}>
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                    <td>{post.content}</td>
                    <td>
                        <Button
                            color="success"
                            size="sm"
                            outline
                            className="me-3 mr-2"
                        >
                            Edit
                        </Button>
                        <Button
                            color="danger"
                            size="sm"
                            outline
                            className="mr-2"
                            onClick={() => this.deletePost(post.id)}
                        >
                            Delete
                        </Button>
                    </td>
                </tr>
            );
        });

        console.log("This is the ");
        console.log(this.state.posts);
        return (
            <div className="container">
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {/* Inject the rendered row into the table */}
                    <tbody>{posts}</tbody>
                </Table>
            </div>
        );
    }
}

// export function Example() {
//     return (
//         <div className="container">
//             <Table>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Title</th>
//                         <th>Content</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr className="table-primary">
//                         <td>1</td>
//                         <td>React Post 1</td>
//                         <td>This is the first post using Reactstrap</td>
//                         <td>
//                             <Button
//                                 color="success"
//                                 size="sm"
//                                 outline
//                                 className="me-3"
//                             >
//                                 Edit
//                             </Button>
//                             <Button color="danger" size="sm" outline>
//                                 Delete
//                             </Button>
//                         </td>
//                     </tr>
//                 </tbody>
//             </Table>
//         </div>
//     );
// }

// export function Example2() {
//     return (
//         <div className="container">
//             <div className="row justify-content-center">
//                 <div className="col-md-8">
//                     <div className="card">
//                         <div className="card-header">Example 2 Component</div>

//                         <div className="card-body">
//                             I'm an example 2 component!
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// if (document.getElementById("example")) {
//     ReactDOM.render(<Example />, document.getElementById("example"));
// }

// if (document.getElementById("example2")) {
//     ReactDOM.render(<Example2 />, document.getElementById("example2"));
// }

if (document.getElementById("ExampleClass")) {
    ReactDOM.render(<Example />, document.getElementById("ExampleClass"));
}

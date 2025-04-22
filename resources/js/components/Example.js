import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
    Table,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Label,
    Input,
} from "reactstrap";
import axios from "axios";
export default class Example extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            newPostModal: false,
            newPostData: { user_id: "", title: "", content: "" },
            editPostModal: false,
            editPostData: { id: "", title: "", content: "" },
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

    toggleNewPostModal() {
        this.setState({ newPostModal: !this.state.newPostModal });
    }

    toggleEditPostModal(id, title, content) {
        let { editPostData } = this.state;
        editPostData.id = id;
        editPostData.title = title;
        editPostData.content = content;
        this.setState({
            editPostModal: !this.state.editPostModal,
            editPostData,
        });
    }

    addPost(user_id, title, content) {
        axios
            .post("http://127.0.0.1:8000/api/post/", {
                user_id,
                title,
                content,
            })
            .then((response) => {
                console.log(response);
                this.loadPost();
                this.toggleNewPostModal();
            });
    }

    editPost(id, title, content) {
        axios
            .put("http://127.0.0.1:8000/api/post/" + id, {
                title,
                content,
            })
            .then((response) => {
                // console.log(response);
                this.loadPost();
                this.toggleEditPostModal();
            });
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
                            onClick={() =>
                                this.toggleEditPostModal(
                                    post.id,
                                    post.title,
                                    post.content,
                                )
                            }
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
                {/* Add Post Modal */}
                <Modal isOpen={this.state.newPostModal}>
                    <ModalHeader
                        toggle={() => {
                            this.toggleNewPostModal.bind(this);
                            // this.toggleNewPostModal();
                        }}
                    >
                        Add New Post
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <Label for="user_id">User ID</Label>
                            <Input
                                id="user_id"
                                value={this.state.newPostData.user_id}
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    let { newPostData } = this.state;
                                    newPostData.user_id = e.target.value;
                                    this.setState({ newPostData });
                                }}
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input
                                id="title"
                                value={this.state.newPostData.title}
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    let { newPostData } = this.state;
                                    newPostData.title = e.target.value;
                                    this.setState({ newPostData });
                                }}
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="content">Content</Label>
                            <Input
                                id="content"
                                value={this.state.newPostData.content}
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    let { newPostData } = this.state;
                                    newPostData.content = e.target.value;
                                    this.setState({ newPostData });
                                }}
                            ></Input>
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            variant="primary"
                            onClick={() => {
                                this.addPost(
                                    this.state.newPostData.user_id,
                                    this.state.newPostData.title,
                                    this.state.newPostData.content,
                                );
                            }}
                        >
                            Save Post
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                this.toggleNewPostModal();
                            }}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>

                {/* Edit Post Modal */}
                <Modal isOpen={this.state.editPostModal}>
                    <ModalHeader
                        toggle={() => {
                            this.toggleEditPostModal.bind(this);
                        }}
                    >
                        Edit Post
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input
                                id="title"
                                value={this.state.editPostData.title}
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    let { editPostData } = this.state;
                                    editPostData.title = e.target.value;
                                    this.setState({ editPostData });
                                }}
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="content">Content</Label>
                            <Input
                                id="content"
                                value={this.state.editPostData.content}
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    let { editPostData } = this.state;
                                    editPostData.content = e.target.value;
                                    this.setState({ editPostData });
                                }}
                            ></Input>
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            color="success"
                            onClick={() => {
                                this.editPost(
                                    this.state.editPostData.id,
                                    this.state.editPostData.title,
                                    this.state.editPostData.content,
                                );
                            }}
                        >
                            Edit Post
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                this.toggleEditPostModal();
                            }}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>

                <Button
                    color="primary"
                    outline
                    className="mb-5"
                    onClick={() => {
                        this.toggleNewPostModal();
                    }}
                >
                    Add new post
                </Button>
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

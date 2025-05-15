// Student Name: Loke Weng Yan
// Student ID: 2103237
// Student Test Group: A
import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
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
            products: [],
            newProductModal: false,
            newProductData: {
                productTitle: "",
                productDesc: "",
                manufacturingDate: new Date(""),
                quantity: 0,
                user_id: "",
            },
        };
    }

    // Call the toggleNewProductModal() method before the component is mounted
    componentWillMount() {
        this.toggleNewProductModal();
    }

    // Method to toggle the Add New Product Modal
    toggleNewProductModal() {
        this.setState({ newProductModal: !this.state.newProductModal });
    }

    /**
     * Method to send axios POST request to add new product into database
     *
     * RESTful API endpoint URL : http://127.0.0.1:8000/api/product/
     * The HTTP request is routed to the ProductController method "store" based on the defined routes in the routes/api.php, which is:
     * Route::post('/product', [ProductController::class, "store"]);
     *
     * The data input of product title, description, manufacturing date, quantity and user id will be sent in the request body
     * The store method in the ProductController will create new Product in the product table in the database
     */
    addProduct(
        productTitle,
        productDesc,
        manufacturingDate,
        quantity,
        user_id,
    ) {
        axios
            .post("http://127.0.0.1:8000/api/product/", {
                productTitle,
                productDesc,
                manufacturingDate,
                quantity,
                user_id,
            })
            .then((response) => {
                // Response is returned back through the response.data
                // console.log(response.data);

                // Toggle the Add New Product Modal to close once the product is added successfully
                this.toggleNewProductModal();
            });
    }

    render() {
        return (
            <div className="container">
                {/* Add Product Modal */}
                <Modal isOpen={this.state.newProductModal}>
                    <ModalHeader
                        toggle={() => {
                            this.toggleNewProductModal.bind(this);
                        }}
                    >
                        Add New Product
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <Label for="productTitle">Product Title</Label>
                            <Input
                                id="productTitle"
                                value={this.state.newProductData.productTitle}
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    let { newProductData } = this.state;
                                    newProductData.productTitle =
                                        e.target.value;
                                    this.setState({ newProductData });
                                }}
                            ></Input>
                        </FormGroup>

                        <FormGroup>
                            <Label for="productDesc">Product Description</Label>
                            <Input
                                id="productDesc"
                                type="textarea"
                                value={this.state.newProductData.productDesc}
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    let { newProductData } = this.state;
                                    newProductData.productDesc = e.target.value;
                                    this.setState({ newProductData });
                                }}
                            ></Input>
                        </FormGroup>

                        <FormGroup>
                            <Label for="manufacturingDate">
                                Manufacturing Date
                            </Label>
                            <Input
                                id="manufacturingDate"
                                type="date"
                                value={
                                    this.state.newProductData.manufacturingDate
                                }
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    let { newProductData } = this.state;
                                    newProductData.manufacturingDate =
                                        e.target.value;
                                    this.setState({ newProductData });
                                }}
                            ></Input>
                        </FormGroup>

                        <FormGroup>
                            <Label for="quantity">Quantity</Label>
                            <Input
                                id="quantity"
                                value={this.state.newProductData.quantity}
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    let { newProductData } = this.state;
                                    newProductData.quantity = e.target.value;
                                    this.setState({ newProductData });
                                }}
                            ></Input>
                        </FormGroup>

                        <FormGroup>
                            <Label for="user_id">User ID</Label>
                            <Input
                                id="user_id"
                                value={this.state.newProductData.user_id}
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    let { newProductData } = this.state;
                                    newProductData.user_id = e.target.value;
                                    this.setState({ newProductData });
                                }}
                            ></Input>
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={() => {
                                this.addProduct(
                                    this.state.newProductData.productTitle,
                                    this.state.newProductData.productDesc,
                                    this.state.newProductData.manufacturingDate,
                                    this.state.newProductData.quantity,
                                    this.state.newProductData.user_id,
                                );
                            }}
                        >
                            Add Product
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                this.toggleNewProductModal();
                            }}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

// DOM Rendering Logic
if (document.getElementById("example")) {
    ReactDOM.render(<Example />, document.getElementById("example"));
}

import React, { useState, useEffect } from 'react'
import { createProductApi, getAllProductsApi } from '../../../apis/Api'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {

    // State for all fetched products
    const [products, setProducts] = useState([]) // array

    // Call API initially (Page Load) - Set all fetch products to state
    useEffect(() => {

        getAllProductsApi().then((res) => {
            // response : res.data.products (All Products)
            setProducts(res.data.products)


        }).catch((error) => {
            console.log(error)
        })

    }, [])
    console.log(products)

    // State for input fields
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productCategory, setProductCategory] = useState('')
    const [productDescription, setProductDescription] = useState('')

    // State for image
    const [productIamge, setProductIamge] = useState('')
    const [previewImage, setPreviewImage] = useState('')

    // image upload handler
    const handleImage = (event) => {
        const file = event.target.files[0]
        setProductIamge(file)  // for backend
        setPreviewImage(URL.createObjectURL(file))
    }

    // hnadle submit
    const handleSubmit = (event) => {
        event.preventDefault()

        // make a form data (txt, file)
        const formData = new FormData()
        formData.append('productName', productName)
        formData.append('productPrice', productPrice)
        formData.append('productCategory', productCategory)
        formData.append('productDescription', productDescription)
        formData.append('productImage', productIamge)

        // make a api call
        createProductApi(formData).then((res) => {
            // for successful api
            if (res.status === 201) {
                toast.success(res.data.message)
            }

        }).catch((error) => {
            if (error.response) {
                if (error.response.status === 400) {
                    toast.warning(error.response.data.message)
                } else if (error.response.status === 500) {
                    toast.error(error.response.data.message)
                } else {
                    toast.error("Something went wrong 1!")
                }

            } else {
                toast.error("Something went wrong!")
            }
        })
    }



    return (
        <>

            <div className='container mt-3'>
                <div className='d-flex justify-content-between'>
                    <h3>
                        Admin Dashboard
                    </h3>

                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Add Product
                    </button>

                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Create a new product.</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">

                                    <form action="">
                                        <label>Product Name</label>
                                        <input onChange={(e) => setProductName(e.target.value)} type="text" className='form-control mt-2' placeholder='Enter product name' />

                                        <label className='mt-2'>Product Price</label>
                                        <input onChange={(e) => setProductPrice(e.target.value)} type="number" className='form-control mt-2' placeholder='Enter product price' />

                                        <label className='mt-2'>Choose category</label>
                                        <select onChange={(e) => setProductCategory(e.target.value)} className='form-control mt-2'>
                                            <option value="plants">Plants</option>
                                            <option value="electronics">Electronics</option>
                                            <option value="gadgets">Gadgets</option>
                                            <option value="furniture">Furniture</option>
                                            <option value="clothing">Clothing</option>
                                        </select>

                                        <label className='mt-2'>Product Description</label>
                                        <textarea onChange={(e) => setProductDescription(e.target.value)} className='form-control mt-2' placeholder='Enter product description' />

                                        <label className='mt-2'>Choose Product Image</label>
                                        <input onChange={handleImage} type="file" className='form-control mt-2' />

                                        {/* Preview Image */}

                                        {
                                            previewImage && (
                                                <img src={previewImage} alt="preview" className='img-fluid rounded mt-3' />
                                            )
                                        }

                                    </form>
                                </div>

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button onClick={handleSubmit} type="button" class="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <table className='table mt-3'>
                    <thead className='table-dark'>
                        <tr>
                            <th>Product Image</th>
                            <th>Product Name</th>
                            <th>Product Price</th>
                            <th>Product Description</th>
                            <th>Product Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {
                            products.map((singleProduct) => (
                                <tr>
                                    <td>
                                        <img height={'50px'} width={'60px'} src={'http://localhost:5000/products/${singleProduct.productImage}'} alt="" />
                                    </td>   
                                    <td>{singleProduct.productName}</td>
                                    <td>{singleProduct.productPrice}</td>
                                    <td>{singleProduct.productCategory}</td>
                                    <td>{singleProduct.productDescription}</td>
                                    <td>
                                        <Link to={`/admin/update/${singleProduct._id}`} className='btn btn-primary'>Edit</Link>
                                        <button className='btn btn-danger ms-2'>Delete</button>
                                    </td>

                                </tr>

                            ))
                        }



                    </tbody>
                </table>
            </div>


        </>
    )
}

export default AdminDashboard

/* eslint-disable react-hooks/immutability */
import React, { useState } from 'react'
import './Addproduct.css'
import upload_area from '../../assets/upload_area.svg'

const Addproduct = () => {
    const [image,setImage]=useState(false)
    const [productDetails, setProductDetails] = useState({
        name:"",
        image:"",
        category:"men",
        new_price:"",   
        old_price:"",
    })
    const imagehandler=(e)=>{                    //selects a file
        setImage(e.target.files[0])
    }
    const changeHandler=(e)=>{
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }
    const Add_Product=async ()=>{
        console.log(productDetails)
        let responseData
        let product=productDetails

        let formData=new FormData()
        formData.append('product',image)

        await fetch('http://localhost:3000/upload',{
            method:'POST',
            headers:{
                Accept:'application/json',
            },
            body:formData            
        }).then((resp)=>resp.json()).then((data)=>{responseData=data})
        if(responseData.success)
        {
            product.image=responseData.image_url
            console.log(product)
            await fetch('http://localhost:3000/addproduct',{
            method: 'POST',     
            headers: {
            Accept: 'application/json',
            'Content-Type':'application/json',
            },
            body: JSON.stringify(product),            
        }).then((resp)=>resp.json()).then((data)=>{
            data.success?alert("Product Added"):alert("Failed")
        })
    }
}
    return (
    <div className="add-product">
        <div className="addproduct-itemfield">
            <p>Product title</p>
            <input value={productDetails.name} onChange={changeHandler} type='text' name='name' placeholder='Type Here'/>
        </div>
        <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>Price</p>
                <input value={productDetails.old_price} onChange={changeHandler} type='text' name='old_price' placeholder='Type Here'/>
            </div>
            <div className="addproduct-itemfield">
                <p>Offer Price</p>
                <input value={productDetails.new_price} onChange={changeHandler} type='text' name='new_price' placeholder='Type Here'/>
            </div>
        </div>
        <div className="addproduct-itemfield">
            <p>Product Category</p>
            <select  value={productDetails.category} onChange={changeHandler} name='category' className='add-product-selector'>
                <option value='men'>Men</option>
                <option value='women'>Women</option>
            </select>
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor="file-input">
           <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumnail-img'  alt=''/>  {/* < //creates temporary URL for preview. */}
            </label>
            <input onChange={imagehandler} type="file" name='image' id='file-input' hidden/>
            </div> 
            <button onClick={()=>{Add_Product()}} className='addproduct-btn'>ADD</button>
            </div>
  )
}

export default Addproduct
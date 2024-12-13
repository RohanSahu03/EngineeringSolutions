import React from 'react'
import { useLocation } from 'react-router-dom';

function ViewInventory() {
    const location = useLocation();
    const receivedData = location.state;
    console.log(receivedData)
  return (
    <div>
         <div className="row">
            <h4>Item Details</h4>
        </div>
        <div className="row  mt-5">
        <div className="col-md-6  text-start">
                <div className="row">
                    <div className="col-md-3 text-start">
                    <label htmlFor="" className='label1'>Sl.No.</label>
                    </div>
                    <div className="col-md-6 text-start">
                    <input type="text" name="" id="" value={receivedData?.slno} disabled className='input1'/>
                    </div>
                </div>
             
            </div>
            <div className="col-md-6  text-start">
                <div className="row">
                    <div className="col-md-3 text-start">
                    <label htmlFor="" className='label1'>Product Name</label>
                    </div>
                    <div className="col-md-6 text-start">
                    <input type="text" name="" id="" value={receivedData?.productname} disabled className='input1'/>
                    </div>
                </div>
             
            </div>
           
        </div>

        <div className="row  mt-5">
        <div className="col-md-6 text-start">
            <div className="row">
                    <div className="col-md-3">
                    <label htmlFor="" className='label1'>Description</label>
                    </div>
                    <div className="col-md-6">
                    <textarea type="text" name="" id="" value={receivedData?.description} disabled className='input1' style={{height:'60px'}}></textarea>
                    </div>
                </div>
            </div>
  
            <div className="col-md-6  text-start">
                <div className="row">
                    <div className="col-md-3 text-start">
                    <label htmlFor="" className='label1'>HSN Code</label>
                    </div>
                    <div className="col-md-6 text-start">
                    <input type="text" name="" id="" value={receivedData?.hsncode} disabled className='input1'/>
                    </div>
                </div>
             
            </div>
          
        </div>

        <div className="row  mt-5">
        <div className="col-md-6 text-start">
            <div className="row">
                    <div className="col-md-3">
                    <label htmlFor="" className='label1'>Purchase Price</label>
                    </div>
                    <div className="col-md-6">
                    <input type="text" name="" id="" value={receivedData?.purchaseprice} disabled className='input1'/>
                    </div>
                </div>
            </div>
  
            <div className="col-md-6  text-start">
                <div className="row">
                    <div className="col-md-3 text-start">
                    <label htmlFor="" className='label1'>Quantity</label>
                    </div>
                    <div className="col-md-6 text-start">
                    <input type="text" name="" id="" value={receivedData?.quantity} disabled className='input1'/>
                    </div>
                </div>
             
            </div>
          
        </div>


    </div>
  )
}

export default ViewInventory
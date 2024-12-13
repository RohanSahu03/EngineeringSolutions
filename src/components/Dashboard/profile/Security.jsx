import React from 'react'

function Security() {
  return (
    <div>
                <div className="container px-5">
          <div className="row text-start mt-5 ">
            <h3>Security</h3>
          </div>
 
            <div className="row justify-content-center mt-3 p-md-5 p-2" style={{boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',background:'aliceblue'}}>
            <div className="col-md-6 text-start ">
                <h4>Password</h4>
            </div>
            <div className="col-md-6 text-end ">
            <button type="button" class="btn btn-secondary">Reset Password</button>
            </div>

            </div>

     

        </div>
    </div>
  )
}

export default Security
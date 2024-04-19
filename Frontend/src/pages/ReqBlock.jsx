import React from 'react'

const ReqBlock = ({ data }) => {
  console.log(data)
  return (
    <div>
      <div className="card" style="width: 18rem;">
        <div className="card-body">
          <h5 className="card-title">From : {data.rescue_requester_id.name}</h5>
          <p className="card-text">Address : {data.rescue_requester_id.address}</p>
          <h6 className="card-subtitle mb-2 text-muted">From : </h6>
        </div>
      </div>
    </div>
  )
}

export default ReqBlock

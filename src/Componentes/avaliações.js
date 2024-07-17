import React ,{useEffect, useState} from "react";

export default function CardComponent  ({ imageUrl, softwareName, stars })  {
  return (
    <div className="col-md-4 d-flex justify-content-center">
      <div className="card" style={{ width: '18rem', height: '23rem', boxShadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none', marginTop: '50px' }}>
        <img src={imageUrl} className="card-img-top img-fluid mx-auto d-block" style={{ width: '70%', marginTop: '30px' }} alt="Software Icon" />
        <div className="card-body text-center">
          <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nisi lacus, venenatis at est id, tristique viverra mauris.</p>
          <p className="estrelas mb-2">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
          <p className="card-text mb-2">{softwareName}</p>
        </div>
      </div>
    </div>
  );
};


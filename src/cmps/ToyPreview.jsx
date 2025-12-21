import { Link } from "react-router-dom";
export function ToyPreview({ toy , onRemoveToy}) {

    return (
        <article>
            <h4>{toy.name}</h4>
            <img src="" alt="" />
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <p>Labels: <span>{toy.labels.join(', ')}</span></p>
            {toy.owner && (
                <p>
                    Owner: <Link to={`/user/${toy.owner._id}`}>{toy.owner.fullname}</Link>
                </p>
            )}
            <hr />
             <button onClick={() => onRemoveToy(toy._id)}>x</button>
             &nbsp; | &nbsp;
            <button><Link to={`/toy/edit/${toy._id}`}>Edit</Link></button>
             &nbsp; | &nbsp;
             <button><Link to={`/toy/${toy._id}`}>Details</Link></button>
        </article>
    )
}
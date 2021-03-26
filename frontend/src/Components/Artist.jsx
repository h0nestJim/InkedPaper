import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Artist = ({ key, artist }) => {
    return (
        <Card key={artist.id} className="my-3 p-3 rounded">

            <Card.Img src={artist.image} />

            <Card.Body>
                <Link to={`/product/${artist._id}`}>
                    <Card.Title as="div">
                        <h1>{artist.name}</h1>
                    </Card.Title>
                </Link>
                <Card.Text as="div" className="">
                    {artist.studio}
                </Card.Text>

                <Card.Text className="btn btn-outline-warning rounded m-3" as="div">
                    <a href={artist.social}><strong>Instagram</strong></a>
                </Card.Text>

                <Link className="btn btn-warning rounded m-3" to="/store">
                    <Card.Text as="div">
                        Shop Flash
                    </Card.Text>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default Artist
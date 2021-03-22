import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Artist from '../Components/Artist'
//replaced by redux
//import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { listArtists } from '../actions/artistActions'

const ArtistScreen = (location, history) => {
    //const [products, setProducts] = useState([])
    const dispatch = useDispatch()
    const artistList = useSelector(state => state.artistList)
    console.log(artistList)
    const { loading, error, artists } = artistList

    useEffect(() => {

        dispatch(listArtists())

    }, [dispatch])


    return (
        <>
            <h1 className="py-3">Artists</h1>
            {loading ? <h2>Loading...</h2> : error ? <h3>{error}</h3> : <Row>
                {artists.map(artist => (
                    <Col sm={12} md={6} lg={4}>
                        <Artist artist={artist} />
                    </Col>
                ))}

            </Row>}

        </>
    )
}

export default ArtistScreen

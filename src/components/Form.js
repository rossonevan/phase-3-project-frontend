import { React, useState } from "react";

function Form ({addReview, movie}) {
    
    const [form, setForm] = useState([])
    const [name, setName] = useState('')
    const [review, setReview] = useState('')
    const [rating, setRating] = useState(0)


    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:9292/reviews',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comment: review,
                rating: rating,
                name: name,
                id: movie.id
            })
        })
        .then((resp) => resp.json())
        .then(newReview => addReview(newReview))
    }

    

    return (
        <form className="review-submit" onSubmit={handleSubmit}>
            <input onChange={(e) => setRating(e.target.value)} className="input" name="rating" type="number" min="0" max="5" step="1" placeholder="Insert Rating Here" required />
            <textarea onChange={(e) => setReview(e.target.value)} className="input" name="review" type='text' placeholder="Write Your Review Here" maxLength='500' required />
            <input onChange={(e) => setName(e.target.value)} className="input" name="name" type="text" placeholder="Insert Name Here" required />
            <button type="submit" className="submit-button">Submit Review!</button>
        </form>
    )
}

export default Form;
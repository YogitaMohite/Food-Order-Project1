import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import MealService from '../../services/MealService';

const EditMealComponent = ({ meal, setMeal, selectedFile, setSelectedFile }) => {
    const [mealTypes, setMealTypes] = useState([]);

    useEffect(() => {
        MealService.getAllMealTypes()
            .then((res) => setMealTypes(res.data))
            .catch((err) => console.log(err));
    }, []);

    const handleChange = (e) => {
        setMeal({ ...meal, [e.target.name]: e.target.value });
    };

    const handleTypeChange = (e) => {
        const selected = mealTypes.find((mt) => mt.id === parseInt(e.target.value));
        setMeal({ ...meal, mealType: selected });
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        console.log('Selected file:', e.target.files[0]);
    };

    return (
        <Form>
            <Form.Group className='mb-2'>
                <Form.Label>Name:</Form.Label>
                <Form.Control
                    type='text'
                    name='name'
                    value={meal.name}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className='mb-2'>
                <Form.Label>Description:</Form.Label>
                <Form.Control
                    type='text'
                    name='description'
                    value={meal.description}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className='mb-2'>
                <Form.Label>Price:</Form.Label>
                <Form.Control
                    type='number'
                    name='price'
                    value={meal.price}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className='mb-2'>
                <Form.Label>Type:</Form.Label>
                <Form.Select
                    value={meal.mealType?.id || ''}
                    onChange={handleTypeChange}
                >
                    {mealTypes.map((mt) => (
                        <option key={mt.id} value={mt.id}>
                            {mt.typeName}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Form.Group className='mb-2'>
                <Form.Label>Upload Image:</Form.Label>
                <Form.Control type='file' onChange={handleFileChange} />
            </Form.Group>
        </Form>
    );
};

export default EditMealComponent;

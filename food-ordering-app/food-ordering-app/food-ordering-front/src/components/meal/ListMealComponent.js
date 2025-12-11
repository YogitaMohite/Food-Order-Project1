import React, { useState, useEffect } from 'react';
import MealService from '../../services/MealService';
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import CreateMealComponent from './CreateMealComponent';
import './ListMealComponent.css';

const ListMealComponent = () => {
    const [meals, setMeals] = useState([]);
    const [mealTypes, setMealTypes] = useState([]);

    const [show, setShow] = useState(false);

    const [meal, setMeal] = useState({
        id: null,
        name: '',
        description: '',
        price: '',
        mealType: null
    });

    const [selectedFile, setSelectedFile] = useState(null);

    // Load meals and meal types
    useEffect(() => {
        getAllMeals();
        getAllMealTypes();
    }, []);

    const getAllMeals = () => {
        MealService.getAllMeals()
            .then((res) => setMeals(res.data))
            .catch((err) => console.log(err));
    };

    const getAllMealTypes = () => {
        MealService.getAllMealTypes()
            .then((res) => setMealTypes(res.data))
            .catch((err) => console.log(err));
    };

    const resetMealForm = () => {
        setMeal({
            id: null,
            name: '',
            description: '',
            price: '',
            mealType: mealTypes[0] || null
        });
        setSelectedFile(null);
    };

    const handleShow = () => {
        resetMealForm();
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
        resetMealForm();
    };

    const handleSubmit = () => {
        if (
            !meal.name.trim() ||
            !meal.description.trim() ||
            !meal.price ||
            !meal.mealType ||
            !selectedFile
        ) {
            alert('Please fill all fields correctly!');
            return;
        }

        const fd = new FormData();
        const mealToSend = { ...meal, price: parseFloat(meal.price) };
        fd.append('image', selectedFile);
        fd.append('meal', JSON.stringify(mealToSend));

        MealService.createMeal(fd)
            .then((res) => {
                const response = res.data;
                if (response === 'success') {
                    alert('Successfully added meal!');
                    handleClose();
                    getAllMeals();
                } else if (response === 'invalid') {
                    alert('Invalid input — check MealType, price, or name');
                } else if (response === 'fail') {
                    alert('Failed to add new meal');
                }
            })
            .catch((err) => {
                console.log(err);
                alert('Something went wrong!');
            });
    };

    const alertAreYouSureDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'If you click yes, meal will be deleted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                MealService.deleteMeal(id).then((res) => {
                    if (res.data === 'success') {
                        alert('Successfully deleted meal!');
                        getAllMeals();
                    } else {
                        alert('Failed to delete meal!');
                    }
                });
            }
        });
    };

    return (
        <>
            <div className='container'>
                <h2 className='text-center'>Meal List</h2>
                <button className='btn btn-success mb-2' onClick={handleShow}>
                    Create New Meal
                </button>

                <table className='table table-hover'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {meals.map((m) => (
                            <tr key={m.id}>
                                <td>{m.id}</td>
                                <td>
                                    <img
                                        className='mealPic'
                                        src={`data:image/png;base64,${m.image}`}
                                        alt=''
                                    />
                                </td>
                                <td>{m.name}</td>
                                <td>{m.mealType.typeName}</td>
                                <td>{m.description}</td>
                                <td>{m.price}</td>
                                <td>
                                    <button
                                        className='btn btn-danger'
                                        onClick={() => alertAreYouSureDelete(m.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for creating meal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Meal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateMealComponent
                        meal={meal}
                        setMeal={setMeal}
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                        mealTypes={mealTypes}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant='primary' onClick={handleSubmit}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ListMealComponent;

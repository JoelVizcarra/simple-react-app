import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import ReactSpeedometer from 'react-d3-speedometer';
import { useForm } from 'react-hook-form';

const baseURL = 'http://localhost:8000';

const getRatio = async (params) => {
	const newRatio = await axios.get(`${baseURL}/assesments/`, { params });
	return newRatio.data;
};

function App() {
	const { register, handleSubmit, watch } = useForm();
	const [ratio, setRatio] = useState(0);

	const onSubmit = useCallback(
		async (data) => {
			try {
				const { ratio: newRatio } = await getRatio(data);
				setRatio(newRatio);
			} catch (error) {
				console.error(error);
			}
		},
		[getRatio]
	);

	return (
		<div className="App">
			<form onSubmit={handleSubmit(onSubmit)}>
				<input defaultValue="Account Manager" {...register('jobTitle')} />
				<input defaultValue="New York" {...register('location')} />
				<input type="submit" />
			</form>
			<ReactSpeedometer minValue={0.001} maxValue={0.5} value={ratio} />
		</div>
	);
}

export default App;

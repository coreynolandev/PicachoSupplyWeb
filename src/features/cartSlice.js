import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { sendTestEmail } from '../api/sendOrderEmail';
import uuid from 'react-uuid';

export const initialState = {
	order: [],
	contactEmail: null,
	contactNumber: null,
	contactName: null,
	numberOfResets: 0,
	orderId: uuid(),
	previousOrderId: null,
	processOrder: { processing: false, error: false, success: false }
};

export const processOrderAsync = createAsyncThunk('cart/processOrderAsync', async (order, thunkAPI) => {
	const templateType = order.templateType;

	const response = await sendTestEmail(order, templateType);
	console.log(response);
	if (response.status !== 200) {
		console.log(response.error);
		return thunkAPI.rejectWithValue(response.error);
	} else {
		return response;
	}
});

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addHoodie: (state, { payload }) => {
			// Payload is whole object
			state.order.push(payload);
		},
		emptyCart: (state) => {
			state.order = [];
		},
		removeItem: (state, { payload }) => {
			// Payload is ID
			const index = state.order.find((item) => item.id === payload);
			if (index !== -1) {
				state.order.splice(index, 1);
			} else console.error('didnt remove all hoodies');
		},
		updateHoodie: (state, { payload }) => {
			// Payload is whole object
			var index = state.order.findIndex((item) => item.id === payload.id);
			if (index !== -1) {
				state.order[index] = payload;
			} else console.error('didnt update hoodie');
		},
		incrementQuantity: (state, { payload }) => {
			// Payload is ID
			var index = state.order.find((item) => item.id === payload);
			if (index && index.quantity < 5) {
				index.quantity += 1;
			} else console.log('didnt increase amount');
		},
		decreaseQuantity: (state, { payload }) => {
			// Payload is ID
			var index = state.order.find((item) => item.id === payload);
			if (index && index.quantity > 1) {
				index.quantity -= 1;
			} else console.log('didnt decrease amount');
		},
		resetSubmitOrder: (state, {payload}) => {
			state.processOrder = { processing: false, error: false, success: false };
			state.numberOfResets += 1;
		},
		switchViewDetails: (state, { payload }) => {
			console.log('hellp');
			var index = state.order.find((item) => item.id === payload);
			index.viewDetails = !index.viewDetails;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(processOrderAsync.pending, (state, action) => {
				// console.log('pending');
				// console.log(action);
				state.processOrder = { processing: true, error: false, success: false };
			})
			.addCase(processOrderAsync.fulfilled, (state, { payload }) => {
				console.log('fulfilled');
				console.log(payload);
				// state = { ...initialState, processOrder: { processing: false, error: false, success: true } };

				state.previousOrderId = state.orderId;
				state.orderId = uuid();

				state.order = [];
				state.contactEmail = null;
				state.contactNumber = null;
				state.contactName = null;
				state.numberOfResets = 0;
				state.processOrder = { processing: false, error: false, success: true };
			})
			.addCase(processOrderAsync.rejected, (state, action) => {
				console.log('rejected');
				console.log(action);
				state.processOrder = { processing: false, error: true, success: false };
			});
	}
});

export const { addHoodie, emptyCart, removeItem, updateHoodie, resetSubmitOrder, incrementQuantity, decreaseQuantity, switchViewDetails } = cartSlice.actions;
export default cartSlice.reducer;

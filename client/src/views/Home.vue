<template>
  <div class="home">
		<p>Response from API: {{message}}</p>
		<button @click="hitApi">Hit API</button>
		<button @click="posted">Hit POST</button>
		<button @click="getAll">Get All</button>

		<p>New Name: <input v-model="name" /> -- {{name}}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Home',
	data() {
		return {
			message: 'Hit API Button',
			name: null,
		}
	},
	methods: {
		async hitApi() {
			const response = await axios.get("http://localhost:3000/");
			console.log(response);
			this.message = response.data.msg;
		},
		async posted() {
			const payload = {name: this.name}
			const response = await axios.post("http://localhost:3000/add", payload)
			console.log(response.data);
		},
		async getAll() {
			const response = await axios.get("http://localhost:3000/all");
			console.log(response.data);
		},
	}
}
</script>

<template>
  <div class="home">
		<p>Response from API: {{message}}</p>
		<button @click="hitApi">Hit API</button>
		<button @click="posted">Hit POST</button>
		<button @click="getAll">Get All</button>

		<p>New Name: <input v-model="name" /> -- {{name}}</p>
		<hr />
		<p>Key: <input v-model="key" /> -- {{key}}</p>
		<p>Value: <input v-model="value" /> -- {{value}}</p>
		<p>TTL: <input v-model="ttl" /> -- {{ttl}}</p>
		<button @click="getCache">Get Cache</button>
		<button @click="setCache">Set Cache</button>
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
			key: null,
			value: null,
			ttl: 0,
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
		async getCache() {
			const params = {key: this.key};
			const response = await axios.get("http://localhost:3000/cacheGet", {params});
			console.log(response);
		},
		async setCache() {
			const params = {key: this.key, value: this.value, ttl: this.ttl}
			const response = await axios.post("http://localhost:3000/cacheSet", params);
			console.log(response);
		}
	}
}
</script>

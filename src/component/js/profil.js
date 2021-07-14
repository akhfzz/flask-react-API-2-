import React, {useState, useEffect} from 'react';
import Template from './layout';
import $ from 'jquery';

function Profil(props){
	// set variable
	const [nama, setNama] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [input, setInput] = useState(false);
	const [id, setId] = useState("");
	const [file, setFile] = useState("");
	let [pengguna, setPengguna] = useState([]);

	// eventlistener
	const componentDidMount = () => {
		$('#fade').click(function(){
	  		$('#form').toggle()
	  	})
	}

	// handle when submit
	const handleSubmit = async(e) => {
		e.preventDefault();
		if (!input) {
			const restful = await fetch(`http://127.0.0.1:5000/`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
			   	},
					body: JSON.stringify({
						email,
						nama,
						password,
						file
				}),
			});
			await restful.json();
			console.log(file)
		}else{
			const API = await fetch(`http://127.0.0.1:5000/profil/${id}`, {
				method : 'PUT',
				headers : {
					'Content-Type' : 'application/json'
				},
				body : JSON.stringify({
					email,
					nama,
					password,
					file
				}),
			});
			const APIjson = await API.json();
			console.log(APIjson);
			setInput(false);
			setId("");
		}
		await getUsers();

		setNama("");
		setEmail("");
		setPassword("");
		setFile("")
  	};

  	const deleteData = async(id) => {
  		const response = window.confirm('Kamu mau menghapusnya?');
  		if(response){
  			const rest = await fetch(`http://127.0.0.1:5000/profil/${id}`, {
  				method : 'DELETE',
  			});
  			const mongo = await rest.json();
  			console.log(mongo);
  			await getUsers();
  		}
  	};
	  
  	const updateData = async(id) =>{
  		const rest = await fetch(`http://127.0.0.1:5000/profil/${id}`);
  		const api = await rest.json();

  		setInput(true);
  		setId(id)

  		setEmail(api.email);
  		setNama(api.nama);
  		setPassword(api.password);
		setFile(api.file);
  	}

	const getUsers = async () => {
		const res = await fetch(`http://127.0.0.1:5000/`);
		const data = await res.json();
		setPengguna(data);
	};

	useEffect(()=>{
		getUsers();
		componentDidMount();
	});

	return(
		<>	
			<Template/>
			<button id='fade'>Fade</button>
			<div id='form'>
				<form onSubmit={handleSubmit}>
					<input type='email' id='email' name='email' onChange={(e)=> setEmail(e.target.value)} value={email} placeholder='Masukkan email'/><br/>
					<input type='text' id='nama' name='nama' onChange={(e)=>setNama(e.target.value)} value={nama} placeholder='Masukkan nama'/><br/>
					<input type='text' id='password' name='password' onChange={(e)=>setPassword(e.target.value)} value={password} placeholder='Masukkan password'/><br/>
					<input type='file' id='file' name='file' onChange={(e)=>setFile(e.target.value)} value={file.files} placeholder='Masukkan file'/><br/>
					<button className='button' type='submit' id='ok'>{input ? "Update" : "Create"}</button>
				</form>
			</div>
			<table id='guest'>
				<thead>
					<tr>
						<th>Email</th>
						<th>Nama</th>
						<th>Password</th>
						<th>file</th>
						<th>What you want</th>
					</tr>
				</thead>
				<tbody>
					{pengguna.map((user) => (
						<tr key={user._id}>
							<td>{user.email}</td>
							<td>{user.nama}</td>
							<td>{user.password}</td>
							<td>{user.file}</td>
							<td>
								<button onClick={(id)=>deleteData(user._id)}>Hapus</button>
								<button onClick={(id)=>updateData(user._id)}>Edit</button>
							</td>
						</tr>
					))}
					</tbody>
			</table>
		</>
	)
}
export default Profil;
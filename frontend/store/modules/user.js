import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../../src/router';
import Swal from 'sweetalert2';

Vue.use(Vuex,axios,Swal,router);

export default{
    state: {
        nombre:'',
        email:'',
        password:'',
        fotoPerfil:null,
        emailTo:'',
        usuarioId:'',
        datosDeUsuario:{}
    },
    mutations: {
        USER_LOGIN(state,payload){
            state.email = payload.email;
            state.password = payload.password;
        },
        USER_SIGNUP(state,payload){
            state.nombre = payload.nombre;
            state.email = payload.email;
            state.password = payload.password;
            state.fotoPerfil = payload.fotoPerfil;
        },
        USER_PROFILE(state,datosDeUsuario){
            state.datosDeUsuario = datosDeUsuario;
        }
    },
    actions: {
        userLogin({commit},payload) {
            const usuario = {
                email: payload.email,
                password: payload.password
            }
            axios.post('http://localhost:3000/login', {
                email: usuario.email,
                password: usuario.password
            })
                .then(response => {
                    if(response.data.rs === 'usuarioLogeado'){
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000
                          });
                          Toast.fire({
                            type: 'success',
                            title: 'Logged In'
                          })
                          localStorage.setItem('token',response.data.token);
                          router.push('/dashboard');
                          commit.commit('USER_LOGIN',usuario);
                    }
                })
                .catch(error=>{
                    if(error.response.data.rs === 'emailIncorrecto'){
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000
                        });
                        Toast.fire({
                            type: 'error',
                            title: 'Email Incorrect'
                        })
                    }else if (error.response.data.rs === 'errorIncriptacion'){
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000
                        });
                        Toast.fire({
                            type: 'error',
                            title: 'Encrypt Error'
                        })
                    }else if (error.response.data.rs === 'passwordIncorrecto'){
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000
                        });
                        Toast.fire({
                            type: 'error',
                            title: 'Password Incorrect'
                        })
                    }else{
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000
                        });
                        Toast.fire({
                            type: 'error',
                            title: 'Error, try again'
                        })
                    }
                }) 
        },
        userSignUp({commit},payload){
            const usuario = new FormData();
                usuario.append('nombre', payload.nombre);
                usuario.append('fotoPerfil', payload.fotoPerfil);
                usuario.append('email', payload.email);
                usuario.append('password', payload.password);
            axios.post('http://localhost:3000/signup', usuario)
                .then(response => {
                    if (response.data.rs === 'usuarioCreado') {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000
                          });
                          Toast.fire({
                            type: 'success',
                            title: 'User created,please confirm via email'
                          })
                          localStorage.setItem('token', response.data.token);
                          router.push('/home');
                          commit.commit('USER_SIGNUP',usuario);
                    }
                })
                .catch(error => {
                    if (error.response.data.rs === 'emailExiste') {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000
                          });
                          Toast.fire({
                            type: 'error',
                            title: 'Email exists'
                          })
                    } else if (error.response.data.rs === 'errorEncriptacion') {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000
                          });
                          Toast.fire({
                            type: 'error',
                            title: 'Error encrypting'
                          })
                    } else {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000
                          });
                          Toast.fire({
                            type: 'error',
                            title: 'Error, try again'
                          })
                    }
                })
        },
        userConfirm() {
            axios.get('http://localhost:3000/confirm/' + router.currentRoute.params.token)
                .then(response => {
                    if (response.data.rs === 'usuarioConfirmado') {
                        localStorage.setItem('token', response.data.token);
                        router.push('/dashboard');
                    }
                })
                .catch(error => {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    });
                    Toast.fire({
                        type: 'error',
                        title: `${error}`
                    })
                    router.push('/home');
                })
        },
        userForgot(payload) {
            axios.post('http://localhost:3000/forgot',
                {
                    emailTo: payload,
                })
                .then(response => {
                    if (response.data.rs === 'emailEnviado') {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000
                          });
                          Toast.fire({
                            type: 'success',
                            title: 'User not confirmed,check your email'
                          })
                    router.push('/home');
                    } else if (response.data.rs === 'emailNoExiste') {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000
                          });
                          Toast.fire({
                            type: 'success',
                            title: 'Email doesnt exists'
                          })
                    }
                })
                .catch(error => {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                      });
                      Toast.fire({
                        type: 'success',
                        title: `${error}`
                      })                    
                })
        },
        userEmailResetGet(){
            axios.get('http://localhost:3000/reset/'+ router.currentRoute.params.token) 
                 .then(res =>{
                     this.usuarioId = res.data.rs;
                })
                 .catch(error =>{
                     alert(error);
                })            
        },
        userEmailResetPost(payload) {
            const usuario = {
                password: payload.password,
                id:payload.usuarioId
            }
            axios
                .post('http://localhost:3000/reset', {
                    password: usuario.password,
                    id: usuario.usuarioId
                })
                .then(response => {
                    localStorage.setItem('token', response.data.token);
                    router.push('/dashboard');
                })
                .catch(error => {
                    alert(error);
                })
        },
        userProfile({commit}){
            axios
            .get('http://localhost:3000/profile/'+ router.currentRoute.params.id,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                }) 
            .then(response =>{
                let datosDeUsuario = response.data;
                commit('USER_PROFILE',datosDeUsuario);
            })
            .catch(error=>{
                alert(error);
            })            
        },
    }
}
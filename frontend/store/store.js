import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../src/router';
import Swal from 'sweetalert2'
// Modulos
    import user from './modules/user'

Vue.use(Vuex,axios,Swal);

export const store = new Vuex.Store({
    modules:{
        user:user
    },
    state:{
        // email:'',
        // password:''
    },
    mutations:{
        // USUARIO_CREAR(state,payload){
        //     state.email = payload.email;
        //     state.password = payload.password;
        // }
    },
    actions: {
        // crear({ commit }, payload) {
        //     const usuario = {
        //         email: payload.email,
        //         password: payload.password
        //     }
        //     axios.post('http://localhost:3000/login', {
        //         email: usuario.email,
        //         password: usuario.password
        //     })
        //         .then(response => {
        //             if(response.data.rs === 'usuarioLogeado'){
        //                 const Toast = Swal.mixin({
        //                     toast: true,
        //                     position: 'top-end',
        //                     showConfirmButton: false,
        //                     timer: 3000
        //                   });
        //                   Toast.fire({
        //                     type: 'success',
        //                     title: 'Logged In'
        //                   })
        //                 localStorage.setItem('token',response.data.token);
        //                 router.push('/dashboard');
        //             }
        //         })
        //         .catch(error=>{
        //             if(error.response.data.rs === 'emailIncorrecto'){
        //                 const Toast = Swal.mixin({
        //                     toast: true,
        //                     position: 'top-end',
        //                     showConfirmButton: false,
        //                     timer: 3000
        //                 });
        //                 Toast.fire({
        //                     type: 'error',
        //                     title: 'Email Incorrect'
        //                 })
        //             }else if (error.response.data.rs === 'errorIncriptacion'){
        //                 const Toast = Swal.mixin({
        //                     toast: true,
        //                     position: 'top-end',
        //                     showConfirmButton: false,
        //                     timer: 3000
        //                 });
        //                 Toast.fire({
        //                     type: 'error',
        //                     title: 'Encrypt Error'
        //                 })
        //             }else if (error.response.data.rs === 'passwordIncorrecto'){
        //                 const Toast = Swal.mixin({
        //                     toast: true,
        //                     position: 'top-end',
        //                     showConfirmButton: false,
        //                     timer: 3000
        //                 });
        //                 Toast.fire({
        //                     type: 'error',
        //                     title: 'Password Incorrect'
        //                 })
        //             }else{
        //                 const Toast = Swal.mixin({
        //                     toast: true,
        //                     position: 'top-end',
        //                     showConfirmButton: false,
        //                     timer: 3000
        //                 });
        //                 Toast.fire({
        //                     type: 'error',
        //                     title: 'Error, try again'
        //                 })
        //             }
        //         }) 
        // }
    },
})
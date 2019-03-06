import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../../src/router';
import Swal from 'sweetalert2'
Vue.use(Vuex,axios,Swal);
export default{
    state: {
        nombre:'',
        email:'',
        password:'',
        fotoPerfil:null,
        emailTo:'',
        usuarioId:'',
        password:''
    },
    getters: {},
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
        USER_EMAIL_FORGOT(state,payload){
            state.emailTo = payload;
        },
        USER_EMAIL_RESET_GET(state,payload){
            state.usuarioId = payload;
            // es necesario hacer una mutacion?
        },
        USER_EMAIL_RESET_POST(state,payload){

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
                        commit.commit('USER_LOGIN',usuario);
                        localStorage.setItem('token',response.data.token);
                        router.push('/dashboard');
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
            const usuario = new Formusuario();
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
                        commit.commit('USER_SIGNUP',usuario);
                        localStorage.setItem('token', response.data.token);
                        this.$router.push('/home');
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
        userEmailForgot({commit},payload) {
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
                        commit.commit('USER_EMAIL_FORGOT',emailTo);
                        this.$router.push('/home');
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
        userEmailResetGet({commit},payload){
            axios.get('http://localhost:3000/reset/'+this.$route.params.token) 
                 .then(res =>{
                     this.usuarioId = res.data.rs;
                     commit.commit('USER_EMAIL_RESET_GET',payload);
                })
                 .catch(error =>{
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                      });
                      Toast.fire({
                        type: 'error',
                        title: `Error,try again ${error}`
                      })                    
                })            
        },
        userEmailResetPost({ commit }, payload) {
            axios
                .post('http://localhost:3000/reset', {
                    password: this.password,
                    id: this.usuarioId
                })
                .then(response => {
                    commit.commit('USER_EMAIL_RESET_POST',usuario);
                    localStorage.setItem('token', response.data.token);
                    this.$router.push('/dashboard');
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
}
this.$store.dispatch('userLogin',usuario);
commit.commit('USER_LOGIN',usuario);
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
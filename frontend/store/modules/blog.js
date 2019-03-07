import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../../src/router';
import Swal from 'sweetalert2';

Vue.use(Vuex,axios,Swal,router);

export default{
    state:{
    },
    mutations:{

    },
    actions:{
        blogPost(payload){
            const blog = {
                titulo:payload.titulo,
                comentario:payload.comentario
            }
            axios
            .post('http://localhost:3000/dashboard/crearcomentario',
            {
                titulo:blog.titulo,
                comentario:blog.comentario
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },                
            })
            .then(response =>{
                if(response.data.rs === 'comentarioCreado'){
                    router.push('/dashboard');
                }
            })
            .catch(error=>{
                alert(error);
            })            
        },
        blogView(){
            axios
            .get('http://localhost:3000/dashboard/comentario/'+ router.currentRoute.params.id,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                }) 
            .then(response =>{
              this.comentario = response.data;
            })
            .catch(error=>{
                alert(error);
            })            
        },
        blogPut(payload){
            const blog = {
                titulo: payload.comentario.titulo,
                comentario:payload.comentario.comentario
              }            
            axios
            .put('http://localhost:3000/dashboard/comentario/'+ router.currentRoute.params.id,
              {titulo:blog.titulo,comentario:blog.comentario},{
                  headers: {
                      Authorization: `Bearer ${localStorage.getItem('token')}`
                  },                
              })
            .then(response=>{
              if(response.data.rs === 'comentarioActualizado'){
                router.push('/dashboard');
              }
            })
            .catch(error=>{
                alert(error);
            })            
        },
        blogDelete(payload){
            axios
            .delete("http://localhost:3000/dashboard/comentario/"+payload,
              {
                  headers: {
                      Authorization: `Bearer ${localStorage.getItem('token')}`
                  },                
              })
            .then(response => {
              if (response.data.rs === "comentarioEliminado") {
                router.push('/dashboard');
              }
            })
            .catch(error=>{
              if(error.response.data.rs === 'comentarioEliminadoError'){
                this.comentariosError = 'comentarioEliminadoError';
              }else if(error.response.data.rs === 'tokenExpired'){
                  alert('Session Expired');
                router.push('/login');
                localStorage.removeItem('token');
              }
            })            
        },
        blogsView(payload){
            axios
            .get('http://localhost:3000/dashboard',{
                    headers: {
                        Authorization: 'Bearer '+ localStorage.getItem('token')
                    },
                })     
            .then(response =>{
                this.comentarios = response.data;
            })
            .catch(error =>{
                if(error.response.data.rs === 'tokenExpired'){
                    alert('Session Expired');
                    localStorage.removeItem('token');
                    router.push('/login');
                }else if (error.response.data.rs === 'getComentariosError'){
                    this.comentariosError = 'getComentariosError';
                }
            })            
        }
    }
}
// router.currentRoute.params.
// this.$store.dispatch('userLogin',usuario);
// commit.commit('USER_LOGIN',usuario);
// const Toast = Swal.mixin({
//     toast: true,
//     position: 'top-end',
//     showConfirmButton: false,
//     timer: 3000
//   });
//   Toast.fire({
//     type: 'success',
//     title: 'Logged In'
//   })
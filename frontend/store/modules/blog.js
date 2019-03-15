import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../../src/router';
import Swal from 'sweetalert2';
Vue.use(Vuex,axios,Swal,router);
export default{
    state:{
        blogs:{},
        blog:{}
    },
    mutations:{
        BLOGS_VIEW(state,payload){
            state.blogs = payload;
        },
        BLOG_VIEW(state,payload){
            state.blog = payload;
        },
        BLOG_UPDATE(state,payload){
            state.blog = payload;
        }
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
        blogView({commit}){
            axios
            .get('http://localhost:3000/dashboard/comentario/'+ router.currentRoute.params.id,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                }) 
            .then(response =>{
                let blog = response.data;
                commit('BLOG_VIEW',blog)
            })
            .catch(error=>{
                alert(error);
            })            
        },
        blogPut({commit},payload){
            const blodUpdated = {
                titulo: payload.titulo,
                comentario:payload.comentario
              }            
            axios
            .put('http://localhost:3000/dashboard/comentario/'+ router.currentRoute.params.id,
              {titulo:blodUpdated.titulo,comentario:blodUpdated.comentario},{
                  headers: {
                      Authorization: `Bearer ${localStorage.getItem('token')}`
                  },                
              })
            .then(response=>{
              if(response.data.rs === 'comentarioActualizado'){
                    commit('BLOG_UPDATE',blodUpdated)
                    router.push('/dashboard');
              }
            })
            .catch(error=>{
                alert(error);
            })            
        },
        blogDelete(payload){
            const id = payload.state.blog._id;
            axios
            .delete("http://localhost:3000/dashboard/comentario/"+id,
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
        blogsView({commit}){
            axios
            .get('http://localhost:3000/dashboard',{
                    headers: {
                        Authorization: 'Bearer '+ localStorage.getItem('token')
                    },
                })     
            .then(response =>{
                let blogs = response.data;
                commit('BLOGS_VIEW',blogs)
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
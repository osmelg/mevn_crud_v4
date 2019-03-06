<template>
    <div class="grid">
        <div class="headGrid">a
            <!-- <div class="headContainer">
                <div class="headContainerLeft">
                    <router-link to='/dashboard'><img src="../assets/icons/back.svg" class="headContainerLeftItem" alt=""></router-link>
                </div>
                <div class="headContainerRight">
                    <cerrarSesion></cerrarSesion>
                </div>
            </div> -->
        </div>
        <div class="bodyGrid">a
            <!-- <div class="bodyContainer">
                <img :src="'http://localhost:3000/'+usuario.fotoPerfil" class="bodyContainerImage">
                <span class="bodyContainerName">{{usuario.nombre}}</span>
            </div> -->
        </div>
    </div>
</template>
<script>
import axios from "axios";
import cerrarsesion from '../components/cerrarsesion.vue';
export default {
    components:{'cerrarSesion':cerrarsesion},
    data(){
        return{
            usuario:{}
        }
    },
    created(){
        this.getPerfilUsuario();
    },
    methods:{
        getPerfilUsuario(){
            axios
            .get('http://localhost:3000/profile/'+this.$route.params.id,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                }) 
            .then(response =>{
                this.usuario = response.data;
            })
            .catch(error=>{
                if(error.response.data.rs === 'getComentarioError'){
                // this.usuarioError = 'usuarioError';
                // esto deberia ser con sweetalert
                }        
            })
        }        
    }
}
</script>
<style scoped>
    *                                       {margin: 0; padding: 0;}
    .grid                                   {height: 100vh; background: #2C3131; display: grid; grid-template-areas: "headGrid" "bodyGrid" "footGrid";}
        .headGrid                           {background: red; height: 10vh; display: grid; grid-area: headGrid;}
            .headContainer                  {background: black; height: 100%; display: grid; grid-template-columns: 1fr 1fr; align-items: center;}
                .headContainerLeft          {margin-left: 1em; display: grid; justify-self: start;}
                    .headContainerLeftItem  {height: 5em; width: 5em; cursor: pointer;}
                .headContainerRight         {margin-right: 1em; display: grid; justify-self: end;}
                    .headContainerRightItem {height: 3em; width: 6em; border-radius: 2em; background: #fff; display: flex; align-items: center; justify-content: center;}
        .bodyGrid                           {background: black; height: 90vh; display: grid; grid-area: bodyGrid;}
            .bodyContainer                  {background: red; max-height: 100%; display: flex; justify-content: center; align-items: center; flex-direction: column;}
                .bodyContainerImage         {height: 25em; width: 25em; object-fit: cover; border-radius: 50%; box-shadow: 0px 4px 4px #000000;}
                .bodyContainerName          {font-size: 5em; color: #fff;}
</style>
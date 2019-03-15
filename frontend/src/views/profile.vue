<template>
    <div class="grid">
        <div class="headGrid">
            <div class="headContainer">
                <div class="headContainerLeft">
                    <router-link to='/dashboard'><img src="../assets/icons/back.svg" class="headContainerLefButton"></router-link>
                </div>
                <div class="headContainerRight">
                    <cerrarSesion></cerrarSesion>
                </div>
            </div>
        </div>
        <div class="bodyGrid">
            <div class="bodyContainer">
                <img :src="'http://localhost:3000/'+ datosDeUsuario.fotoPerfil" class="bodyContainerImage">
                <span class="bodyContainerName">{{datosDeUsuario.nombre}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex';
import cerrarsesion from '../components/cerrarsesion.vue';
export default {
    components:{'cerrarSesion':cerrarsesion},
    created(){
        this.$store.dispatch('userProfile');
    },
    computed: mapState({
        datosDeUsuario: ({user}) => user.datosDeUsuario
    })
}
</script>
<style scoped>
    *                                       {margin: 0; padding: 0;}
    .grid                                   {height: 100vh; background: url('../assets/images/bg.svg') no-repeat center center fixed; background-size: cover; display: grid; grid-template-areas: "headGrid" "bodyGrid";}
        .headGrid                           {height: 15vh; display: grid; grid-area: headGrid;}
            .headContainer                  {height: 100%; display: grid; grid-template-columns: 1fr 1fr; align-items: center;}
                .headContainerLeft          {height: 100%; display: grid; align-items: center; justify-items: start;}
                    .headContainerLefButton {height: 5em; width: 5em; cursor: pointer;}
                .headContainerRight         {height: 100%; display: grid; align-items: center; justify-items: end;}
        .bodyGrid                           {height: 85vh; display: grid; grid-area: bodyGrid;}
            .bodyContainer                  {height: 100%; display: flex; justify-content: center; align-items: center; flex-direction: column;}
                .bodyContainerImage         {height: 25em; width: 25em; object-fit: cover; border-radius: 50%; box-shadow: 0px 4px 4px #000000;}
                .bodyContainerName          {font-size: 5em; color: #fff;}
</style>
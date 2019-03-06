<template>
  <div class="grid">
    <div class="headerGrid">
      <div class="headerContainer">
        <div class="headerNav">
            <div class="headerNavLeft">
              <router-link :to="{name:'profile',params:{id:userId}}"><img type='submit' src="../assets/icons/profile.svg" class="headerContainerButton"></router-link>
            </div>
            <div class="headerNavCenter">
              <router-link to='/dashboard/crearcomentario'><img type='submit' src="../assets/icons/create.svg" class="headerContainerButton"></router-link>
            </div>
            <div class="headerNavRight">
              <cerrarSesion></cerrarSesion>
            </div>
        </div>
      </div>
    </div>
    <div class="bodyGrid">
      <div class="bodyContainer">
        <comentarios></comentarios>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import axios from "axios";
import jwt from "jsonwebtoken";
import cerrarSesion from '../components/cerrarsesion.vue';
import comentarios from '../components/comentarios.vue';
export default {
  name: 'home',
  components:{'cerrarSesion':cerrarSesion,'comentarios':comentarios},
  data(){
    return{
      userId:''
    }
  },
  created(){
    const token = localStorage.getItem('token');
    const descifrado = jwt.decode(token);
    this.userId = descifrado.userId;
  }
}
</script>
<style scoped>
/* Generales */
  *                                           {margin: 0; padding: 0; font-size: 10px;}
  @font-face                                  {font-family: uno; src: url('../assets/fonts/Oxygen-Bold.ttf');}
  @font-face                                  {font-family: dos; src: url('../assets/fonts/Oxygen-Light.ttf');}
/* Layouts */
  .grid                                       {height: 100vh; background: url('../assets/images/bg.svg') no-repeat center center fixed; background-size: cover; display: grid; grid-template-areas: "headerGrid" "bodyGrid";} 
    .headerGrid                               {height: 20vh; display: grid; grid-area: headerGrid;}
      .headerContainer                        {height: 100%; display: grid; align-items: start; justify-items: center;}
        .headerContainerButton                {height: 5em; width: 5em; text-align: center; cursor: pointer;}
        .headerNav                            {width: 100%; display: grid; grid-template-columns: 20% 60% 20%;}
          .headerNavLeft                      {height: 100%; display: grid; align-items: center; justify-items: start;}
          .headerNavCenter                    {height: 100%; display: grid; align-items: center; justify-items: center;}
          .headerNavRight                     {height: 100%; display: grid; align-items: center; justify-items: end;}
    .bodyGrid                                 {height: 80vh; display: grid;  grid-area: bodyGrid;}
      .bodyContainer                          {height: 100%; display: grid; justify-items: center; align-items: start;}
</style>
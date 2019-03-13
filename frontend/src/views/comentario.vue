<template>
    <div class="grid">
        <div class="headerGrid">
            <div class="headerContainer">
                <div class="headerNav">
                    <div class="headerNavLeft">
                        <router-link to='/dashboard'><img src="../assets/icons/back.svg" class="headerNavLeftButton" alt=""></router-link>
                    </div>
                    <div class="headerNavCenter">
                        <p class="headerNavCenterTitle">Edit Post</p>
                    </div>
                    <div class="headerNavRight">
                        <cerrarsesion></cerrarsesion>
                    </div>
                </div>
            </div>
        </div>
        <div class="bodyGrid">
            <div class="bodyContainer">
              <div class="bodyMainPosts">
                  <div class="bodyContainerPost">
                      <form v-on:submit.prevent="putComentario">
                          <input type="text" :value="$store.state.blog.blog.titulo" placeholder="titulo" class="bodyContainerPostTitle"><br>
                          <input type="text" v-model="$store.state.blog.blog.comentario" placeholder="comentario" class="bodyContainerPostContent"><br>
                          <button type="submit" class="bodyContainerButtonSubmit"><img type='submit' src="../assets/icons/update.svg" class="bodyContainerButton"></button>
                          <button class="bodyContainerButtonSubmit" v-on:click.prevent="blogDelete($store.state.blog.blog._id)"><img type='submit' src="../assets/icons/delete.svg" class="bodyContainerButton"></button>
                      </form>
                  </div>                             
              </div>
            </div>
        </div>
    </div>
</template>
<script>
import cerrarsesion from '../components/cerrarsesion.vue';
export default {
  components:{'cerrarsesion':cerrarsesion},
  created(){
    this.$store.dispatch('blogView');
  },
  methods:{
    blogPut(){
      const blog = {
        titulo: this.comentario.titulo,
        comentario:this.comentario.comentario
      }
      this.$store.dispatch('blogPut',blog);
    },
    blogDelete(id){
      this.$store.dispatch('blogDelete',id);
    }
  }
}
</script>
<style scoped>
/* Layout */
    .grid                                           {height: 100vh; background: url('../assets/images/bg.svg') no-repeat center center fixed; background-size: cover;  display: grid; grid-template-areas: "headerGrid" "bodyGrid";}
        .headerGrid                                 {height: 17vh; display: grid; grid-area: headerGrid;}
            .headerContainer                        {display: grid; align-items: start;}
                .headerNav                          {width: 100%; display: grid; grid-template-columns: 20% 60% 20%;}
                    .headerNavLeft                  {height: 100%; display: grid; align-items: center; justify-items: start;}
                        .headerNavLeftButton        {height: 5em; width: 5em; text-align: center; cursor: pointer;}
                    .headerNavCenter                {height: 100%; display: grid; align-items: center; justify-items: center;}
                        .headerNavCenterTitle       {font-size: 4.6em; font-family: uno; color: #fff;}
                    .headerNavRight                 {height: 100%; display: grid; align-items: center; justify-items: end;}
        .bodyGrid                                   {height: 73vh; display: grid; grid-area: bodyGrid;}
            .bodyContainer                          {height: 100%; margin-top: 1em;  text-align: center; display: flex; justify-content: flex-start; align-items: center; flex-direction: column;}
            .bodyContainerTitle                     {font-size: 3.6em; font-family: two;}
            .bodyMainPosts                          {height: 100%; width: 100%; max-width: 768px; display: grid; justify-items: center; align-items: start;}
                .bodyContainerPost                  {width: 95%; border: .5em solid #dddbdb; transition: .5s; color: white; border-radius: 1em; margin-top: 1em; margin-bottom: 1em; padding-top: 1em; padding-bottom: 1em; display: grid; justify-items: center; align-items: center;}
                .bodyContainerPostTitle             {font-size: 3.5em; width: 100%; border: none; background: #ebebeb2c; color: #fff; font-family: uno; text-align: center; }
                .bodyContainerPostContent           {font-size: 2.5em; width: 100%; border: none; background: #ebebeb2c; color: #fff; font-family: dos; margin-top: .5em; text-align: center;}
                .bodyContainerButtonSubmit           {height: 5em; width: 5em; margin-top: 1em; margin-right: 1em; background: none; border: none; cursor: pointer;}
                .bodyContainerPostActions           {display: flex;}
</style>
<template>
    <div class="comentariosGrid">
        <div class="bodyMainPosts" v-for="blog of $store.state.blog.blogs" :key="blog._id">
            <p class="bodyContainerPostTitle">{{blog.titulo}}</p>
            <p class="bodyContainerPostContent">{{blog.comentario}}</p>
            <router-link :to="{name:'comentario',params:{id:blog._id}}">
                <img type='submit' src="../assets/icons/update.svg" class="bodyMainPostsButton">
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    created(){
        this.$store.dispatch('blogsView');
    },
}
</script>
<style scoped>
*                                               {margin: 0; padding: 0;}
    .comentariosGrid                            {height: 100%; display: grid; justify-items: center; align-items: start;}
        .bodyMainPosts                          {height: auto; width: 50vw; padding-top: 1em; padding-bottom: 1em; margin-bottom: 1em; display: flex; flex-direction: column; align-items: center; justify-content: flex-start;}
        .bodyMainPosts:hover                    {transition: .5s; box-shadow: 0 25px 55px rgba(0,0,0,.2),0 16px 28px rgba(0,0,0,.24); transform: scale(1.01); border-radius: 18px;}
        .bodyContainerPostTitle                 {font-size: 3.5em; width: 90%; border: none; background: #ebebeb2c; color: #fff; font-family: uno; text-align: center; }
        .bodyContainerPostContent               {font-size: 2.5em; width: 90%; border: none; background: #ebebeb2c; color: #fff; font-family: dos; margin-top: .5em; text-align: justify;}
        .bodyContainerPostActions               {display: flex;}
            .bodyMainPostsButton                {height: 5em; width: 5em; margin-top: 1em; cursor: pointer;}
            .bodyContainerPostContent::first-letter {font-size: 2.8em; color: #000000; font-weight: bold;}
@media screen and (max-width: 768px)            {.bodyMainPosts {width: 90vw;}}
</style>
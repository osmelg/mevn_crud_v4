<template>
    <div class="grid">
        <div class="headGrid">
            <div class="headContainer">
                <div class="headContainerLeft">
                    <router-link to='/home'><img type='submit' src="../assets/icons/back.svg" class="headContainerButton"></router-link>
                </div>
            </div>
        </div>
        <div class="bodyGrid">
            <div class="bodyContainer">   
                <p class="bodyContainerTitle">¿Forgot your password?</p>
                <form @submit.prevent="userForgot">
                    <input type="text" class="bodyContainerInput" v-model="usuario.emailTo" placeholder="Type your email">
                    <button class="bodyContainerButtonSubmit">Send</button>
                </form>            
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            usuario:{
                emailTo:''
            }
        }
    },
    methods:{
        userForgot(){
            var usuario = {emailTo:this.usuario.emailTo}
            this.$store.dispatch('userForgot',usuario);
        }
    }
}
</script>
<style scoped>
@font-face                           {font-family: titulo; src: url('../assets/fonts/Oxygen-Bold.ttf');}
*                                    {margin: 0; padding: 0;}
.grid                                {height: 100vh; background: url('../assets/images/bg.svg') no-repeat center center fixed; background-size: cover; display: grid; grid-template-areas: "headGrid" "bodyGrid" "footGrid";}
    .headGrid                        {height: 10vh; display: grid; grid-area: headGrid;}
        .headContainer               {height: 100%; display: grid; grid-template-columns: 100%;}
            .headContainerLeft       {height: 100%; display: flex; justify-content: flex-start; align-items: center;}
            .headContainerButton     {height: 3em; width: 3em; cursor: pointer;}
    .bodyGrid                        {height: 90vh; display: grid; align-items: center; justify-items: center; grid-area: bodyGrid;}
        .bodyContainer               {display: flex; flex-direction: column; align-items: center;}
            .bodyContainerInput      {height: 1em; width: auto; margin-right: .5em; padding: 1em; text-align: center; border: none; border-top-left-radius: 2em; border-bottom-left-radius: 2em;}
            .bodyContainerButtonSubmit{height: 3em; width: 6em; background: #fff; border: none; border-top-right-radius: 2em; border-bottom-right-radius: 2em; cursor: pointer;}
            .bodyContainerTitle      {font-size: 2.5em; color: #fff; font-family: titulo; margin-bottom: 1em;}
</style>
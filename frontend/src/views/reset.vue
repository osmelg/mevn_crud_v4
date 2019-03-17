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
                <p class="bodyContainerTitle">Reset your password</p>
                <form @submit.prevent="userEmailResetPost">
                    <input type="password" class="bodyContainerInput" v-model="usuario.password" placeholder="Password">
                    <button class="bodyContainerButtonSubmit">Change it</button>
                </form>            
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data(){
        return{
            usuario:{
                password:'',
                usuarioId:''
            }
        }
    },
    created(){
        this.userEmailResetGet();
    },
    methods:{
        userEmailResetGet(){
            this.$store.dispatch('userEmailResetGet');
        },
        userEmailResetPost(){
            const usuario = {
                password: this.usuario.password,
                usuarioId: this.$store.state.user.usuarioId
            }
            this.$store.dispatch('userEmailResetPost',usuario);
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
            .bodyContainerInput      {height: 1em; margin-right: .5em; width: auto; padding: 1em; text-align: center; border: none; border-top-left-radius: 2em; border-bottom-left-radius: 2em;}
            .bodyContainerButtonSubmit{height: 3em; width: 6em; background: #fff; border: none; border-top-right-radius: 2em; border-bottom-right-radius: 2em; cursor: pointer;}
            .bodyContainerTitle      {font-size: 2.5em; color: #fff; font-family: titulo; margin-bottom: 1em;}
</style>
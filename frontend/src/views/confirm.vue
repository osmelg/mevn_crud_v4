<template>
    <div class="grid">
        <div class="bodyGrid">
            <div class="bodyContainer">   
                <p class="bodyContainerTitle">Stand by, confirming your data..</p>
            </div>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
import axios from 'axios';
export default {
    data(){
        return{
        }
    },
    created(){
        this.userConfirm();
    },
    methods:{
        userConfirm(){
            this.$store.dispatch('userConfirm');
        }
    }
}
</script>
<style scoped>
@font-face                           {font-family: titulo; src: url('../assets/fonts/Oxygen-Bold.ttf');}
*                                    {margin: 0; padding: 0;}
.grid                                {height: 100vh; background: #2C3131; display: grid; grid-template-areas: "bodyGrid";}
    .bodyGrid                        {height: 100vh; display: grid; align-items: center; justify-items: center; grid-area: bodyGrid;}
        .bodyContainer               {display: flex; flex-direction: column; align-items: center;}
            .bodyContainerInput      {height: 1em; width: auto; padding: 1em; text-align: center; border: none; border-top-left-radius: 2em; border-bottom-left-radius: 2em;}
            .bodyContainerButtonSubmit{height: 3em; width: 6em; background: #fff; border: none; border-top-right-radius: 2em; border-bottom-right-radius: 2em; cursor: pointer;}
            .bodyContainerTitle      {font-size: 2.5em; color: #fff; font-family: titulo; margin-bottom: 1em;}
</style>2
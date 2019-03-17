import Vue from 'vue';
import Vuex from 'vuex';
// import axios from 'axios';
// import router from '../src/router';
// import Swal from 'sweetalert2'
// Modulos
    import user from './modules/user';
    import blog from './modules/blog';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules:{
        user,
        blog
    },
    state:{
    },
    mutations:{
    },
    actions: {
    },
})
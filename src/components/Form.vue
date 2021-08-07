<template>
    <div>
        <form >
            <input class="search" type="text" v-model="keyword" 
                @change.prevent="searchData" 
                placeholder="Digite aqui...">
            <div >
                <Slug :keyword= keyword :data= AllData />
            </div>
        </form>
    </div>
</template>

<script>
import Axios from '../service/axios'
import Slug from './slug/Slug'
export default {
    name: 'Form',
    components:{
        Slug
    },
    data() {
        return{
            show: false,
            keyword: null,
            AllData: [],
            Result:[],
            state: false,
        }
    },
    methods:{
        setData(){
            Axios.get("/api/v3/filters.json").then(res=> {
                let filters = res.data.filters.map(x=> x.filters.filter(x=> x.groupTag == "setores e cnaes"
                    || x.groupTag == "estados"
                    || x.groupTag == "municipio" ).pop())
                let filterOptions = filters
                this.ReducerElementArray(filterOptions)
                let data=[]
                filterOptions.map(x=> data.push(x.filterOptions))
                data.map(x=> x.slice(0,7).map(x=> this.AllData.push({...x,bool:false})))
            }).catch(err=> console.log("Ocorreu um erro "+ err))
        },
        ReducerElementArray(value){
            var i = 0;
            while (i < value.length) {
                if (value[i] === undefined) {
                    value.splice(i, 1);
                } else {
                    ++i;
                }
            }
        }
    },
    mounted(){
        this.setData()
    }
}
</script>
<style scoped>
.search{
    width: 100%;
    font-size: 20px;
    border: none;
    border-bottom: 1px solid rgb(39, 39, 126);
}
.search:active, .search:focus{
    box-shadow: 0;
    outline: 0;
    border: 0 none;
    border-bottom: 1px solid rgb(238, 195, 2);
}
</style>
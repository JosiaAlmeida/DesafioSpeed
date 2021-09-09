<template>
    <div>
        <div v-if="ishow">
            <div class="label" v-for="(dados ,i) in AllResult" :key="i">
                <input :type="dados.type" 
                    :id="dados.label" 
                    :value="dados.value"
                    v-model="dados.bool"
                    @change="Save()"
                    />
                <label  :for="dados.label"> {{dados.label}} <span class="subline"> --- {{dados.subline}} </span> </label>
            </div>
        </div>
        <div v-else>
            <div class="label" v-for="(dados ,i) in AllData" :key="i">
                <input :type="dados.type" 
                    :id="dados.label" 
                    :value="dados.value"
                    v-model="dados.bool"
                    @change="Save()"
                    />
                <label  :for="dados.label"> {{dados.label}} <span class="subline"> --- {{dados.subline}} </span> </label>
            </div>
        </div>
    </div>
</template>

<script>
const STOREGE_KEY = 'todo-storage';
export default {
    name: 'Slug',
    data(){
        return{
            AllData: [],
            AllResult: []
        }
    },
    props: {
        data: {
            type: Array
        },
        ['keyword']: String,
        ['ishow']: Boolean
    },
    beforeMount(){
    },
    methods:{
        Save(){
            localStorage.setItem(STOREGE_KEY, JSON.stringify(this.AllData))
        },
        NewData(){
            this.AllData = this.data
        },
        VerifySelected(){
            this.AllData = this.AllData
               .filter(x => !this.Result.includes({...x}))
               .concat(this.Result.filter(x => !this.AllData.includes({...x})));
            this.Save()
        },
        searchData(){
            this.AllResult =this.keyword ? this.AllData.filter(x=>this.TransformText(x.label).includes(this.TransformText(this.keyword))|| this.TransformText(x.subline).includes(this.TransformText(this.keyword))): []
        },
        TransformText(text){
            return text.normalize("NFD").replace(/[^a-zA-Zs]/g, "").toLowerCase()
        },
    },
    mounted(){
        if(localStorage.getItem(STOREGE_KEY)) {
            this.AllData = JSON.parse(localStorage.getItem(STOREGE_KEY))
        }
    },
    created(){
        this.NewData()
        if(this.ishow) this.VerifySelected()
    },
    beforeUpdate(){
        this.searchData()
    }
}
</script>

<style scoped>
.subline{
    color: rgb(133, 130, 127);
}
.label{
    margin: 0.5% auto;
}
</style>
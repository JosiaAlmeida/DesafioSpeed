<template>
<div>
    <form>
        <input class="search" @keydown.enter.stop.prevent type="text" v-model="keyword" placeholder="Digite aqui...">
        <div>
            <Slug :keyword=keyword :ishow=show :data=AllData />
        </div>
    </form>
</div>
</template>

<script>
import Axios from './service/axios'
import Slug from './components/slug/Slug'
export default {
    name: 'Form',
    components: {
        Slug
    },
    data() {
        return {
            show: false,
            keyword: null,
            AllData: [],
            state: false,
        }
    },
    methods: {
        setData() {
            Axios.get("/api/v3/filters.json").then(res => {
                let filters = res.data.filters.map(x => x.filters.filter(x => x.groupTag == "setores e cnaes" ||
                    x.groupTag == "estados" ||
                    x.groupTag == "municipio").pop())
                let filterOptions = filters
                this.ReducerElementArray(filterOptions)
                let data = []
                filterOptions.map(x => data.push(x.filterOptions))
                data.map(x => x.slice(0, 7).map(x => this.AllData.push({
                    ...x,
                    bool: false
                })))
            }).catch(err => console.log("Ocorreu um erro " + err))
        },
        ReducerElementArray(value) {
            var i = 0;
            while (i < value.length) {
                if (value[i] === undefined) {
                    value.splice(i, 1);
                } else {
                    ++i;
                }
            }
        },
        searchData() {
            if (this.keyword) 
              this.show = true 
            else this.show = false
        },
        TransformText(text) {
            return text.normalize("NFD").replace(/[^a-zA-Zs]/g, "").toLowerCase()
        },
    },
    mounted() {
        this.setData()
    },
    beforeUpdate(){
        this.searchData()
    }
}
</script>

<style scoped>
.search {
    width: 100%;
    font-size: 20px;
    border: none;
    border-bottom: 1px solid rgb(39, 39, 126);
}

.search:active,
.search:focus {
    box-shadow: 0;
    outline: 0;
    border: 0 none;
    border-bottom: 1px solid rgb(238, 195, 2);
}
</style>

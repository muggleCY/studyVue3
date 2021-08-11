import { ref } from 'vue'
import axios from 'axios'

function useURLLoader<T>(url:string){
    const result = ref<T | null>(null);
    const loading = ref(true);
    const loader = ref(false)
    const error = ref(null);

    axios.get(url).then((rawData)=>{
        loading.value = false;
        loader.value = true;
        result.value = rawData.data
    }).catch(e=>{
        error.value = e;
        loading.value = false;
    })
    return {
        result,
        loading,
        loader,
        error
    }
}

export default useURLLoader
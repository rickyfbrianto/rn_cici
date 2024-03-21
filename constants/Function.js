export const ConvertDataToSection = (val) =>{
    let tempData = val.reduce((accum, current) => {
        // let dateGroup = accum.find(x => x.tanggal === current.tanggal);
        let dateGroup = accum.find(x => x.tanggal === current.hari + ", " + current.tanggal);
        if (!dateGroup) {
            dateGroup = { tanggal: current.hari + ", " + current.tanggal , data: [] }
            accum.push(dateGroup);
        }
        dateGroup.data.push(current);
        return accum;
    }, []);
    return tempData
}

function getQueryKey(){
    const queryClient = useQueryClient()

    const queryCache = queryClient.getQueryCache()
    const queryKeys = queryCache.getAll().map(cache => {
        console.log(cache.queryKey);
        cache.queryKey
    })
}
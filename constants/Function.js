import { useQueryClient } from '@tanstack/react-query'

export const ConvertDataToSection = ({val, sort=""}) => {
    let tempData = val.reduce((accum, current) => {
        let dateGroup = accum.find(x => x.tanggal === current.hari + ", " + current.tanggal);
        if (!dateGroup) {
            dateGroup = { tanggal: current.hari + ", " + current.tanggal, data: [] }
            accum.push(dateGroup);
        }
        dateGroup.data.push(current);
        if(sort) dateGroup.data.sort((a, b)=> a[sort] - b[sort])
        return accum;
    }, []);
    return tempData
}

export function getQueryKey() {
    const queryClient = useQueryClient()

    const queryCache = queryClient.getQueryCache()
    const queryKeys = queryCache.getAll().map(cache => {
        console.log(cache.queryKey);
        cache.queryKey
    })
}

export const getYearMonthDay = (date) => {
    const tgl = new Date(date)
    return tgl.getFullYear() + "-" + ('0' + (tgl.getMonth() + 1)).slice(-2) + "-" + ('0' + tgl.getDate()).slice(-2)
}

export function addWeeks(date, weeks) {
    date.setDate(date.getDate() + 7 * weeks);
    return date;
}
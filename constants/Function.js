import { useQueryClient } from '@tanstack/react-query'

export const ConvertDataToSection = ({ val, sort = "" }) => {
    let tempData = val.reduce((accum, current) => {
        let dateGroup = accum.find(x => x.tanggal === current.hari + ", " + current.tanggal);
        if (!dateGroup) {
            dateGroup = { tanggal: current.hari + ", " + current.tanggal, data: [] }
            accum.push(dateGroup);
        }
        dateGroup.data.push(current);
        if (sort) dateGroup.data.sort((a, b) => a[sort] - b[sort])
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

export function dynamicSortMultiple() {
    var props = [];
    for (var i = 0; i < arguments.length; i++) {
        var splittedArg = arguments[i].split(/ +/);
        props[props.length] = [splittedArg[0], (splittedArg[1] ? splittedArg[1].toUpperCase() : "ASC")];
    }
    return function (obj1, obj2) {
        var i = 0, result = 0, numberOfProperties = props.length;
        while (result === 0 && i < numberOfProperties) {
            result = dynamicSort(props[i][0], props[i][1])(obj1, obj2);
            i++;
        }
        return result;
    }
}

/*Base function returning -1,1,0 for custom sorting*/
export function dynamicSort(property, isAscDesc) {
    return function (obj1, obj2) {
        if (isAscDesc === "DESC") {
            return ((obj1[property] > obj2[property]) ? (-1) : ((obj1[property] < obj2[property]) ? (1) : (0)));
        }
        /*else, if isAscDesc==="ASC"*/
        return ((obj1[property] > obj2[property]) ? (1) : ((obj1[property] < obj2[property]) ? (-1) : (0)));
    }
}
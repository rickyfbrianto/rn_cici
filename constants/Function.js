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
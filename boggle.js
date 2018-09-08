var dimensi = process.argv[2];
function boardBuild(dimensi){
    const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let hasil = [];
    
    for(let i = 0;i < dimensi;i++){
        let isi = [];
        for(let j = 0;j < dimensi;j++){
            let acak = Math.floor(Math.random()* abc.length)
            isi.push(abc[acak])
        }
        hasil.push(isi)
    }
    return hasil
}
console.log(boardBuild(dimensi))
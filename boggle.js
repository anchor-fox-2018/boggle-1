/*
-jika input tampilan = 0 =>maka akan menampilkan
                                [ [ 'U', 'A', 'B', 'I' ],
                                  [ 'U', 'B', 'C', 'S' ],
                                  [ 'N', 'B', 'J', 'W' ],
                                  [ 'U', 'T', 'A', 'Y' ] ]
                                selamat mencari...
-jika input tampilan = 1 =>maka akan menampilkan 
                                [ [ 'U', 'A', 'B', 'I' ],
                                  [ 'U', 'B', 'C', 'S' ],
                                  [ 'N', 'B', 'J', 'W' ],
                                  [ 'U', 'T', 'A', 'Y' ] ]
                                1 words found:
-jika input tampilan = 2 =>maka akan menampilkan
                                [ [ 'U', 'A', 'B', 'I' ],
                                  [ 'U', 'B', 'C', 'S' ],
                                  [ 'N', 'B', 'J', 'W' ],
                                  [ 'U', 'T', 'A', 'Y' ] ]
                                1 words found:
                                ABIS
-jika tampilannya
        [ [ 'E', 'S', 'N', 'A' ],
          [ 'R', 'R', 'I', 'A' ],
          [ 'K', 'T', 'S', 'U' ],
          [ 'M', 'G', 'R', 'Y' ] ]
        not found                       "tampilan ini hanya jika pencari hasil diatas 0 diaktifkan"
         [ [ 'U', 'A', 'B', 'I' ],      "Gunakan Board Yang Bawah"
           [ 'U', 'B', 'C', 'S' ],
           [ 'N', 'B', 'J', 'W' ],
           [ 'U', 'T', 'A', 'Y' ] ]
        1 words found:
        ABIS  
-jika pencari hasil diatas 0 diaktifkan,tampilan nya seperti ini 
        [ [ 'E', 'S', 'N', 'A' ],
          [ 'R', 'R', 'I', 'A' ],       "tampilan ini jika pencari hasil diatas 0 dinonaktifkan"
          [ 'K', 'T', 'S', 'U' ],
          [ 'M', 'G', 'R', 'Y' ] ]
        not found          
-Maaf karna sudah terlanjur jadi saya ngumpulkan yang ini,Masih Belum Sempurna...                                     
*/
var tampilan = 2;//jika input 1 hanya menampilkan jumlah word,jka input 2 hasilnya kata nya juga akan dimunculkan
var kata = ["AYAM","ABAD","ABADI","ABAH","AMPAS","ABAL","ABANG","ABANGAN","ABDI","ANGKER","ABIS","ABJAD","ABNORMAL","ABANG","ABORSI","ABRASI","ABSEN","ABSENSI","ABSOLUT","ABSTAIN","ABSTRAK","ABSURD","ABUABU","ABU","ANGIN","ANGAN","AKSI"];
var dimensi = 4;
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
var board = boardBuild(dimensi)

function inputKata (board,kata,tampilan){
    let min = 2;
    let max = dimensi;
    let jmlhKata = Math.floor(Math.random()*(max - min)+min);
    let history = [];
    let kataCheck = [];
    
    for(let i = 0;i < jmlhKata;i++){
        let mulai = [Math.floor(Math.random() *board.length),Math.floor(Math.random() *board.length)]
        let acak = Math.floor(Math.random() *kata.length)
        let kataAcak = kata[acak]
        let idx = 0
        var jalur = [];
        
        while(jalur.length < kataAcak.length){
            // if(jalur.length === kataAcak.length){
            //     console.log(masuk)
            //     true
            // }
            if(jalur.length < 1){
                board[mulai[0]][mulai[1]] = kataAcak[idx];
                jalur.unshift([mulai[0],mulai[1]])
                idx++
            }else{
                let idx0jalur = jalur[0][0];
                let idx1jalur = jalur[0][1]
                if(idx0jalur-1 >= 0 && idx1jalur-1 >= 0 && checkJalur(board,kataAcak[idx],history,[jalur[0][0]-1,jalur[0][1]-1]) === false){
                    board[jalur[0][0]-1][jalur[0][1]-1] = kataAcak[idx];
                    jalur.unshift([jalur[0][0]-1,jalur[0][1]-1])
                    idx++
                }else if(idx0jalur-1 >= 0 && checkJalur(board,kataAcak[idx],history,[jalur[0][0]-1,jalur[0][1]]) === false){
                    board[jalur[0][0]-1][jalur[0][1]] = kataAcak[idx];
                    jalur.unshift([jalur[0][0]-1,jalur[0][1]])
                    idx++
                }else if(idx0jalur-1 >= 0 && idx1jalur+1 < board.length && checkJalur(board,kataAcak[idx],history,[jalur[0][0]-1,jalur[0][1]+1]) === false){
                    board[jalur[0][0]-1][jalur[0][1]+1] = kataAcak[idx];
                    jalur.unshift([jalur[0][0]-1,jalur[0][1]+1])
                    idx++
                }else if(checkJalur(board,kataAcak[idx],history,[jalur[0][0],jalur[0][1]+1]) === false && idx1jalur+1 < board.length){
                    board[jalur[0][0]][jalur[0][1]+1] = kataAcak[idx];
                    jalur.unshift([jalur[0][0],jalur[0][1]+1])
                    idx++
                }else if(idx0jalur+1 < board.length && idx1jalur+1 < board.length && checkJalur(board,kataAcak[idx],history,[jalur[0][0]+1,jalur[0][1]+1]) === false){
                    board[jalur[0][0]+1][jalur[0][1]+1] = kataAcak[idx];
                    jalur.unshift([jalur[0][0]+1,jalur[0][1]+1])
                    idx++
                }else if(idx0jalur+1 < board.length && checkJalur(board,kataAcak[idx],history,[jalur[0][0]+1,jalur[0][1]]) === false){
                    board[jalur[0][0]+1][jalur[0][1]] = kataAcak[idx];
                    jalur.unshift([jalur[0][0]+1,jalur[0][1]])
                    idx++
                }else if(idx0jalur+1 < board.length && idx1jalur-1 >= 0 && checkJalur(board,kataAcak[idx],history,[jalur[0][0]+1,jalur[0][1]-1]) === false){
                    board[jalur[0][0]+1][jalur[0][1]-1] = kataAcak[idx];
                    jalur.unshift([jalur[0][0]+1,jalur[0][1]-1])
                    idx++
                }else{
                    // console.log('===Ayooo-Apaaaa===');
                    return inputKata(board,kata,tampilan)
                }
            }
        }
        //console.log(kataAcak,jalur)
        history.push(jalur)
        kataCheck.push(kataAcak)
    }
    function checkJalur(board,idxAcak,history,test){
        for(let i = 0;i < history.length;i++){
            for(let j = 0;j < history[i].length;j++){
                if(test[0] === history[i][j][0] && test[1] === history[i][j][1] && board[test[0]][test[1]] !== idxAcak){
                    //console.log('masuk')
                    return true
                    
                } 
            }
        }
        return false
    }
    //console.log(kataCheck)
    function solveMe (history,kataCheck,board,tampilan){
        let balikHistory = []
        for(let i = 0;i < history.length;i++){
            let isi = [];
            for(let j = history[i].length-1;j >= 0;j--){
                isi.push(history[i][j])
            }
            balikHistory.push(isi)
        }
        //console.log(balikHistory)
        let hasil = [];
        for(let i = 0;i < kataCheck.length;i++){
            let lengkap = 0;
            for(let j = 0;j < kataCheck[i].length;j++){
                if(kataCheck[i][j] === board[balikHistory[i][j][0]][balikHistory[i][j][1]]){
                    lengkap++
                }
            }
            //console.log(lengkap)
            if(lengkap === kataCheck[i].length){
                hasil.push(kataCheck[i])
            }
        }
        if(hasil.length === 0){
            console.log('not found')
            //return inputKata(board,kata,tampilan);//"pencari hasil diatas 0" >>> jika aktif,akan dibuatkan board baru saat tidak ada kata yang match
        }else{
            if(tampilan == 2){
                console.log(String(hasil.length)+' words found: ')
                console.log(hasil.join('\n'))
            }else if(tampilan == 1){
                console.log(String(hasil.length)+' words found ')
            }else{
                console.log('selamat mencari...')
            }
            
        }
        
    }
    console.log(board)
    solveMe(history,kataCheck,board,tampilan)    
}

inputKata(board,kata,tampilan)
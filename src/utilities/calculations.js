const withdrawCalculation = (coin)=>{
    if(coin == 0 || coin < 199){
        return 0;
    }

    return coin/20
    
}

export { withdrawCalculation }
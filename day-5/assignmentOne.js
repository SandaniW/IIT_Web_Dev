
function checkNumber(number){
   if(number>0){
      return "Positive";
   }else if(number<0){
      return "Negative";
   }else{
      return "Zero";
   }
}
console.log(checkNumber(12)); //positive
console.log(checkNumber(-13)); //negative
console.log(checkNumber(0)); //zero
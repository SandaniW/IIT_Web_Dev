function findLarger(numOne,numTwo){
   if(numOne>numTwo){
      return numOne;
   }else if(numTwo>numOne){
      return numTwo;
   }else{
      return "Both numbers are equal";
   }
}
console.log(findLarger(10,20));
console.log(findLarger(35,9)); 
console.log(findLarger(15,15)); 
console.log(findLarger(-12,90));
console.log(findLarger(-23,-40)); 